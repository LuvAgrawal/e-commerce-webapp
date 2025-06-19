const express = require("express");
const { findProduct } = require("../controller/productController");

const router = express.Router();
router.get("/", findProduct);

module.exports = router;
