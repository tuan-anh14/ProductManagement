const Product = require("../../model/product.model");
const filterStatusHelpers = require("../../helpers/filterStatus")

//[GET] /admin/products
module.exports.products = async (req, res) => {
  const filterStatus = filterStatusHelpers(req.query)


  let find = {
    deleted: false
  }

  if(req.query.status){
    find.status = req.query.status
  }

  const products = await Product.find(find);
  // console.log(products)

  res.render("admin/pages/products/index.pug", {
    pageTitle: "Trang danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
  });
};
