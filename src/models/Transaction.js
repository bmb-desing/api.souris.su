const database = require("../../config/database");
const transactionsSchema = require("../../database/schema/transactionsSchema");

const Transaction = database.model("Transaction", transactionsSchema);

module.exports = Transaction;
