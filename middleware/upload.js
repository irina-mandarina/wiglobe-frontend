const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './wiglobemages'); // replace './uploads' with the directory where you want to save the uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

export default function (req, res, next) {
  upload.single('file')(req, res, function (err) {
    if (err) {
      return res.status(400).send(err.message);
    }
    next();
  });
}
