
const dashboardRoutes = require("../admin/dashboard.route")
const productRoutes = require("../admin/products.route")
const productCategoryRoutes = require("../admin/products-category.route")
const roleRoutes = require("../admin/role.route")
const accountRoutes = require("../admin/account.route")
const authRoutes = require("../admin/auth.route")

const authMiddleware = require("../../middlewares/admin/auth.middleware")

const systemConfig = require("../../config/system")

module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin

    app.use(PATH_ADMIN + "/dashboard", authMiddleware.requireAuth, dashboardRoutes)

    app.use(PATH_ADMIN + "/products", authMiddleware.requireAuth, productRoutes)

    app.use(PATH_ADMIN + "/products-category", authMiddleware.requireAuth, productCategoryRoutes)

    app.use(PATH_ADMIN + "/roles", authMiddleware.requireAuth, roleRoutes)

    app.use(PATH_ADMIN + "/accounts", authMiddleware.requireAuth, accountRoutes)

    app.use(PATH_ADMIN + "/auth", authRoutes)

}
