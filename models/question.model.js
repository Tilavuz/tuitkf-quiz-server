const { Schema, model } = require("mongoose");

const questionSchema = new Schema({
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
  question: {
    type: String,
    required: true,
  },
  options: [
    {
      type: String,
      required: true,
    },
  ],
  correct_answer: {
    type: String,
    required: true,
  },
});

module.exports = model("Question", questionSchema);
