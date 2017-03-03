'use strict';

const mongoose = require('mongoose');

const bottleSchema = new mongoose.Schema({
  body: { type: String, required: true },
  createDate: { type: Date, default: Date.now },
  email: String,
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 }
});

module.exports = mongoose.model('Bottle', bottleSchema);
