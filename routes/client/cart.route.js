const express = require('express')
const route = express.Router()

const controller = require("../../controller/client/cart.controller")

route.get('/', controller.index)

route.post('/add/:productId', controller.addPost)

module.exports = route; 