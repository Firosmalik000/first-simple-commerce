const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Invoice = require('./invoiceModel');

const orderSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ['wayting_payment', 'processing', 'in_delivery', 'delivered'],
    },
    delivery_fee: {
      type: Number,
      default: 0,
    },
    adress: {
      name: {
        type: String,
        required: true,
      },
      kelurahan: {
        type: String,
        required: true,
      },
      kecamatan: {
        type: String,
        required: true,
      },
      kota: {
        type: String,
        required: true,
      },
      provinsi: {
        type: String,
        required: true,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      detail: {
        type: String,
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    order_items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
      },
    ],
  },
  { timestamps: true }
);

orderSchema.plugin(AutoIncrement, {
  inc_field: 'order_number',
});
orderSchema.virtual('items_count').get(function () {
  return this.order_items.reduce((total, item) => total + parseInt(item.qty), 0);
});
orderSchema.post('save', async function () {
  let sub_total = this.order_items.reduce((total, item) => (total += item.price * item.qty), 0);
  let newInvoice = new Invoice({
    user: this.user,
    order: this._id,
    sub_total: sub_total,
    delivery_fee: parseInt(this.delivery_fee),
    total: parseInt(sub_total + this.delivery_fee),
    adress: this.adress,
  });
  await newInvoice.save();
});
const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
