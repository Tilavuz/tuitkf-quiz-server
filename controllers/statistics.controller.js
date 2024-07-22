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
      .limit(4)
      .populate("science_id");

    let user1;
    let user2;
    let user3;
    let user4;

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
    ];

    res.json(topUsers);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getTopFirstCource = async (req, res) => {
  try {
    const sciences = (await Science.find({ course: 1 }).select("_id")).map(
      (item) => item._id
    );
    const sessionsTop = await Session.find({ science_id: { $in: sciences } })
      .sort({ score: -1, time: 1, questions: -1 })
      .limit(4)
      .populate("science_id");

      let user1;
      let user2;
      let user3;
      let user4;
      
      if (sessionsTop[0]) {
        user1 = await User.findOne({ auth: sessionsTop[0].auth_id });
      }

      if (sessionsTop[1]) {
        user2 = await User.findOne({ auth: sessionsTop[1].auth_id });
      }

      if (sessionsTop[2]) {
        user3 = await User.findOne({ auth: sessionsTop[2].auth_id });
      }

      if (sessionsTop[3]) {
        user4 = await User.findOne({ auth: sessionsTop[3].auth_id });
      }

      const topUsers = [
        {
          user: user1,
          session: sessionsTop[0],
        },
        {
          user: user2,
          session: sessionsTop[1],
        },
        {
          user: user3,
          session: sessionsTop[2],
        },
        {
          user: user4,
          session: sessionsTop[3],
        },
      ];
      res.json(topUsers);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getTopSecondCource = async (req, res) => {
  try {
    const sciences = (await Science.find({ course: 2 }).select("_id")).map(
      (item) => item._id
    );
    const sessionsTop = await Session.find({ science_id: { $in: sciences } })
      .sort({ score: -1, time: 1, questions: -1 })
      .limit(4)
      .populate("science_id");

    let user1;
    let user2;
    let user3;
    let user4;

    if (sessionsTop[0]) {
      user1 = await User.findOne({ auth: sessionsTop[0].auth_id });
    }

    if (sessionsTop[1]) {
      user2 = await User.findOne({ auth: sessionsTop[1].auth_id });
    }

    if (sessionsTop[2]) {
      user3 = await User.findOne({ auth: sessionsTop[2].auth_id });
    }

    if (sessionsTop[3]) {
      user4 = await User.findOne({ auth: sessionsTop[3].auth_id });
    }

    const topUsers = [
      {
        user: user1,
        session: sessionsTop[0],
      },
      {
        user: user2,
        session: sessionsTop[1],
      },
      {
        user: user3,
        session: sessionsTop[2],
      },
      {
        user: user4,
        session: sessionsTop[3],
      },
    ];
    res.json(topUsers);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getTopThirdCource = async (req, res) => {
  try {
    const sciences = (await Science.find({ course: 3 }).select("_id")).map(
      (item) => item._id
    );
    const sessionsTop = await Session.find({ science_id: { $in: sciences } })
      .sort({ score: -1, time: 1, questions: -1 })
      .limit(4)
      .populate("science_id");

    let user1;
    let user2;
    let user3;
    let user4;

    if (sessionsTop[0]) {
      user1 = await User.findOne({ auth: sessionsTop[0].auth_id });
    }

    if (sessionsTop[1]) {
      user2 = await User.findOne({ auth: sessionsTop[1].auth_id });
    }

    if (sessionsTop[2]) {
      user3 = await User.findOne({ auth: sessionsTop[2].auth_id });
    }

    if (sessionsTop[3]) {
      user4 = await User.findOne({ auth: sessionsTop[3].auth_id });
    }

    const topUsers = [
      {
        user: user1,
        session: sessionsTop[0],
      },
      {
        user: user2,
        session: sessionsTop[1],
      },
      {
        user: user3,
        session: sessionsTop[2],
      },
      {
        user: user4,
        session: sessionsTop[3],
      },
    ];
    res.json(topUsers);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getTopFourthCource = async (req, res) => {
  try {
    const sciences = (await Science.find({ course: 4 }).select("_id")).map(
      (item) => item._id
    );
    const sessionsTop = await Session.find({ science_id: { $in: sciences } })
      .sort({ score: -1, time: 1, questions: -1 })
      .limit(4)
      .populate("science_id");

    let user1;
    let user2;
    let user3;
    let user4;

    if (sessionsTop[0]) {
      user1 = await User.findOne({ auth: sessionsTop[0].auth_id });
    }

    if (sessionsTop[1]) {
      user2 = await User.findOne({ auth: sessionsTop[1].auth_id });
    }

    if (sessionsTop[2]) {
      user3 = await User.findOne({ auth: sessionsTop[2].auth_id });
    }

    if (sessionsTop[3]) {
      user4 = await User.findOne({ auth: sessionsTop[3].auth_id });
    }

    const topUsers = [
      {
        user: user1,
        session: sessionsTop[0],
      },
      {
        user: user2,
        session: sessionsTop[1],
      },
      {
        user: user3,
        session: sessionsTop[2],
      },
      {
        user: user4,
        session: sessionsTop[3],
      },
    ];
    res.json(topUsers);
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = {
  getDataCount,
  getTopUsers,
  getTopFirstCource,
  getTopSecondCource,
  getTopThirdCource,
  getTopFourthCource,
};
