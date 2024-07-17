const { getUsers } = require('../controllers/user.controller')
const { auth } = require('../middlewares/auth.middleware')
const router = require('express').Router()




router.get('/users', auth, getUsers)



module.exports = router