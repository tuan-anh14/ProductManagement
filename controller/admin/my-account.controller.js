const md5 = require("md5");
const Account = require("../../model/account.model");
const Role = require("../../model/role.model");
const systemConfig = require("../../config/system");

//[GET] /admin/my-account
module.exports.index = (req, res) => {
  res.render("admin/pages/my-account/index.pug", {
    pageTitle: "Thông tin cá nhân",
  });
};

//[GET] /admin/my-account/edit
module.exports.edit = async (req, res) => {
  res.render("admin/pages/my-account/edit.pug", {
    pageTitle: "Chỉnh sửa thông tin cá nhân",
  });
};

//[PATCH] /admin/my-account/edit
module.exports.editPatch = async (req, res) => {
  const id = res.locals.user.id;

  const emailExits = await Account.findOne({
    _id: { $ne: id },
    email: req.body.email,
    deleted: false,
  });

  if (emailExits) {
    req.flash("error", `Email ${req.body.email} đã tồn tại`);
  } else {
    if (req.body.password) {
      req.body.password = md5(req.body.password);
    } else {
      delete req.body.password;
    }

    if (req.file) {
      req.body.avatar = `/uploads/${req.file.filename}`;
    }

    try {
      await Account.updateOne(
        {
          _id: id,
        },
        req.body
      );
      req.flash("success", `Đã cập nhật thành công tài khoản!`);
    } catch (error) {
      req.flash("error", `Cập nhật tài khoản thất bại!`);
    }
  }
  res.redirect("back");
};
