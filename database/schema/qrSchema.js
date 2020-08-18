const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const qrSchema = new Schema(
  {
    utm: {
      type: String,
    },
    link: {
      type: String,
      required: true,
      unique: true,
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

module.exports = qrSchema;
