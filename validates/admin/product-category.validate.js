module.exports.createPost = async (req, res, next) => {
    if (!req.body.title) {
      req.flash("error", "Vui lòng không để trống tiêu đề!");
  
      res.redirect("back");
      return;
    }
      
    if (req.body.title.length < 2) {
      req.flash("error", "Vui lòng nhập độ dài tiêu đề lớn hơn 2 kí tự!");
  
      res.redirect("back");
  
      return;
    }
    next();
  };
  