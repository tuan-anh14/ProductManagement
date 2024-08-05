const express = require('express')
const route = express.Router()

const controller = require("../../controller/client/product.controller")

route.get('/', controller.index)

route.get('/:slugCategory', controller.category)

// route.get('/:slug', controller.detail)

module.exports = route; 