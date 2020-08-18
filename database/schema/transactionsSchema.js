const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionsSchema = new Schema(
  {
    pay: {
      type: Number,
      required: true,
    },
    payType: {
      type: Boolean,
      required: true,
    },
    paySystem: {
      type: String,
      default: "cloudPayments",
    },
    bonus: {
      type: Number,
      default: 0,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

require("../hooks/transactionHooks")(transactionsSchema);

module.exports = transactionsSchema;
