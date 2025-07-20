const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const SinnerSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cercles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cercle' }],
  offrandes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Offrande' }],
  echos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Echo' }],
});

// Crypter le mot de passe avant de sauvegarder
SinnerSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Méthode pour comparer les mots de passe
SinnerSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Sinner', SinnerSchema);