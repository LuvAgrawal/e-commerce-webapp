const express = require("express");
const { adminMiddleware } = require("../controller/middleWares");
const adminController = require("../controller/adminController");
const router = express.Router();

router.route("/").get(adminMiddleware, adminController.getAllUsers);

router
  .route("/:_id")
  .delete(adminMiddleware, adminController.deleteUser)
  .put(adminMiddleware, adminController.updateUser);

module.exports = router;
