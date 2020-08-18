const faker = require("faker");

faker.locale = "ru";

const User = require("../../src/models/User");
const Content = require("../../src/models/Content");
const Qr = require("../../src/models/Qr");
const Analytic = require("../../src/models/Analytic");

module.exports = async () => {
  try {
    await Analytic.deleteMany();
    const users = await User.find();
    for (let item in users) {
      const user = users[item];
      const count = faker.random.number(5);
      let i = 0;
      while (i < count) {
        const type = faker.random.boolean();
        let qr,
          content = false;
        if (type) {
          qr = await Qr.findOne({ user: user._id });
          await Analytic.create({
            user: user,
            qr: qr != "" ? qr : null,
          });
        } else {
          content = await Content.findOne({ user: user._id });
          await Analytic.create({
            user: user,
            qr: qr != "" ? qr : null,
          });
        }
        i++;
      }
    }
  } catch (err) {
    console.log(err);
  }
};
