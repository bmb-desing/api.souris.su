const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const contentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    value: {
      type: Schema.Types.Mixed,
      required: true,
    },
    sort: {
      type: Number,
      default: 0,
    },
    setting: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = contentSchema;
