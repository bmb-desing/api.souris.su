const faker = require("faker");

faker.locale = "ru";

const User = require("../../src/models/User");
const Content = require("../../src/models/Content");
module.exports = async () => {
  try {
    await Content.deleteMany();
    const users = await User.find();
    for (let item in users) {
      const user = users[item];
      const count = faker.random.number(10);
      let i = 0;
      while (i < count) {
        const type = faker.random.arrayElement(["phone", "viber", "whatsapp"]);
        const content = await Content.create({
          name: type,
          title: faker.name.findName(),
          value: faker.phone.phoneNumber("+7(9##)###-##-##"),
          sort: i,
        });
        user.content.push(content);
        await user.save();
        i++;
      }
    }
  } catch (err) {
    console.log(err);
  }
};
