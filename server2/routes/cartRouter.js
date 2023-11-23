const router = require('express').Router();
const Cart = require('../model/cartModel');
const cartController = require('../controller/cartController');

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
router.get('/', cartController.index);

router.get('/user/:userId', cartController.indexId);

router.post('/', cartController.store);

router.get('/:id', getCart, cartController.detail);

// clear user cart
router.delete('/user/:userId', cartController.clearUserCart);

// remove cart by id
router.delete('/user/:userId/:id', cartController.removeUserCart);

// decrease cart amount
router.patch('/user/:userId/:id/decrease', cartController.decrease);

// increase cart
router.patch('/user/:userId/:id/increase', cartController.increase);

module.exports = router;
