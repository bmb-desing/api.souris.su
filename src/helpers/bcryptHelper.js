const bcrypt = require("bcrypt");
const saltRounds = 10;
module.exports = {
  generate(password) {
    const pass = bcrypt.hashSync(password, saltRounds);
    return pass;
  },
  verify(password, hash) {
    const pass = bcrypt.compareSync(password, hash);
    return pass;
  },
};
