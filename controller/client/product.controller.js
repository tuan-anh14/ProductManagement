const Product = require("../../model/product.model");

//[GET] /products
module.exports.index = async (req, res) => {
  try {
    const products = await Product.find({
      status: "active",
      deleted: false,
    }).sort({ position: "desc" });

    const newProducts = products.map((item) => ({
      ...item.toObject(), // Copy all properties of item
      priceNew: ((item.price * (100 - item.discountPercentage)) / 100).toFixed(
        0
      ),
    }));

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
        status: "active"
      };
  
      const product = await Product.findOne(find);

      console.log(product)
  
      res.render("client/pages/products/detail.pug", {
        pageTitle: product.title,
        product: product,
      });
    } catch (error) {
      res.redirect(`/products`);
    }
  };

