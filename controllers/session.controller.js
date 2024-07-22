const Session = require("../models/session.model");
const Solution = require("../models/solution.model");

const createSession = async (req, res) => {
  try {
    const { id } = req.params;
    const { time, score, percent, questions } = req.body.session;
    const { solutions } = req.body;

    const auth_id = req.user._id;

    if (time === null || score === null || percent === null) {
      return res.status(400).json({
        message: "Malumot to'liq emas!",
      });
    }

    let session = await Session.findOne({ science_id: id, auth_id });

    if (session) {
      (session.time = time), (session.score = score);
      session.percent = percent;
      session.questions = questions;

      await Solution.deleteMany({ session_id: session._id });

      await session.save();
      if (solutions) {
        const solutionsCreate = solutions.map((solution) => {
          return {
            ...solution,
            session_id: session._id,
            questions,
          };
        });

        await Solution.insertMany(solutionsCreate);
      }
      session = await Session.findById(session._id).populate('science_id')
      return res.json({ message: "Natija yangilandi!", session });
    }

    session = await Session.create({
      science_id: id,
      auth_id,
      time,
      score,
      percent,
      questions,
    });

    if (solutions) {
      const solutionsCreate = solutions.map((solution) => {
        return {
          ...solution,
          session_id: session._id,
        };
      });
      await Solution.insertMany(solutionsCreate);
    }

    session = await Session.findById(session._id).populate('science_id')
    res.json({ message: "Natija saqlandi!", session });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeSession = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await Session.findByIdAndDelete(id);

    if (!session) {
      return res.status(404).json({ message: "Malumot topilmadi!" });
    }

    await Solution.deleteMany({ session_id: session._id });

    res.json({ message: "Natija o'chirildi!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSolution = async (req, res) => {
  try {
    const { id } = req.params;
    const solution = await Solution.find({ session_id: id });
    res.json(solution);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getSessions = async (req, res) => {
  try {
    const auth_id = req.user._id;
    const sessions = await Session.find({ auth_id }).populate("science_id");
    res.json(sessions);
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = { createSession, removeSession, getSessions, getSolution };
