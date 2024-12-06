const Image = require("../models/imageModel"); // Adjust path based on your project structure
const User = require("../models/userModel"); // Adjust path based on your project structure
const jwt = require("jsonwebtoken");

const handleImageLike = async ({imageId, AccessToken}, io, callback) => {
    try {
        const decoded = jwt.verify(AccessToken, process.env.ACCESS_TOKEN_SECRET);
        const userId = decoded.user.id;

        const image = await Image.findById(imageId);
        const user = await User.findById(userId);

        if (!image || !user) {
            return callback({
                success: false,
                message: "Image or user not found!",
            });
        }

        if (user.likedImages.includes(imageId)) {
            // User has already liked the image, remove the like
            user.likedImages = user.likedImages.filter(id => id.toString() !== imageId.toString());
            await user.save();

            image.likes -= 1;
            await image.save();

            io.emit('image-like-changed', {
                imageId: image._id,
                userId,
                likes: image.likes,
                liked: false,
            });

            return callback({
                success: true,
                liked: "disliked",
                likes: image.likes,
            });
        }

        // User has not liked the image, add the like
        user.likedImages.push(imageId);
        await user.save();

        image.likes += 1;
        await image.save();

        io.emit('image-like-changed', {
            imageId: image._id,
            userId,
            likes: image.likes,
            liked: true,
        });

        callback({
            success: true,
            liked: "liked",
            likes: image.likes,
        });
    } catch (error) {
        console.error(error);
        callback({
            success: false,
            message: "Failed to like/dislike the image.",
        });
    }
};

module.exports = handleImageLike;