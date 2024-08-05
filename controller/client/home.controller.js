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

  const newProductsFeatured = productHelpers.priceNewProducts(productsFeatured);

  // Hết lấy sản phẩm nổi bật

  // Hiển thị danh sách sản phẩm mới nhất
  const productNews = await Product.find({
    deleted: false,
    status: "active",
  })
    .sort({ position: "desc" })
    .limit(6);

  const newProductsNew = productHelpers.priceNewProducts(productNews);

  // End Hiển thị danh sách sản phẩm mới nhất

  res.render("client/pages/home/index", {
    pageTitle: "Trang chủ",
    productsFeatured: newProductsFeatured,
    productsNew: newProductsNew,
  });
};
