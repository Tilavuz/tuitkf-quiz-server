const Science = require("../models/science.model");
const Auth = require("../models/auth.model");

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



const changeScience = async (req, res) => {
  try {
    const { id } = req.params
    const auth_id = req.user._id;
    const auth = await Auth.findById(id);
    const { title, teacher, cource } = req.body;

    if (auth.role !== "admin" || auth.role !== "teacher") {
      res.status(403).json({ message: "Sizga bu huquq berilmagan!" });
      return;
    }
    let science = await Science.findById(id);

    if (auth.role === "admin") {
      if (title) science.title = title;
      if (teacher) science.teacher = teacher;
      if (cource) science.cource = cource;
    }

    if(auth.role === 'teacher' && science.auth_id === auth_id) {
        if (title) science.title = title;
        if (teacher) science.teacher = teacher;
        if (cource) science.cource = cource;
    }
    await science.save()

    res.json({ message: 'Test malumotlari yangilandi!', science })

  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = { getSciences, changeScience };
