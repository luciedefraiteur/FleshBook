const mongoose = require('mongoose');

const OffrandeSchema = new mongoose.Schema({
  contenu: String,
  date: { type: Date, default: Date.now },
  utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'Sinner' },
  cercle: { type: mongoose.Schema.Types.ObjectId, ref: 'Cercle' },
  type: { type: String, enum: ['offrande', 'rituel', 'confession', 'appel'], default: 'offrande' },
});

module.exports = mongoose.model('Offrande', OffrandeSchema);