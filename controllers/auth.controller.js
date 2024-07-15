const { generateToken } = require("../helpers/generate-token");
const User = require("../models/user.model");
const Auth = require("../models/auth.model");
const bcrypt = require("bcrypt");

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

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { login, getUser };
