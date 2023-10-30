const express = require("express");
const verifyAdminAccount = require("../middleware/verifyAdminAccount");
const productRouter = express.Router();
const productController = require("../controllers/productController");

productRouter.get("/category/:type", productController.getProductByCategory);
productRouter.get("/getDeal", productController.getProductDeal);
productRouter.put(
    "/update",
    verifyAdminAccount,
    productController.updateProduct
);
productRouter.delete(
    "/delete",
    verifyAdminAccount,
    productController.deleteProduct
);
productRouter.get("/getAllProduct", productController.getAllProduct);
productRouter.post(
    "/create",
    verifyAdminAccount,
    productController.createProduct
);

productRouter.get("/search/:keyword", productController.getProductByKeyword);

module.exports = productRouter;
