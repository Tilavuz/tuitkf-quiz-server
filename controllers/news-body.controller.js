const NewsBody = require('../models/news-body.model')
const News = require("../models/news.model");
const Auth = require("../models/auth.model");

const createNewsBody = async (req, res) => {
    try {
        const { id } = req.params // news id
        const { news } = req.body
        
        const auth_id = req.user._id
        const auth = await Auth.findById(auth_id)

        if (auth.role !== "admin" && auth.role !== "teacher") {
          res.status(403).json({ message: "Sizga bu huquq berilmagan!" });
          return;
        }
        const newsBody = await NewsBody.create({ news_id: id, news })

        res.json({ message: "Malumot yaratildi!", newsBody });
    } catch (error) {
        res.json({ message: error.message })
    }
}

const getNewsBody = async (req, res) => {
    try {
        const { id } = req.params // news id
        const newsBody = await NewsBody.find({ news_id: id })
        res.json(newsBody)
    } catch (error) {
        res.json({ message: error.message })
    }
}


module.exports = { createNewsBody, getNewsBody };