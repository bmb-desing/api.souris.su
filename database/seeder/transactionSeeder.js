const faker = require("faker");

faker.locale = "ru";

const User = require("../../src/models/User");
const Transaction = require("../../src/models/Transaction");
module.exports = async () => {
  try {
    await Transaction.deleteMany();
    const users = await User.find();
    for (let item in users) {
      const user = users[item];
      const count = faker.random.number(5);
      let i = 0;
      while (i < count) {
        await Transaction.create({
          pay: faker.random.number(2000),
          payType: faker.random.boolean(),
          user: user,
        });
        i++;
      }
    }
  } catch (err) {
    console.log(err);
  }
};
