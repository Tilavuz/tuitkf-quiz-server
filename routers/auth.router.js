const router = require('express').Router()
const { auth } = require('../middlewares/auth.middleware')
const { getUser, login } = require('../controllers/auth.controller');
const { loginLimiter } = require('../middlewares/login-limiter.middleware');


router.get("/auth", auth, getUser);
router.post('/login', loginLimiter, login)

module.exports = router