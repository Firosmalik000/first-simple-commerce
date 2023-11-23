const Cart = require('../model/cartModel');

const index = async (req, res) => {
  try {
    const carts = await Cart.find().populate('user').populate('product');
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const indexId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userCart = await Cart.find({ user: userId }).populate('user').populate('product');
    if (userCart.length < 1) {
      return res.status(404).json({ message: 'Keranjang tidak ditemukan' });
    }
    res.status(200).json(userCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const store = async (req, res) => {
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
};

const detail = async (req, res) => {
  try {
    res.status(200).json(res.locals.cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const clearUserCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    await Cart.deleteMany({ user: userId });
    res.status(201).json({ message: 'Keranjang berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeUserCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cartId = req.params.id;
    await Cart.deleteOne({ user: userId, _id: cartId });
    res.status(200).json({ message: 'Keranjang berhasil di hapus', data: cartId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const decrease = async (req, res) => {
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
};

const increase = async (req, res) => {
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
};
module.exports = {
  index,
  indexId,
  store,
  detail,
  clearUserCart,
  removeUserCart,
  decrease,
  increase,
};
