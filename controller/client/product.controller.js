const Product = require("../../model/product.model")

module.exports.index = async (req, res) => {
    try {
        const products = await Product.find({
            status: "active",
            deleted: false
        });

        const newProducts = products.map(item => ({
            ...item.toObject(), // Copy all properties of item
            priceNew: (item.price * (100 - item.discountPercentage) / 100).toFixed(0)
        }));

        console.log(newProducts);

        res.render("client/pages/products/index", {
            pageTitle: "Danh sách sản phẩm",
            products: newProducts
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
