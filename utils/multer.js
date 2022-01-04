const multer = require("multer");

// set storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("A");
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    console.log("B");
    // get file extension
    const ext = file.originalname.substr(file.originalname.lastIndexOf("."));
    cb(null, file.fieldname + "-" + Date.now() + ext);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
