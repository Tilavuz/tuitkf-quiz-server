const multer = require("multer");
const path = require("path");

// Multer konfiguratsiyasi
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = "newtest";
    const extension = path.extname(file.originalname);
    const fileName = uniqueSuffix + extension;
    cb(null, fileName);
  },
});

const fileFilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(doc|docx)$/)) {
    return cb(
      new Error(
        "Faqat .doc yoki .docx formatdagi fayllarni yuklashingiz mumkin"
      )
    );
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = { upload };
