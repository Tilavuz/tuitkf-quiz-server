const router = require('express').Router()
const {auth} = require('../middlewares/auth.middleware')
const { getDataCount, getTopUsers } = require('../controllers/statistics.controller')

router.get('/statistics', auth, getDataCount)
router.get("/statistics/top-users", auth, getTopUsers);

module.exports = router