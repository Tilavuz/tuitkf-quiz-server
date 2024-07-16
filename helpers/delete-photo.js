const fs = require("fs");

const deletePhoto = (photoPath) => {
  fs.unlink(photoPath, (err) => {
    if (err) {
      console.error(`Rasmni o'chirishda xatolik yuz berdi: ${err}`);
    } else {
      console.log(`Rasm o'chirildi: ${photoPath}`);
    }
  });
};

module.exports = deletePhoto;
