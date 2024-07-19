const { getSciences, createScience, changeScience, removeScience, getScience } = require("../controllers/science.controller");
const { auth } = require("../middlewares/auth.middleware");

const router = require("express").Router();


router.get('/sciences', auth, getSciences)
router.get("/sciences/:id", auth, getScience);
router.post('/sciences/add', auth, createScience)
router.put("/sciences/update/:id", auth, changeScience);
router.delete("/sciences/delete/:id", auth, removeScience);

module.exports = router