const { Schema, model } = require("mongoose");

const SolutionSchema = new Schema({
  session_id: {
    type: Schema.Types.ObjectId,
    ref: "Session",
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true
  }
});

module.exports = model("Solution", SolutionSchema);