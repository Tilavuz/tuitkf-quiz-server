const Science = require("../models/science.model");
const Auth = require("../models/auth.model");
const { Types } = require("mongoose");

const getSciences = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;

    const sciences = await Science.find()
      .skip((page - 1) * limit)
      .limit(limit);
    const countSciences = await Science.countDocuments();
    res.json({
      sciences,
      scienceTotalPages: Math.ceil(countSciences / limit),
      scienceCurrentPage: page,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getScience = async (req, res) => {
  try {
    const { id } = req.params
    const science = await Science.findById(id)
    res.json(science)
  } catch (error) {
    res.json({ message: error.message });
  }
};


const createScience = async (req, res) => {
  try {
    const auth_id = req.user._id;
    const { title, teacher, course, semester } = req.body;
    if (!title || !teacher || !course || !semester) {
      res.status(403).json({ message: "Malumot yetarli emas!" });
      return;
    }
    const auth = await Auth.findById(auth_id);

    if (auth.role !== "admin" && auth.role !== "teacher") {
      res.status(403).json({ message: "Sizga bu huquq berilmagan!" });
      return;
    }

    const science = await Science.create({
      auth_id,
      title,
      teacher,
      course,
      semester,
    });
    res.json({ message: "Malumot yaratildi!", science });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const changeScience = async (req, res) => {
  try {
    const { id } = req.params;
    const auth_id = req.user._id;
    const auth = await Auth.findById(auth_id);
    const { title, teacher, course, semester } = req.body;

    if (auth.role !== "admin" && auth.role !== "teacher") {
      res.status(403).json({ message: "Sizga bu huquq berilmagan!" });
      return;
    }
    let science = await Science.findById(id);

    if (auth.role === "admin") {
      if (title) science.title = title;
      if (teacher) science.teacher = teacher;
      if (course) science.course = course;
      if (semester) science.semester = semester;
    }

    if (
      auth.role === "teacher" &&
      new Types.ObjectId(science.auth_id).equals(new Types.ObjectId(auth._id))
    ) {
      if (title) science.title = title;
      if (teacher) science.teacher = teacher;
      if (course) science.course = course;
      if (semester) science.semester = semester;
    }

    await science.save();
    res.json({ message: "Test malumotlari yangilandi!", science });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const removeScience = async (req, res) => {
  try {
    const { id } = req.params;
    const auth_id = req.user._id;
    const auth = await Auth.findById(auth_id);

    if (auth.role !== "admin" && auth.role !== "teacher") {
      res.status(403).json({ message: "Sizga bu huquq berilmagan!" });
      return;
    }

    let science = await Science.findById(id);

    if (auth.role === "admin") {
      await Science.findByIdAndDelete(id);
      res.json({ message: "Malumot o'chirildi!" });
      return;
    }

    if (
      auth.role === "teacher" &&
      new Types.ObjectId(science.auth_id).equals(new Types.ObjectId(auth._id))
    ) {
      await Science.findByIdAndDelete(id);
      res.json({ message: "Malumot o'chirildi" });
      return;
    } else {
      res.status(403).json({
        message: "Sizga admin yaratgan testlarni o'chirish huquqi berilmagan!",
      });
      return;
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = {
  getSciences,
  changeScience,
  createScience,
  removeScience,
  getScience,
};
