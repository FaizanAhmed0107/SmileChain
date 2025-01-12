const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email address already exists.']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    account: {
        type: String,
        required: [true, 'Account is required']
    },
    likedImages: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Image'
    }]
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);