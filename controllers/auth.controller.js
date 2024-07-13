const { generateToken } = require("../helpers/generate-token");
const User = require("../models/user.model");

const login = async (req, res) => {
  try {
    const { phone, password } = req.body;
    if (!phone || !password) res.status(400).json({ message: "Kirish uchun malumot yetarli emas!" });

    let user = await User.findOne({ phone })
    if(!user) res.status(404).json({ message: 'Foydalanuvchi topilmadi!' })

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) res.status(401).json({ message: 'Parolda xatolik bor!' })
    
    const token = generateToken({ _id: user._id })

    user = await User.findById(user._id).select('-password')
    res.json({ token, user })
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const register = async (req, res) => {
  try {
    const { phone, password, name } = req.body;
    if (!phone || !password || !name)
      res
        .status(400)
        .json({ message: "Ro'yhatdan o'tish uchun malumot yetarli emas!" });

    let user = await User.findOne({ phone });
    if (user) res.status(409).json({ message: "Telefon raqam bazada mavjut!" });

    const token = generateToken({ _id: user._id })

    user = await User.create({ phone, password, name });
    user = await User.findById(user._id).select("-password");

    res.status(201).json({user, token});
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password')
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { register, login, getUser };