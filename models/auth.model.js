const { Schema, model } = require('mongoose')
const bcrypt = require("bcrypt");


const AuthSchema = new Schema({
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'teacher', 'admin'],
        default: 'user',
        required: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    }
})


AuthSchema.pre("save", async function (next) {
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

AuthSchema.pre("findOneAndUpdate", async function (next) {
  try {
    const update = this.getUpdate();
    if (update.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(update.password, salt);
      this.setUpdate({ ...update, password: hashedPassword });
    }
    next();
  } catch (err) {
    next(err);
  }
});


module.exports = model('Auth', AuthSchema)