const express = require('express')
const route = express.Router()

const controller = require("../../controller/client/user.controller")
const validate = require("../../validates/client/user.validate")

route.get('/register', controller.register)

route.post('/register', validate.registerPost, controller.registerPost)


module.exports = route; 