const mongoose = require('mongoose');

const relationSchema = new mongoose.Schema({
  follower: { type: mongoose.Schema.Types.ObjectId, ref: 'Sinner', required: true },
  followed: { type: mongoose.Schema.Types.ObjectId, ref: 'Sinner', required: true },
  createdAt: { type: Date, default: Date.now }
});

relationSchema.index({ follower: 1, followed: 1 }, { unique: true });

module.exports = mongoose.model('Relation', relationSchema);
