const faker = require("faker");
const fsExtra = require("fs-extra");

faker.locale = "ru";

const User = require("../../src/models/User");
module.exports = async () => {
  try {
    await fsExtra.emptyDirSync("public/images/");
    await User.deleteMany();
    const count = await User.countDocuments();
    if (!count) {
      await User.create({
        email: "xolms111@ya.ru",
        password: "657216as",
        name: 'Веб студия "Bombay"',
        description:
          "Оказание профессиональных услуг в разработке сайтов и рекламы",
        balance: 1000,
        avatar: faker.image.avatar(),
        link: "bmb-design",
      });
      for (let i = 0; i < 5; i++) {
        let item = {
          email: faker.internet.email(faker.lorem.words(1)),
          password: "657216as",
          name: faker.name.findName(),
          description: faker.lorem.paragraph(4),
          balance: 0,
          avatar: faker.random.boolean()
            ? faker.image.avatar()
            : "/images/no-image.png",
        };
        await User.create(item);
      }
    }
  } catch (err) {
    console.log(err);
  }
};
