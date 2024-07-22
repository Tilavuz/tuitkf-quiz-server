const router = require("express").Router();
const {
  getNews,
  createNews,
  removeNews,
  changeNews,
} = require("../controllers/news.controller");
const { auth } = require("../middlewares/auth.middleware");

router.get("/news", auth, getNews);
router.get("/news/:id", auth, changeNews);
router.post("/news/create", auth, createNews);
router.delete("/news/delete/:id", auth, removeNews);

module.exports = router;
