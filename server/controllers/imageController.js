const asyncHandler = require('express-async-handler');
const Image = require('../models/imageModel');
const User = require('../models/userModel');

const checkImage = asyncHandler(async (req, res) => {
    try {
        console.log("Received Request Body:", req.body);

        const {image, time} = req.body;

        if (!image || !time) {
            res.status(400);
            throw new Error('All fields are required');
        }

        // convert base64 to buffer
        // const base64Data = image.replace(/^data:image\/jpeg;base64,/, "");
        // const imageBuffer = Buffer.from(base64Data, "base64");

        const imgResponse = await Image.create({image, time, likes: 0, stars: 3});

        const io = req.app.get('io');
        io.emit('new-image', imgResponse);

        res.status(201).json({message: "Image processed successfully", data: image.length});
    } catch (error) {
        res.status(500);
        throw new Error('Failed to process the image');
    }
});

const getImages = asyncHandler(async (req, res) => {
    try {
        const images = await Image.find()
            .sort({createdAt: -1}) // Sort by creation date in descending order (latest first)
            .limit(20); // Limit the result to the latest 20 entries

        res.status(200).json(images);
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
});


module.exports = {checkImage, getImages};

