const Cart = require('../model/cartModel');
const Order = require('../model/orderModel');
const Adress = require('../model/adressModel');
const OrderItem = require('../model/orderItemModel');
const { Types } = require('mongoose');

const router = require('express').Router();

router.post('/', async (req, res) => {
  try {
    const { address, delivery_fee } = req.body;
    const items = await Cart.find({ user: req.user._id }).populate('product');
    if (!items) {
      return res.status(400).json({ message: 'Cart not found' });
    }
    let adress = await Adress.findById(address);
    let order = new Order({
      _id: Types.ObjectId(),
      status: 'waiting_payment',
      delivery_fee: delivery_fee,
      address: {
        provinsi: adress.provinsi,
        kota: adress.kota,
        kecamatan: adress.kecamatan,
        kelurahan: adress.kelurahan,
        detail: adress.detail,
      },
      user: req.user._id,
    });
    let orderItems = await OrderItem.insertMany(
      items.map((item) => ({
        ...item,
        name: item.product.name,
        qty: parseInt(item.qty),
        price: parseInt(item.product.price),
        order: order._id,
        product: item.product._id,
      }))
    );
    orderItems.forEach((item) => order.order_items.push(item));
    order.save();
    await Cart.deleteMany({ user: req.user._id });
    return res.status(201).json({ message: 'Order Berhasil', data: order });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    let count = await Order.find({ user: req.user._id }).countDocuments();
    let orders = await Order.find({ user: req.user._id }).populate('order_items').sort({ createdAt: -1 });
    return res.status(200).json({
      data: orders.map((order) => order.toJSON({ virtuals: true })),
      count,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
