const mongoose = require('mongoose');

const OfferingSchema = new mongoose.Schema({
  sinner: { type: mongoose.Schema.Types.ObjectId, ref: 'Sinner', required: true },
  text: { type: String },
  image: { type: String },
  video: { type: String },
  createdAt: { type: Date, default: Date.now },
  reactions: [{
    type: { type: String, enum: ['amen', 'flamme', 'sang'] },
    sinner: { type: mongoose.Schema.Types.ObjectId, ref: 'Sinner' }
  }],
  comments: [{
    sinner: { type: mongoose.Schema.Types.ObjectId, ref: 'Sinner' },
    text: String,
    createdAt: { type: Date, default: Date.now }
  }]
});

module.exports = mongoose.model('Offering', OfferingSchema);
