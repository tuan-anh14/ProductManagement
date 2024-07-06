
const dashboardRoutes = require("../admin/dashboard.route")
const productRoutes = require("../admin/products.route")
const productCategoryRoutes = require("../admin/products-category.route")
const systemConfig = require("../../config/system")

module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin

    app.use(PATH_ADMIN + "/dashboard", dashboardRoutes)

    app.use(PATH_ADMIN + "/products", productRoutes)

    app.use(PATH_ADMIN + "/products-category", productCategoryRoutes)
}
