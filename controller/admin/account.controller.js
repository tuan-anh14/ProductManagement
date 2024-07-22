const md5 = require("md5");
const Account = require("../../model/account.model");
const Role = require("../../model/role.model");
const systemConfig = require("../../config/system");

//[GET] /admin/accounts
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };

  const records = await Account.find(find).select("-password -token");

  for (const record of records) {
    const role = await Role.findOne({
      _id: record.role_id,
      deleted: false,
    });
    record.role = role;
  }

  res.render("admin/pages/accounts/index.pug", {
    pageTitle: "Danh sách tài khoản",
    records: records,
  });
};

//[GET] /admin/accounts/create
module.exports.create = async (req, res) => {
  const roles = await Role.find({
    deleted: false,
  });

  res.render("admin/pages/accounts/create.pug", {
    pageTitle: "Tạo mới tài khoản",
    roles: roles,
  });
};

//[POST] /admin/accounts/create
module.exports.createPost = async (req, res) => {
  const emailExits = await Account.findOne({
    email: req.body.email,
    deleted: false,
  });

  if (emailExits) {
    req.flash("error", `Email ${req.body.email} đã tồn tại`);
    res.redirect("back");
  } else {
    req.body.password = md5(req.body.password);

    const record = new Account(req.body);
    await record.save();
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  }
};

//[GET] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const find = {
      deleted: false,
      _id: req.params.id,
    };

    const data = await Account.findOne(find);

    const roles = await Role.find({
      deleted: false,
    });

    res.render("admin/pages/accounts/edit.pug", {
      pageTitle: "Chỉnh sửa tài khoản",
      data: data,
      roles: roles,
    });
  } catch (error) {
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
};

//[PATCH] /admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;

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
