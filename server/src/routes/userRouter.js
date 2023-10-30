const express = require("express");
const userController = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");
const verifyAdminAccount = require("../middleware/verifyAdminAccount");
const userRouter = express.Router();

userRouter.delete("/deleteUser", verifyAdminAccount, userController.deleteUser);
userRouter.get("/getAllUser", verifyAdminAccount, userController.getAllUser);
userRouter.put("/update_info", verifyToken, userController.updateUserInfo);

module.exports = userRouter;
