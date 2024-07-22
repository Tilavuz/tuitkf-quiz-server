const { Schema, model } = require("mongoose");

const newsBodySchema = new Schema({
  news_id: {
    type: Schema.Types.ObjectId,
    ref: "News",
    required: true,
  },
  news: {
    type: String,
    required: true,
  },
});

module.exports = model("NewsBody", newsBodySchema);
