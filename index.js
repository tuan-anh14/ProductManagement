const express = require("express");
const methodOverride = require("method-override");
const path = require("path");
const route = require("./routes/client/index.route");
const routeAdmin = require("./routes/admin/index.route");
const database = require("./config/database");
const systemConfig = require("./config/system");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(express.static("public"));

app.use(methodOverride("_method"));

database.connect();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Route
route(app);
routeAdmin(app);

// App local variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
