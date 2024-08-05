const Product = require("../../model/product.model");
const ProductCategory = require("../../model/product-category.model");

const productHelpers = require("../../helpers/product");
const productCategoryHelpers = require("../../helpers/product-category");
const { get } = require("mongoose");

//[GET] /products
module.exports.index = async (req, res) => {
  try {
    const products = await Product.find({
      status: "active",
      deleted: false,
    }).sort({ position: "desc" });

    const newProducts = productHelpers.priceNewProducts(products);

    res.render("client/pages/products/index", {
      pageTitle: "Danh sách sản phẩm",
      products: newProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

//[GET] /products/:slug
module.exports.detail = async (req, res) => {
  try {
    const find = {
      deleted: false,
      slug: req.params.slug,
      status: "active",
    };

    const product = await Product.findOne(find);

    // console.log(product)

    res.render("client/pages/products/detail.pug", {
      pageTitle: product.title,
      product: product,
    });
  } catch (error) {
    res.redirect(`/products`);
  }
};

//[GET] /products/:slugCategory
module.exports.category = async (req, res) => {
  try {
    console.log(req.params.slugCategory);

    const category = await ProductCategory.findOne({
      slug: req.params.slugCategory,
      deleted: false,
    });

    if (!category) {
      return res.status(404).send("Category not found");
    }

    const listSubCategory = await productCategoryHelpers.getSubCategory(category.id);

    const listSubCategoryId = listSubCategory.map((item) => item.id);

    const products = await Product.find({
      product_category_id: { $in: [category.id, ...listSubCategoryId] },
      deleted: false,
      status: "active",
    }).sort({ position: "desc" });

    const newProducts = productHelpers.priceNewProducts(products);

    console.log(products);

    res.render("client/pages/products/index", {
      pageTitle: category.title,
      products: newProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
