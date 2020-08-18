const database = require("../../config/database");
const analyticSchema = require("../../database/schema/analyticSchema");

const Analytic = database.model("Analytic", analyticSchema);

module.exports = Analytic;
