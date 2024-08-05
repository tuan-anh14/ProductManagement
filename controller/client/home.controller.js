const Product = require("../../model/product.model");

const productHelpers = require("../../helpers/product");

//[GET] /
module.exports.index = async (req, res) => {
  // Lấy ra sản phẩm nổi bật
  const productsFeatured = await Product.find({
    featured: "1",
    deleted: false,
    status: "active",
  }).limit(6);

  const newProducts = productHelpers.priceNewProducts(productsFeatured);

  // Hết lấy sản phẩm nổi bật

  res.render("client/pages/home/index", {
    pageTitle: "Trang chủ",
    productsFeatured: newProducts,
  });
};
