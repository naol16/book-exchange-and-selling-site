
const multer = require('multer');

// Configure Multer to use memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

function uploader(value) {
  return (req, res, next) => {
    upload.single(value)(req, res, function (err) {
      if (err) {
        return res.status(400).send({"error":err.message});
      }
      next();
    });
  };
}

module.exports = uploader;
