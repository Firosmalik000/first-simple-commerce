// const Cart = require('../model/cartModel');
// const Order = require('../model/orderModel');
// const Adress = require('../model/adressModel');
// const OrderItem = require('../model/orderItemModel');
// const { Types } = require('mongoose');

// const router = require('express').Router();

// router.post('/', async (req, res) => {
//   try {
//     const { address, delivery_fee } = req.body;
//     const items = await Cart.find({ user: req.user._id }).populate('product');
//     if (!items) {
//       return res.status(400).json({ message: 'Cart not found' });
//     }
//     let adress = await Adress.findById(address);
//     let order = new Order({
//       _id: Types.ObjectId(),
//       status: 'waiting_payment',
//       delivery_fee: delivery_fee,
//       address: {
//         provinsi: adress.provinsi,
//         kota: adress.kota,
//         kecamatan: adress.kecamatan,
//         kelurahan: adress.kelurahan,
//         detail: adress.detail,
//       },
//       user: req.user._id,
//     });
//     let orderItems = await OrderItem.insertMany(
//       items.map((item) => ({
//         ...item,
//         name: item.product.name,
//         qty: parseInt(item.qty),
//         price: parseInt(item.product.price),
//         order: order._id,
//         product: item.product._id,
//       }))
//     );
//     orderItems.forEach((item) => order.order_items.push(item));
//     order.save();
//     await Cart.deleteMany({ user: req.user._id });
//     return res.status(201).json({ message: 'Order created successfully', data: order });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// router.get('/', async (req, res) => {
//   try {
//     let count = await Order.find({ user: req.user._id }).countDocuments();
//     let orders = await Order.find({ user: req.user._id }).populate('order_items').sort({ createdAt: -1 });
//     return res.status(200).json({
//       data: orders.map((order) => order.toJSON({ virtuals: true })),
//       count,
//     });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const Order = require('../model/orderModel'); // Pastikan path ke model Order sudah sesuai
const OrderItem = require('../model/orderItemModel'); // Pastikan path ke model OrderItem sudah sesuai

// Endpoint untuk membuat order
router.post('/create-order', async (req, res) => {
  try {
    // Ambil data dari request body atau sesuaikan dengan kebutuhan Anda
    const { status, delivery_fee, address, user, order_items } = req.body;

    // Pastikan order_items adalah array yang valid dari OrderItem IDs
    const validOrderItemIDs = await OrderItem.find({ _id: { $in: order_items } }, '_id');
    const invalidOrderItemIDs = order_items.filter((item) => !validOrderItemIDs.map(String).includes(item));

    if (invalidOrderItemIDs.length > 0) {
      return res.status(400).json({ message: 'Invalid OrderItem IDs in order_items array' });
    }

    // Buat objek Order
    const newOrder = new Order({
      status,
      delivery_fee,
      address,
      user,
      order_items,
    });

    // Simpan order ke database
    await newOrder.save();

    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Endpoint untuk mendapatkan semua orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().populate('order_items');
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Endpoint untuk mendapatkan order berdasarkan ID
router.get('/orders/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('order_items');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
