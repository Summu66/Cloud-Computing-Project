const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileRoutes = require("./routes/file_route");
const upload = require("./util/multer");

function serverStart() {
  const app = express();
  const port = 3000;

  app.use(bodyParser.json());
  app.use(cors());
  app.use("/file", upload.single("fileData"), fileRoutes);

  app.get("/", (req, res) => res.json("alpha"));

  app.listen(port, () =>
    console.log(`Server is running on http://localhost:${port}/`)
  );
}
serverStart();
