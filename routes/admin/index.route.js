const dashboardRoutes = require("../admin/dashboard.route");
const productRoutes = require("../admin/products.route");
const productCategoryRoutes = require("../admin/products-category.route");
const roleRoutes = require("../admin/role.route");
const accountRoutes = require("../admin/account.route");
const authRoutes = require("../admin/auth.route");
const myAccountRoutes = require("../admin/my-account.route");
const settingRoutes = require("../admin/setting.route");

const authMiddleware = require("../../middlewares/admin/auth.middleware");

const systemConfig = require("../../config/system");

const authController = require("../../controller/admin/auth.controller") 

module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;

  app.get(PATH_ADMIN + "/", authController.login);

  app.use(
    PATH_ADMIN + "/dashboard",
    authMiddleware.requireAuth,
    dashboardRoutes
  );

  app.use(PATH_ADMIN + "/products", authMiddleware.requireAuth, productRoutes);

  app.use(
    PATH_ADMIN + "/products-category",
    authMiddleware.requireAuth,
    productCategoryRoutes
  );

  app.use(PATH_ADMIN + "/roles", authMiddleware.requireAuth, roleRoutes);

  app.use(PATH_ADMIN + "/accounts", authMiddleware.requireAuth, accountRoutes);

  app.use(PATH_ADMIN + "/auth", authRoutes);

  app.use(
    PATH_ADMIN + "/my-account",
    authMiddleware.requireAuth,
    myAccountRoutes
  );

  app.use(PATH_ADMIN + "/settings", authMiddleware.requireAuth, settingRoutes);
};
