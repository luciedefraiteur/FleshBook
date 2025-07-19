const mongoose = require('mongoose');

const SinnerSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  avatar: { type: String },
  confession: { type: String }, // Biographie
  favoriteVice: { type: String },
  firstBlasphemy: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Sinner', SinnerSchema);
