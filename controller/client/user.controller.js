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

// [GET] /user/login
module.exports.login = (req, res) => {
  res.render("client/pages/user/login", {
    pageTitle: "Đăng nhập",
  });
};

// [GET] /user/loginPost
module.exports.loginPost = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({
    email: email,
    deleted: false,
  });

  if (!user) {
    req.flash("error", `Email không tồn tại!`);
    res.redirect("back");
    return;
  }

  if (md5(password) != user.password) {
    req.flash("error", `Sai mật khẩu!`);
    res.redirect("back");
    return;
  }

  if (user.status == "inactive") {
    req.flash("error", `Tài khoản đang bị khoá !`);
    res.redirect("back");
    return;
  } 

  res.cookie("tokenUser", user.tokenUser);

  console.log(req.body);
  res.redirect("/");
};
