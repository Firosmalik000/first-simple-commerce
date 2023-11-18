const express = require('express');
const router = express.Router();
const Invoice = require('../models/invoice'); 
const Order = require('../models/order'); 

// Endpoint untuk membuat invoice
router.post('/create-invoice', async (req, res) => {
  try {
    // Ambil data dari request body atau sesuaikan dengan kebutuhan Anda
    const { sub_total, delivery_fee, address, total, user, order } = req.body;

    // Pastikan order dengan ID yang diberikan ada dalam database
    const existingOrder = await Order.findById(order);
    if (!existingOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Buat objek Invoice
    const newInvoice = new Invoice({
      sub_total,
      delivery_fee,
      address,
      total,
      user,
      order,
    });

    // Simpan invoice ke database
    await newInvoice.save();

    res.status(201).json(newInvoice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Endpoint untuk mendapatkan semua invoice
router.get('/invoices', async (req, res) => {
  try {
    const invoices = await Invoice.find().populate('order');
    res.status(200).json(invoices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Endpoint untuk mendapatkan invoice berdasarkan ID
router.get('/invoices/:id', async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate('order');
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    res.status(200).json(invoice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Tambahkan endpoint-endpoint lain sesuai kebutuhan

module.exports = router;