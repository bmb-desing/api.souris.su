const database = require("../../config/database");
const qrSchema = require("../../database/schema/qrSchema");

const Qr = database.model("Qr", qrSchema);

module.exports = Qr;
