const express = require("express");
const multer = require("multer");
const route = express.Router();

const upload = multer();

const controller = require("../../controller/admin/my-account.controller");
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const validate = require("../../validates/admin/account.validate");

route.get("/", controller.index);

route.get("/edit", controller.edit);

route.patch(
  "/edit",
  upload.single("avatar"),
  uploadCloud.upload,
  validate.editPatch,
  controller.editPatch
);

module.exports = route;
