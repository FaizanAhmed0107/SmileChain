const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    image: {
        type: String,
        required: [true, 'Please enter a image']
    },
    time: {
        type: Date,
        required: [true, 'Please enter a time']
    },
    likes: {
        type: Number,
        default: 0
    },
    stars: {
        type: Number,
        required: [true, 'Please enter number of star']
    },
    points: {
        type: Number,
        required: [true, 'Points is required']
    }
});

module.exports = mongoose.model("Image", imageSchema);