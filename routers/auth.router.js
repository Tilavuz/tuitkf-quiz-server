const router = require('express').Router()
const { auth } = require('../middlewares/auth.middleware')
const { getUser, login } = require('../controllers/auth.controller')


router.get("/auth", auth, getUser);
router.post('/login', login)

module.exports = router