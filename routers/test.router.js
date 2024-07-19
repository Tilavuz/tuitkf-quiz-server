const router = require('express').Router()
const { startTest, checkAnswer } = require('../controllers/test.controller')
const { auth } = require('../middlewares/auth.middleware')


router.post('/tests/:id', auth, startTest)
router.post("/tests/answer/:id", auth, checkAnswer);

module.exports = router