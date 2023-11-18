const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
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
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    // type: String,
  },
  tag: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag',
    // type: String,
  },
  image_url: {
    type: String,
  },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
