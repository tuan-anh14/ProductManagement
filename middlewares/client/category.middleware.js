const ProductCategory = require("../../model/product-category.model");
const createTreeHelper = require("../../helpers/createTree");

module.exports.category = async (req, res, next) => {
  let find = {
    deleted: false,
  };
  const productsCategory = await ProductCategory.find(find);

  const newProductsCategory = createTreeHelper.tree(productsCategory);

  //   console.log(newProductsCategory)

  res.locals.layoutProductsCategory = newProductsCategory;

  next();
};
