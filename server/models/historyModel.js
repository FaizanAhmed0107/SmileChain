const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    points: {
        type: Number,
        required: [true, 'Points is required.']
    },
    type: {
        type: String,
        required: [true, 'Type is required.']
    },
    value: {
        type: String,
        required: [true, 'Details is required.']
    }
}, {timestamps: true});

module.exports = mongoose.model('History', historySchema);