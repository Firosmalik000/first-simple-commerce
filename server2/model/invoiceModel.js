const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema(
  {
    sub_total: {
      type: Number,
      required: [true, 'sub total harus diisi'],
    },
    delivery_fee: {
      type: Number,
      required: [true, 'delivery fee harus diisi'],
    },
    adress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Adress', 
    },
    total: {
      type: Number,
      required: [true, 'total harus diisi'],
    },
    payment_status: {
      type: String,
      enum: ['waiting_payment', 'paid'],
      default: 'waiting_payment',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    order: {
      type: mongoose.Schema.ObjectId,
      ref: 'Order',
    },
  },
  { timestamps: true }
);

const Invoice = mongoose.model('Invoice', invoiceSchema);
module.exports = Invoice;
