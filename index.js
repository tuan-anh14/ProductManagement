const express = require('express')
const path = require("path")
const route = require("./routes/client/index.route")

const app = express()
const port = 3000

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug");

// app.get("/", (req, res) => {
//   res.render("client/pages/home/index")
// })

// app.get("/products", (req, res) => {
//   res.render("client/pages/products/index")
// })

// Route
route(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})