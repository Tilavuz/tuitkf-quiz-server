const { Schema, model } = require("mongoose");

const ScienceSchema = new Schema(
  {
    auth_id: {
      type: Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
      default: 0,
    },
    teacher: {
      type: String,
      required: true,
    },
    cource: {
      type: Number,
      enum: [1, 2, 3, 4],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Science", ScienceSchema);
