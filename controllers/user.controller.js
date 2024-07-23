const User = require("../models/user.model");
const Auth = require("../models/auth.model");

const getUsers = async (req, res) => {
  try {
    const id = req.user._id;
    const auth = await Auth.findById(id);
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;

    if (auth.role !== "admin") {
      res.status(403).json({ message: "Sizga bu huquq berilmagan" });
    }

    const users = await User.find()
      .sort({ _id: -1 })
      .populate({ path: "auth", select: "-password" })
      .skip((page - 1) * limit)
      .limit(limit);
    const countUser = await User.countDocuments();
    res.json({
      users,
      totalPages: Math.ceil(countUser / limit),
      currentPage: page,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const auth_id = req.user._id;
    const auth = await Auth.findById(auth_id);

    if (auth.role !== "admin") {
      res.json({ message: "Sizga bu huquq berilmagan" });
    }

    const user = await User.findById(id).populate({
      path: "auth",
      select: "-password",
    });

    res.json(user);
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = { getUsers, getUser };
