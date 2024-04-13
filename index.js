const express = require("express");
const path = require("path");
const route = require("./routes/client/index.route");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(express.static("public"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Route
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
