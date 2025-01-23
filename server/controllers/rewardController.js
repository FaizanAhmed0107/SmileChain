const asyncHandler = require('express-async-handler');
const Reward = require("../models/rewardModel");
const User = require("../models/userModel");
const truffle_connect = require('../truffle/Contract');

// @desc Add/Modify a Reward
// @route POST /api/rewards/add
// @access private
const addReward = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }
        const {points, type, value} = req.body;
        if (!points || !type || !value) {
            console.log(points, type, value);
            res.status(400);
            throw new Error('All fields are required');
        }

        let rewardResponse;
        const reward = await Reward.findOne({points});
        if (!reward) {
            // Create a new reward if not found
            rewardResponse = await Reward.create({points, type, value});
        } else {
            // Update existing reward if found
            rewardResponse = await Reward.findOneAndUpdate(
                {points},  // Find reward by points
                {type, value},  // Update fields
                {new: true}  // Return the updated document
            );
        }

        truffle_connect.getOwner((accounts) => {
            let ethers = "0", details = "";
            if (type === 'Ether') {
                ethers = value;
            } else {
                details = value;
            }
            truffle_connect.addReward(accounts[0], parseInt(points), ethers, details);
        })

        res.status(201).json({message: "Reward added", data: rewardResponse});
    } catch (error) {
        console.log(error);
        res.status(500);
        throw new Error('Failed to Add Reward.');
    }
});

module.exports = {addReward}