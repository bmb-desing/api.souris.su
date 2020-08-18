const database = require("../../config/database");
const userSchema = require("../../database/schema/userSchema");

const User = database.model("User", userSchema);

module.exports = User;
