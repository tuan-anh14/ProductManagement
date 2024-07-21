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

//[GET] /admin/roles/permission
module.exports.permissions = async (req, res) => {
  let find = {
    deleted: false,
  };

  const records = await Role.find(find);

  res.render("admin/pages/roles/permission.pug", {
    pageTitle: "Phân quyền",
    records: records,
  });
};

//[PATCH] /admin/roles/permissions
module.exports.permissionsPatch = async (req, res) => {
  try {
    console.log("Request body:", req.body);

    let permissions;
    try {
      permissions = JSON.parse(req.body.permissions);
    } catch (error) {
      console.error("Invalid JSON data", error);
      return res.status(400).send("Invalid JSON data");
    }

    for (const item of permissions) {
      try {
        const result = await Role.updateOne(
          { _id: item.id },
          { permissions: item.permissions } // Ensure field name is correct
        );
      } catch (error) {
        console.error(`Failed to update ${item.id}:`, error);
      }
    }

    req.flash("success", `Đã cập nhật phân quyền thành công!`);
    res.redirect("back");
  } catch (error) {
    console.error("Error in permissionPatch:", error);
    res.status(500).send("Internal Server Error");
  }
};