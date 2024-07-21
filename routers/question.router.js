const {
  createQuestion,
  getQuestions,
  removeQuestion,
  readQuestionFile,
} = require("../controllers/question.controller");
const { auth } = require("../middlewares/auth.middleware");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const router = require("express").Router();

router.get("/questions/:id", auth, getQuestions);
router.post("/questions/add", auth, createQuestion);
router.post(
  "/questions/file/:id",
  auth,
  upload.single("file"),
  readQuestionFile
);
router.delete("/questions/delete/:id", auth, removeQuestion);

module.exports = router;
