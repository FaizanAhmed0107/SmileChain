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

const likeImage = asyncHandler(async (req, res) => {
    try {
        const userId = req.user.id;
        const imageId = req.params.id;
        const image = await Image.findById(imageId);
        if (!image) {
            res.status(404);
            throw new Error("Image not found!");
        }
        const user = await User.findById(userId);
        if (!user) {
            res.status(404);
            throw new Error("User not found!");
        }

        const io = req.app.get('io');

        if (user.likedImages.includes(imageId)) {
            // User already liked the image, so remove the like
            user.likedImages = user.likedImages.filter(id => id.toString() !== imageId.toString());
            await user.save();

            image.likes -= 1;
            await image.save();

            // Emit the "image-like-changed" event
            io.emit('image-like-changed', {
                imageId: image._id,
                userId: userId,
                likes: image.likes,
                liked: false
            });

            return res.status(200).json({
                liked: "disliked",
                message: "Image disliked successfully!",
                image,
                user
            });
        }

        // User hasn't liked the image yet, so add the like
        user.likedImages.push(imageId);
        await user.save();

        image.likes += 1;
        await image.save();

        // Emit the "image-like-changed" event
        io.emit('image-like-changed', {
            imageId: image._id,
            userId: userId,
            likes: image.likes,
            liked: true
        });

        res.status(200).json({
            liked: "liked",
            message: "Image liked successfully!",
            image,
            user
        });
    } catch (error) {
        res.status(500);
        throw new Error(error.message || "Failed to like or dislike the image.");
    }
});


module.exports = {checkImage, getImages, likeImage};

