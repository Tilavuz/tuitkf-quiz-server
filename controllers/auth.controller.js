const { generateToken } = require("../helpers/generate-token");
const User = require("../models/user.model");
const Auth = require("../models/auth.model");
const bcrypt = require("bcrypt");
const deletePhoto = require("../helpers/delete-photo");
const path = require('path')

const login = async (req, res) => {
  try {
    const { phone, password } = req.body;
    if (!phone || !password)
      return res.status(400).json({ message: "Kirish uchun malumot yetarli emas!" });

    let auth = await Auth.findOne({ phone });
    if (!auth)
      return res.status(404).json({ message: "Foydalanuvchi topilmadi!" });

    if(!auth.status) {
      return res.status(403).json({ message: 'Siz admin tomonidan blocklangansiz!' })
    }

    const isMatch = await bcrypt.compare(password, auth.password);
    if (!isMatch) return res.status(401).json({ message: "Parolda xatolik bor!" });

    const token = generateToken({ _id: auth._id });

    let user = await User.findOne({ auth: auth._id }).populate('auth')
    res.json({ token, user });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const changeUser = async (req, res) => {
  try {
    const { id } = req.params
  
    const { name, password } = req.body
    let user = await User.findById(id)

    if(!user) {
      res.status(404).json({ message: "Foydalanuvchi topilmadi!" })
    }

    let auth = await Auth.findById(user.auth)

    if(name) user.name = name
    if(password) auth.password = password

    if (req.file) {
      if (user.photo !== "user-default-image.jpg") {
        const oldPhotoPath = path.join(
          __dirname,
          "../uploads",
          user.photo
        );
        deletePhoto(oldPhotoPath);
      }
      user.photo = req.file.filename;
    }

    await user.save();
    await auth.save();

    user = await User.findById(user._id).populate('auth')
    res.json(user)
  } catch (error) {
    console.log(error);
    res.json({ message: error.message })
  }
}

const getUser = async (req, res) => {
  try {
    const auth = await Auth.findById(req.user._id).select("-password");
    const user = await User.findOne({ auth: auth._id }).populate('auth')
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { login, getUser, changeUser };
