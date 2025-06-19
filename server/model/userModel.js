// models/User.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const AddressSchema = new Schema(
  {
    label: { type: String, enum: ["Home", "Work", "Other"], default: "Home" },
    recipientName: { type: String, required: true },
    phone: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    postalCode: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
  },
  { _id: false }
);

const UserSchema = new Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true,
  },
  mobile: {
    type: String,
    unique: true,
    sparse: true, // allows nulls
  },
  password: {
    type: String,
    required: function () {
      return !this.authProvider;
    },
    minlength: 6,
    select: false,
  },
  authProvider: {
    type: String,
    enum: ["local", "google", "facebook"],
    default: "local",
  },
  providerId: { type: String }, // for OAuth logins

  role: {
    type: String,
    enum: ["customer", "admin", "seller"],
    default: "customer",
  },

  emailVerified: { type: Boolean, default: false },
  phoneVerified: { type: Boolean, default: false },

  addresses: [AddressSchema],

  wishlist: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],

  cart: {
    type: Schema.Types.ObjectId,
    ref: "Cart",
  },

  lastLogin: { type: Date },
  isActive: { type: Boolean, default: true },
  bannedUntil: { type: Date, default: null },

  // Security & metadata
  loginAttempts: { type: Number, default: 0 },
  lockUntil: { type: Date },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Index to prevent multiple default addresses
UserSchema.index(
  { _id: 1, "addresses.isDefault": 1 },
  { unique: true, partialFilterExpression: { "addresses.isDefault": true } }
);

// Rate-limiting helper
UserSchema.methods.isAccountLocked = function () {
  return this.lockUntil && this.lockUntil > Date.now();
};

module.exports = mongoose.model("User", UserSchema);
