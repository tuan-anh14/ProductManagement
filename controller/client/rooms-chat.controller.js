const Product = require("../../model/product.model");
const productsHelper = require("../../helpers/product");

// [GET] /search/
module.exports.index = async (req, res) => {
  res.render("client/pages/rooms-chat/index", {
    pageTitle: "Danh sách phòng",
  });
};
