const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    image: {type: String, required: [true, 'Please enter a image']},
    time: {type: String, required: [true, 'Please enter a time']},
    likes: {type: Number, required: [true, 'Please enter number of likes']},
    stars: {type: Number, required: [true, 'Please enter number of star']},
});

module.exports = mongoose.model("Image", imageSchema);