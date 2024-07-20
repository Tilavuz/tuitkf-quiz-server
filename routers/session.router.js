const router = require('express').Router()
const { createSession, removeSession, getSessions, getSolution } = require('../controllers/session.controller')
const { auth } = require('../middlewares/auth.middleware')

router.get("/sessions", auth, getSessions);
router.get("/sessions/solution/:id", auth, getSolution);
router.post('/sessions/add/:id', auth, createSession)
router.delete('/sessions/delete/:id', auth, removeSession)





module.exports = router