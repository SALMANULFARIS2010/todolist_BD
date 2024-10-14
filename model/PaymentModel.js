// const mongoose = require('mongoose');

// const PaymentSchema = new mongoose.Schema({
//   payment_id: {
//     type: String,
//     required: true
//   },
//   order_id: {
//     type: String,
//     required: true
//   },
//   amount: {
//     type: Number,
//     required: true
//   },
//   currency: {
//     type: String,
//     required: true
//   },
//   plan_description: {
//     type: String,
//     required: true
//   },
//   payment_status: {
//     type: String,
//     required: true,
//     default: 'Pending'
//   },
//   payment_date: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model('Payment', PaymentSchema);





// models/Payment.js


const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  subscription_id: { type: String, required: true },
  plan_id: { type: String, required: true },
  amount: { type: Number, required: true }, // Ensure this is a number
  currency: { type: String, required: true },
  plan_description: { type: String, required: true },
  payment_status: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Payment', PaymentSchema);
