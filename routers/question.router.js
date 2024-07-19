const { createQuestion, getQuestions, removeQuestion } = require('../controllers/question.controller');
const { auth } = require('../middlewares/auth.middleware');

const router = require('express').Router()



router.get("/questions/:id", auth, getQuestions);
router.post("/questions/add", auth, createQuestion);
router.delete("/questions/delete/:id", auth, removeQuestion);


module.exports = router