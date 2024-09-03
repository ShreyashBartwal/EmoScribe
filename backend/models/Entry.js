const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  entry: { type: String, required: true },
  sentiment: { type: Object, required: true },
  date: { type: Date, default: Date.now },
});

const Entry = mongoose.model('Entry', entrySchema, 'entries'); // 'entries' is the collection name

module.exports = Entry;
