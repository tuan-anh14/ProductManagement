module.exports.priceNewProducts = (products) => {
  const newProducts = products.map((item) => ({
    ...item.toObject(), // Copy all properties of item
    priceNew: ((item.price * (100 - item.discountPercentage)) / 100).toFixed(0),
  }));

  return newProducts;
};
