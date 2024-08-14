const md5 = require("md5");

const User = require("../../model/user.model");

// [GET] /user/register
module.exports.register = (req, res) => {
  res.render("client/pages/user/register", {
    pageTitle: "Đăng ký tài khoản",
  });
};

// [POST] /user/register
module.exports.registerPost = async (req, res) => {
  console.log(req.body);
  const exitsEmail = await User.findOne({
    email: req.body.email,
    deleted: false,
  });

  if (exitsEmail) {
    req.flash("error", "Email đã tồn tại !");

    res.redirect("back");
    return;
  }
  if (req.body.password) {
    req.body.password = md5(req.body.password);
  }

  const user = new User(req.body);
  await user.save();

  console.log(user);
  res.cookie("tokenUser", user.tokenUser);
  
  res.redirect("/");
};
