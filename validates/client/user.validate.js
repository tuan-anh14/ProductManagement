module.exports.registerPost = async (req, res, next) => {
  if (!req.body.fullName) {
    req.flash("error", "Vui lòng không để trống họ tên!");

    res.redirect("back");
    return;
  }

  if (!req.body.email) {
    req.flash("error", "Vui lòng không để trống email!");

    res.redirect("back");
    return;
  }

  if (!req.body.password) {
    req.flash("error", "Vui lòng không để trống mật khẩu!");

    res.redirect("back");
    return;
  }

  next();
};
