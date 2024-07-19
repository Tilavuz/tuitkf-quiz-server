const { Schema, model } = require("mongoose");

const sessionSchema = new Schema(
  {
    science_id: {
      type: Schema.Types.ObjectId,
      ref: "Science",
      required: true,
    },
    auth_id: {
      type: Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    time: {
      type: Number,
      required: true,
      default: 0,
    },
    score: {
      type: Number,
      required: true,
      default: 0,
    },
    percent: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = model('Session', sessionSchema)