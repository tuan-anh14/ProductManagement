const express = require('express')
const route = express.Router()

const controller = require("../../controller/client/chat.controller")

const chatMiddleware = require("../../middlewares/client/chat.middleware")

route.get('/:roomChatId', chatMiddleware.isAccess, controller.index)

module.exports = route; 