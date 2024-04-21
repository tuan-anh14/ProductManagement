const express = require("express")
const route = express.Router()

const controller = require("../../controller/admin/products.controller")

route.get("/", controller.products)

route.patch('/change-status/:status/:id', controller.changeStatus)

route.patch('/change-multi', controller.changeMulti)


module.exports = route