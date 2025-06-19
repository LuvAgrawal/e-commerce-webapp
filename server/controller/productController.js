const APIResponse = require("../configs/responses");
const Product = require("../model/productModel");

const findProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    res
      .status(200)
      .json(new APIResponse(true, "Products found successfully", products));
  } catch (error) {
    console.log("findProduct Error", error);
  }
};

module.exports = { findProduct };
