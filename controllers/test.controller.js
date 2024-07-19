const Question = require("../models/question.model");

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const startTest = async (req, res) => {
  try {
    const { id } = req.params;
    const { order, random } = req.body;

    if (!order || !random) {
      return res.status(400).json({ message: "Malumot yetarli emas!" });
    }

    let questions;

    if (random === "mix") {
      const allData = await Question.countDocuments({ science_id: id });

      if (allData > 25) {
        questions = await Question.aggregate([
          { $match: { science_id: id } },
          { $sample: { size: 25 } },
        ]);
      }else {
        questions = await Question.find({ science_id: id })
      }
    } else {
      const arr = random.split("-");
      questions = await Question.find({ science_id: id })
        .skip((parseInt(arr[0]) - 1) * parseInt(arr[1]))
        .limit(parseInt(arr[1]));
    }

    if (order === "mix") {
      questions = questions.map((question) => {
        question.options = shuffleArray(question.options);
        return question;
      });
    }

    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const checkAnswer = async (req, res) => {
  try {
    const { id } = req.params
    const { value } = req.body
    const question = await Question.findById(id)

    if(question.correct_answer === value) {
      return res.json({ status: true, question: question.question, answer: value });
    }

    res.json({ status: false, question: question.question, answer: value });
  } catch (error) {
    res.json({ message: error.message })
  }
}

module.exports = { startTest, checkAnswer };
