// models/TipJar.js
const mongoose = require('mongoose');

const tipSchema = new mongoose.Schema({
  amount: Number,
  fromWallet: String,
  date: { type: Date, default: Date.now },
});

const tipJarSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  goalAmount: { type: Number, required: true },
  walletAddress: { type: String, required: true },
  tips: [tipSchema],
}, { timestamps: true });

module.exports = mongoose.model('TipJar', tipJarSchema);
