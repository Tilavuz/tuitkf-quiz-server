const router = require('express').Router()
const {auth} = require('../middlewares/auth.middleware')
const { getDataCount, getTopUsers, getTopFirstCource, getTopSecondCource, getTopThirdCource, getTopFourthCource } = require('../controllers/statistics.controller')

router.get('/statistics', auth, getDataCount)
router.get("/statistics/top-users", auth, getTopUsers);
router.get("/statistics/top-first-course-users", auth, getTopFirstCource);
router.get("/statistics/top-second-course-users", auth, getTopSecondCource);
router.get("/statistics/top-third-course-users", auth, getTopThirdCource);
router.get("/statistics/top-fourth-course-users", auth, getTopFourthCource);

module.exports = router