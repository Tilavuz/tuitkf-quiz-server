const { Schema, model } = require('mongoose')
const bcrypt = require("bcrypt");


const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 30
    },
    age: Number,
    phone: {
        type: String,
        required: true,
        unique: true
    },
    group: String,
    photo: {
        type: String,
        default: 'user-default-image.png'
    },
    password: {
        type: String,
        required: true
    },
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'teacher', 'admin'],
      required: true
    }
})

UserSchema.pre("save", async function (next) {
  try {
    if (this.isNew || this.isModified("password")) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    }
    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.pre("findOneAndUpdate", async function (next) {
  try {
    const update = this.getUpdate();
    if (update.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(update.password, salt);
      this.update({}, { $set: { password: hashedPassword } });
    }
    next();
  } catch (err) {
    next(err);
  }
});


module.exports = model('User', UserSchema)