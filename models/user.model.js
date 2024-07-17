const { Schema, model } = require("mongoose");


const UserSchema = new Schema({
  chatId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    maxlength: 30,
    default: "Anonymous",
  },
  age: Number,
  group: String,
  photo: {
    type: String,
    default: "user-default-image.jpg",
  },
  action: {
    type: String,
    required: true,
  },
  auth: {
    type: Schema.Types.ObjectId,
    ref: 'Auth',
    required: true
  }
});

module.exports = model("User", UserSchema);
