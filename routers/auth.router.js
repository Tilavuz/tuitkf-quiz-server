const router = require('express').Router()
const { auth } = require('../middlewares/auth.middleware')
const { getUser, login, changeUser } = require('../controllers/auth.controller');
const { loginLimiter } = require('../middlewares/login-limiter.middleware');
const upload = require('../middlewares/upload.middleware')


router.get("/auth", auth, getUser);
router.put("/user/:id", auth, upload, changeUser);
router.post('/login', loginLimiter, login)

module.exports = router