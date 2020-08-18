const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const analyticSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: Schema.Types.ObjectId,
      ref: "Content",
      default: null,
    },
    qr: {
      type: Schema.Types.ObjectId,
      ref: "Qr",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = analyticSchema;
