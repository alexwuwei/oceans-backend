'use strict';

const mongoose = require('mongoose');

const bottleSchema = new mongoose.Schema({
  body: { type: String, required: true },
  createDate: { type: Date, default: Date.now },
  location: String,
  email: String,
});

module.exports = mongoose.model('Bottle', bottleSchema);
