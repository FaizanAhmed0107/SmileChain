const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
    points: {
        type: Number,
        required: [true, 'Points is required.'],
        unique: [true, 'Point already exists in reward.']
    },
    type: {
        type: String,
        required: [true, 'Type is required.']
    },
    value: {
        type: String,
        required: [true, "Value is Required."]
    }
});

module.exports = mongoose.model('Reward', rewardSchema);