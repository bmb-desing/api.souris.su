const bcryptHelper = require("../../../src/helpers/bcryptHelper");
module.exports = (schema) => {
  schema.pre("save", function (next) {
    if (this.isModified("password") || this.isNew) {
      this.password = bcryptHelper.generate(this.password);
    }
    return next();
  });
};
