const Role = require("../../model/role.model");
const systemConfig = require("../../config/system");

//[GET] /admin/role
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };

  const records = await Role.find(find);

  res.render("admin/pages/roles/index.pug", {
    pageTitle: "Nhóm quyền",
    records: records,
  });
};

//[GET] /admin/role/create
module.exports.create = async (req, res) => {
  let find = {
    deleted: false,
  };

  const records = await Role.find(find);

  res.render("admin/pages/roles/create.pug", {
    pageTitle: "Tạo nhóm quyền",
    records: records,
  });
};

//[POST] /admin/role/create
module.exports.createPost = async (req, res) => {
  const record = new Role(req.body);
  await record.save();

  res.redirect(`${systemConfig.prefixAdmin}/roles`);
};
