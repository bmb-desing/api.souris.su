const database = require("../../config/database");
const contentSchema = require("../../database/schema/contentSchema");

const Content = database.model("Content", contentSchema);

module.exports = Content;
