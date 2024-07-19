const Question = require("../models/question.model");
const Auth = require("../models/auth.model");
const Science = require("../models/science.model");

const getQuestions = async (req, res) => {
  try {
    const { id } = req.params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 25;

    const questions = await Question.find({ science_id: id })
      .skip((page - 1) * limit)
      .limit(limit);
    const countQuestions = await Question.countDocuments();
    res.json({
      questions,
      questionTotalPages: Math.ceil(countQuestions / limit),
      questionCurrentPage: page,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const createQuestion = async (req, res) => {
  try {
    const auth_id = req.user._id; 
    const auth = await Auth.findById(auth_id); 
    const { science_id, question, options, correct_answer } = req.body; 

    if (auth.role !== "admin" && auth.role !== "teacher") {
      res.status(403).json({ message: "Sizga bu huquq berilmagan!" });
      return;
    }

    if (!science_id || !question || !options || !correct_answer) {
      res.status(400).json({ message: "Ma'lumot yetarli emas!" });
      return;
    }

    const newQuestion = await Question.create({
      science_id,
      question,
      options,
      correct_answer,
      auth_id,
    });

    const questionCount = await Question.countDocuments({ science_id });
    await Science.findByIdAndUpdate(science_id, { total: questionCount });

    res.json({ message: "Ma'lumot yaratildi!", question: newQuestion });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const removeQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const auth_id = req.user._id;
    const auth = await Auth.findById(auth_id);
    const question = await Question.findById(id);

    if (auth.role !== "admin" && auth.role !== "teacher") {
      res.status(403).json({ message: "Sizga bu huquq berilmagan!" });
      return;
    }

    if (auth.role === "teacher" && auth_id === question.auth_id) {
      await Question.findByIdAndDelete(id);
      res.json({ message: "Malumot o'chirildi!" });
      return;
    }

    const { science_id } = await Question.findByIdAndDelete(id);
    const questionCount = await Question.countDocuments({ science_id });
    await Science.findByIdAndUpdate(science_id, { total: questionCount });
    res.json({ message: "Malumot o'chirildi!" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = { createQuestion, getQuestions, removeQuestion };
