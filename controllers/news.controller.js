const News = require("../models/news.model");
const NewsBody = require("../models/news-body.model");
const Auth = require("../models/auth.model");

const createNews = async (req, res) => {
  try {
    const { title, desc } = req.body;

    const auth_id = req.user._id;
    const auth = await Auth.findById(auth_id);

    if (auth.role !== "admin" && auth.role !== "teacher") {
      res.status(403).json({ message: "Sizga bu huquq berilmagan!" });
      return;
    }

    const createNews = await News.create({ title, desc, auth_id });

    res.json({ message: "Malumot yaratildi!", news: createNews });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const changeNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const auth_id = req.user._id;
    const auth = await Auth.findById(auth_id);

    if (auth.role !== "admin") {
      res.status(403).json({ message: "Sizga bu huquq berilmagan!" });
      return;
    }

    const news = await News.findById(id);
    news.status = status;

    res.json({ message: "Ruxsat berildi!" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const getNews = async (req, res) => {
  try {
    const news = await News.find({ status: true });
    res.json(news);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const removeNews = async (req, res) => {
  try {
    const { id } = req.params;
    const auth_id = req.user._id;
    const news = await News.findById(id);
    const auth = await Auth.findById(auth_id);

    if (auth.role !== "admin" && auth.role !== "teacher") {
      res.status(403).json({ message: "Sizga bu huquq berilmagan!" });
      return;
    }

    if (auth.role === "admin") {
      await News.findByIdAndDelete(id);
      await NewsBody.findOneAndDelete({ news_id: id });
      res.json({ message: "Malumot o'chirildi!" });
      return;
    }

    if (auth.role === "teacher" && auth_id === news.auth_id) {
      await News.findByIdAndDelete(id);
      await NewsBody.findOneAndDelete({ news_id: id });
      res.json({ message: "Malumot o'chirildi!" });
      return;
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports = { createNews, removeNews, getNews, changeNews };
