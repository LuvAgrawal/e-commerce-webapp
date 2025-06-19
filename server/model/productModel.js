const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  category: String,
  price: Number,
  discountPercentage: Number,
  rating: Number,
  stock: Number,
  tags: [String],
  brand: String,
  sku: String,
  weight: Number,
  dimensions: {
    type: Map,
    of: mongoose.Schema.Types.Mixed, // can be adjusted if dimensions have a defined structure
  },
  warrantyInformation: String,
  shippingInformation: String,
  availabilityStatus: String,
  reviews: [mongoose.Schema.Types.Mixed], // or define a specific review schema
  returnPolicy: String,
  minimumOrderQuantity: Number,
  meta: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
  },
  images: [String],
  thumbnail: String,
}, {
  collection: "products" // ensure this matches your actual collection name
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
