const mongoose = require('mongoose');

const EntrySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    entry: {
        type: String,
        required: true
    },
    sentiment: {
        score: Number,
        comparative: Number,
        positive: [String],
        negative: [String]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Entry', EntrySchema);