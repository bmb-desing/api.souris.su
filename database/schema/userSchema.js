const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "/images/no-image.png",
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    link: {
      type: String,
      unique: true,
    },
    balance: {
      type: Number,
      default: 120,
    },
    payOfDay: {
      type: Number,
      default: 4,
    },
    rememberToken: {
      type: String,
    },
    pays: [
      {
        name: { type: String, required: true },
        value: { type: Number },
        work: {
          type: Boolean,
          default: 1,
        },
      },
    ],
    setting: {
      background: {
        type: {
          type: String,
          default: "color",
        },
        value: {
          type: String,
          default: "#000",
        },
      },
      color: {
        type: String,
        default: "#000",
      },
      advertising: {
        type: String,
        default: "top",
      },
    },
    content: [
      {
        type: Schema.Types.ObjectId,
        ref: "Content",
      },
    ],
  },
  {
    timestamps: true,
  }
);

require("../hooks/userHooks/password")(userSchema);
require("../hooks/userHooks/avatar")(userSchema);
require("../hooks/userHooks/uuid")(userSchema);

module.exports = userSchema;
