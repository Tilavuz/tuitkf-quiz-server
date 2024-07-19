const { getUsers, getUser } = require('../controllers/user.controller')
const { auth } = require('../middlewares/auth.middleware')
const router = require('express').Router()


router.get('/users', auth, getUsers)
router.get("/users/:id", auth, getUser);


module.exports = router