const multer = require("multer");
const dirConfig = require("./dir");

const fileEngine = multer.diskStorage({
  destination: (req, file, cb) => cb(null, dirConfig.folderName),
  filename: (req, file, cb) => cb(null, file.originalname),
});
const upload = multer({ storage: fileEngine });

module.exports = upload;
