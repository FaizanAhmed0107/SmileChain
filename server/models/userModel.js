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
    points: {
        type: Number,
        default: 0
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    likedImages: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Image'
    }],
    lastPost: {
        type: Date,
        default: () => {
            const currentDate = new Date();
            currentDate.setFullYear(currentDate.getFullYear() - 5); // Sub 5 years
            return currentDate;
        }
    }
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);