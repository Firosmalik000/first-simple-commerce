const express = require('express');
const router = express.Router();
const Cart = require('../model/cartModel');

async function getCart(req, res, next) {
  try {
    const cart = await Cart.findById(req.params.id);
    if (cart == null) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    res.locals.cart = cart;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  return next();
}

// Mendapatkan semua item dalam keranjang
router.get('/', async (req, res) => {
  try {
    const carts = await Cart.find().populate('user').populate('product');
    res.json(carts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const userCart = await Cart.find({ user: userId }).populate('user').populate('product');
    res.status(200).json(userCart);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Menambah item ke dalam keranjang
router.post('/', async (req, res) => {
  const cart = new Cart({
    name: req.body.name,
    amount: req.body.amount,
    price: req.body.price,
    description: req.body.description,
    user: req.body.user, // Menyimpan ID pengguna dari permintaan
    image_url: req.body.image_url,
    product: req.body.product,
  });

  try {
    const newCart = await cart.save();

    res.status(201).json({ message: 'Cart created successfully', data: newCart });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Mendapatkan detail item dalam keranjang berdasarkan ID
router.get('/:id', getCart, (req, res) => {
  res.json(res.cart);
});

// clear user cart
router.delete('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    await Cart.deleteMany({ user: userId });
    res.json({ message: 'All carts deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// remove cart by id
router.delete('/user/:userId/:id', async (req, res) => {
  try {
    const userId = req.params.userId;
    const cartId = req.params.id;
    await Cart.deleteOne({ user: userId, _id: cartId });
    res.json({ message: 'Cart deleted successfully', data: cartId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// decrease cart amount
router.patch('/user/:userId/:id/decrease', async (req, res) => {
  try {
    const userId = req.params.userId;
    const cartId = req.params.id;

    // Ambil item keranjang yang sesuai
    const cart = await Cart.findOne({ user: userId, _id: cartId });

    if (!cart) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Pastikan jumlah item tidak kurang dari 1 sebelum mengurangkan
    if (cart.amount > 1) {
      // Kurangi jumlah item
      cart.amount -= 1;

      // Simpan perubahan
      const updatedCart = await cart.save();

      res.json(updatedCart);
    } else {
      await Cart.deleteOne({ user: userId, _id: cartId });
      res.json({ message: 'Cart deleted successfully', data: cartId });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// increase cart
router.patch('/user/:userId/:id/increase', async (req, res) => {
  try {
    const userId = req.params.userId;
    const cartId = req.params.id;

    // Ambil item keranjang yang sesuai
    const cart = await Cart.findOne({ user: userId, _id: cartId });

    if (!cart) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Tambah jumlah item
    cart.amount += 1;

    // Simpan perubahan
    const updatedCart = await cart.save();

    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
