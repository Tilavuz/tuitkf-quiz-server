const router = require('express').Router()
const { auth } = require('../middlewares/auth.middleware')
const { getUser, login, register } = require('../controllers/auth.controller')


router.get("/auth", auth, getUser);
router.post('/login', auth, login)
router.post("/register", auth, register);

module.exports = router