const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    anchor: {
        type: String,
        required: [true, 'Please enter anchor.']
    },
    pointsToAdd: {
        type: Number,
        default: 1
    },
    postDelay: {
        type: Number,
        default: 24
    }
});

module.exports = mongoose.model('Admin', adminSchema);