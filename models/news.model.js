const { Schema, model } = require("mongoose");

const newsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  auth_id: {
    type: Schema.Types.ObjectId,
    ref: 'Auth',
    required: true
  },
  desc: {
    type: String,
     required: true
  },
  status: {
    type: Boolean,
    required: true,
    default: false
  }
});

module.exports = model("News", newsSchema);
