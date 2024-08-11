const express = require('express')
const route = express.Router()

const controller = require("../../controller/client/checkout.controller")

route.get('/', controller.index)

route.post('/order', controller.index)

module.exports = route; 