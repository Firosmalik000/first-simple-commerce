const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  image_url: String,
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
});
const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
