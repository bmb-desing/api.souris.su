const phone = require("phone");

module.exports = {
  validatePhone(telephone) {
    const valid = phone(telephone);
    if (valid.length) {
      return valid[0];
    } else {
      return false;
    }
  },
};
