module.exports.createPost = async (req, res, next) => {
  if (!req.body.fullName) {
    req.flash("error", "Vui lòng không để trống tên!");

    res.redirect("back");
    return;
  }

  if (!req.body.email) {
    req.flash("error", "Vui lòng không để trống email !");

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

module.exports.editPatch = async (req, res, next) => {
  if (!req.body.fullName) {
    req.flash("error", "Vui lòng không để trống tên!");

    res.redirect("back");
    return;
  }

  if (!req.body.email) {
    req.flash("error", "Vui lòng không để trống email !");

    res.redirect("back");
    return;
  }
  next();
};
