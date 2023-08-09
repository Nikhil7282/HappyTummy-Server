const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  foodItems: {
    type: Array, // { name: String, id: mongoose.Schema.Types.ObjectId, price: Number, quanity: Number }
    required: true,
  },
  couponApplied: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    default: null,
  },
  cartTotal: {
    type: Number,
    required: false,
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
  updateOn: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("carts", CartSchema);