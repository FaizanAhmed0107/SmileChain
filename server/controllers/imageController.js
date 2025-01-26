const asyncHandler = require('express-async-handler');
const Image = require('../models/imageModel');
const User = require('../models/userModel');
const Admin = require('../models/AdminModel')
const truffle_connect = require("../truffle/Contract");

const checkImage = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }

        const {image, time, stars} = req.body;
        if (!image || !time) {
            console.log(image, time, stars);
            res.status(400);
            throw new Error("All fields are required");
        }
        const adminValue = await Admin.findOne({anchor: "anchor"});
        if (!adminValue || !adminValue.pointsToAdd) {
            throw new Error("Admin configuration missing or incomplete");
        }

        if (Date.now() - new Date(user.lastPost).getTime() < adminValue.postDelay * 60 * 60 * 1000) {
            res.status(403).json({
                title: "Forbidden",
                message: `Cant post now wait for ${adminValue.postDelay} hours since last Post.`
            });
            return;
        }

        const imgResponse = await Image.create({
            owner: req.user.id, image, time, stars, points: adminValue.pointsToAdd
        });
        User.findByIdAndUpdate(req.user.id, {lastPost: Date.now()})
            .then(() => console.log("User points updated successfully"))
            .catch((err) => console.error("Error updating points:", err));


        await truffle_connect.getOwner((accounts) => {
            truffle_connect.addUserPoints(accounts[0], user.account, adminValue.pointsToAdd);
        });

        setTimeout(async () => {
            await truffle_connect.getBalancePoints(user.account, (ans) => {
                User.findByIdAndUpdate(req.user.id, {points: parseInt(ans)})
                    .then(() => console.log("User points updated successfully"))
                    .catch((err) => console.error("Error updating points:", err));
            });
        }, 5000);

        const io = req.app.get("io");
        io.emit("new-image", imgResponse);

        res.status(201).json({message: "Image processed successfully", data: image.length});
    } catch (error) {
        console.error(error);
        res.status(500);
        throw new Error("Failed to process the image");
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

