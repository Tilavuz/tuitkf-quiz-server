const router = require('express').Router()
const { createSession, removeSession } = require('../controllers/session.controller')
const { auth } = require('../middlewares/auth.middleware')


router.post('/sessions/add/:id', auth, createSession)
router.delete('/sessions/delete/:id', auth, removeSession)





module.exports = router