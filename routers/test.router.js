const router = require('express').Router()
const { startTest } = require('../controllers/test.controller')
const { auth } = require('../middlewares/auth.middleware')


router.post('/tests/:id', auth, startTest)

module.exports = router