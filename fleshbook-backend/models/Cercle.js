const mongoose = require('mongoose');

const CercleSchema = new mongoose.Schema({
  nom: String,
  actif: Boolean,
  utilisateurs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sinner' }],
});

module.exports = mongoose.model('Cercle', CercleSchema);