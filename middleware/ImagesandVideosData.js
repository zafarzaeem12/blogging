const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "image") {
      cb(null, "./public/Posts/");
    }
  },
  filename: function (req, file, cb) {
    if (file.fieldname === "image") {
      const filename = file.originalname.split(" ").join("-");
      cb(null, `${filename}`);
    }
  },
});

const user = multer({
  storage : storage,
}).single('image')

module.exports = { user };