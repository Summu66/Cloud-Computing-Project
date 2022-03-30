const express = require("express");
const path = require("path");
const dirConfig = require("../util/dir");
const router = express.Router();
router.post("/upload", (req, res) => {
  console.log(req.file);
  res.send(req.file);
});
router.get("/download", (req, res) => {
  const file = dirConfig.folderPath + "\\" + req.body.fileName;
  console.log(file);
  res.sendFile(file, (err) => {
    if (err) {
      res.send(`No File Found with name ${req.body.fileName}`);
    } else {
      console.log("Sent:", req.body.fileName);
    }
  });
});
module.exports = router;
