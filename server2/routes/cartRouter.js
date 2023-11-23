const express = require('express');
const router = express.Router();
const Cart = require('../model/cartModel');

async function getCart(req, res, next) {
  try {
    const cart = await Cart.findById(req.params.id);
    if (cart == null) {
      return res.status(404).json({ message: 'Tidak ada item di keranjang' });
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
    res.status(200).json(carts)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const userCart = await Cart.find({ user: userId }).populate('user').populate('product');
    if(userCart.length < 1) {
      return res.status(404).json({ message: 'Keranjang tidak ditemukan' });
    }
    res.status(200).json(userCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post('/', async (req, res) => {
  const cart = new Cart({
    name: req.body.name,
    amount: req.body.amount,
    price: req.body.price,
    description: req.body.description,
    user: req.body.user,
    image_url: req.body.image_url,
    product: req.body.product,
  });

  try {
    const newCart = await cart.save();

    res.status(201).json({ message: 'Cart berhasil ditambah', data: newCart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/:id', getCart, async (req, res) => {
  try {
    res.status(200).json(res.locals.cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// clear user cart
router.delete('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    await Cart.deleteMany({ user: userId });
    res.status(201).json({ message: 'Keranjang berhasil dihapus' });
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
    res.status(200).json({ message: 'Keranjang berhasil di hapus', data: cartId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// decrease cart amount
router.patch('/user/:userId/:id/decrease', async (req, res) => {
  try {
    const userId = req.params.userId;
    const cartId = req.params.id;

    const cart = await Cart.findOne({ user: userId, _id: cartId });

    if (!cart) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    if (cart.amount > 1) {
      cart.amount -= 1;
      const updatedCart = await cart.save();

      res.status(200).json(updatedCart);
    } else {
      await Cart.deleteOne({ user: userId, _id: cartId });
      res.status(201).json({ message: 'Keranjang berhasil di kurangi', data: cartId });
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
    const cart = await Cart.findOne({ user: userId, _id: cartId });

    if (!cart) {
      return res.status(404).json({ message: 'Tidak ditemukan item dalam keranjang' });
    }

    cart.amount += 1;

    const updatedCart = await cart.save();

    res.status(200).json({ message: 'Keranjang berhasil di tambah', data: updatedCart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
