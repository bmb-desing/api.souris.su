const { v4: uuidv4 } = require("uuid");
module.exports = (schema) => {
  schema.pre("save", async function (next) {
    try {
      if (this.isNew) {
        this.link = uuidv4();
      }
      return next();
    } catch (err) {
      return next(err);
    }
  });
};
