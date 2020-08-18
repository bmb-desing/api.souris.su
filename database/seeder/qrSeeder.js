const faker = require("faker");

faker.locale = "ru";

const User = require("../../src/models/User");
const Qr = require("../../src/models/Qr");
module.exports = async () => {
  try {
    await Qr.deleteMany();
    const users = await User.find();
    for (let item in users) {
      const user = users[item];
      const count = faker.random.number(10);
      let i = 0;
      while (i < count) {
        const type = faker.random.arrayElement(["phone", "viber", "whatsapp"]);
        await Qr.create({
          utm: type,
          link: faker.random.uuid(),
          user: user,
        });
        i++;
      }
    }
  } catch (err) {
    console.log(err);
  }
};
