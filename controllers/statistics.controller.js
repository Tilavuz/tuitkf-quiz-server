const Auth = require("../models/auth.model");
const Question = require("../models/question.model");
const Science = require("../models/science.model");
const Session = require("../models/session.model");
const User = require("../models/user.model");

const getDataCount = async (req, res) => {
  try {
    const auths = await Auth.find();
    const admins = auths.filter(
      (auth) => auth.role === "teacher" || auth.role === "admin"
    );
    const sciences = await Science.countDocuments();
    const questions = await Question.countDocuments();

    const statisticsDataCount = {
      users: auths.length,
      admins: admins.length,
      sciences,
      questions,
    };

    res.json(statisticsDataCount);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getTopUsers = async (req, res) => {
  try {
    const users = await Session.find()
      .sort({ score: -1, time: 1, questions: -1 })
      .limit(5).populate('science_id')

    let user1;
    let user2;
    let user3;
    let user4;
    let user5;

    if (users[0]) {
      user1 = await User.findOne({ auth: users[0].auth_id });
    }

    if (users[1]) {
      user2 = await User.findOne({ auth: users[1].auth_id });
    }

    if (users[2]) {
      user3 = await User.findOne({ auth: users[2].auth_id });
    }

    if (users[3]) {
      user4 = await User.findOne({ auth: users[3].auth_id });
    }

    if (users[4]) {
      user5 = await User.findOne({ auth: users[4].auth_id });
    }


    const topUsers = [
      {
        user: user1,
        session: users[0],
      },
      {
        user: user2,
        session: users[1],
      },
      {
        user: user3,
        session: users[2],
      },
      {
        user: user4,
        session: users[3],
      },
      {
        user: user5,
        session: users[4],
      },
    ];

    res.json(topUsers);
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = { getDataCount, getTopUsers };
