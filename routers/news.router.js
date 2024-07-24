const router = require("express").Router();
const {
  getNews,
  createNews,
  removeNews,
  changeNews,
} = require("../controllers/news.controller");
const { getNewsBody, createNewsBody } = require('../controllers/news-body.controller')
const { auth } = require("../middlewares/auth.middleware");

router.get("/news", auth, getNews);
router.get("/news/body/:id", auth, getNewsBody);
router.put("/news/:id", auth, changeNews);
router.post("/news/create", auth, createNews);
router.post("/news/body/create/:id", auth, createNewsBody);
router.delete("/news/delete/:id", auth, removeNews);

module.exports = router;