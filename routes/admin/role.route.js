const express = require("express");
const route = express.Router();

const controller = require("../../controller/admin/role.controller");

route.get("/", controller.index);

route.get("/create", controller.create);

route.post("/create", controller.createPost);

route.get("/permissions", controller.permissions);

route.patch("/permissions", controller.permissionsPatch);

module.exports = route;
