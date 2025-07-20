const mongoose = require('mongoose');

const EchoSchema = new mongoose.Schema({
  contenu: String,
  date: { type: Date, default: Date.now },
  utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'Sinner' },
  offrande: { type: mongoose.Schema.Types.ObjectId, ref: 'Offrande' },
});

module.exports = mongoose.model('Echo', EchoSchema);