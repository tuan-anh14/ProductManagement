const express = require("express")
const route = express.Router()

const controller = require("../../controller/admin/products.controller")

route.get("/", controller.products)

module.exports = route