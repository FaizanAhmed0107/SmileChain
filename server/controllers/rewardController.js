const asyncHandler = require('express-async-handler');
const Reward = require("../models/rewardModel");
const User = require("../models/userModel");
const Admin = require("../models/AdminModel");
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

// @desc Delete a Reward
// @route POST /api/rewards/del
// @access private
const deleteReward = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }
        const {points} = req.body;
        if (!points) {
            console.log(points);
            res.status(400);
            throw new Error('All fields are required');
        }

        truffle_connect.getOwner((accounts) => {
            truffle_connect.delReward(accounts[0], parseInt(points));
        });

        const reward = await Reward.findOne({points});
        if (!reward) {
            console.log("No such Reward", {points});
            res.status(404);
            throw new Error('Reward not found.');
        }
        const rewardResponse = await Reward.findOneAndDelete({points});
        res.status(201).json({message: "Reward Deleted", data: rewardResponse});
    } catch (error) {
        console.log(error);
        res.status(500);
        throw new Error('Failed to Delete Reward.');
    }
});

// @desc get Points of a User
// @route GET /api/rewards/
// @access private
const getPoints = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }
        res.status(201).json({message: "Point Found", points: user.points});
    } catch (error) {
        console.log(error);
        res.status(500);
        throw new Error('Failed to Delete Reward.');
    }
});

// @desc redeem Points by a User
// @route POST /api/rewards/redeem
// @access private
const redeemPoint = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }
        const {points} = req.body;
        if (!points) {
            console.log(points);
            res.status(400);
            throw new Error('All fields are required');
        }
        if (user.points < points) {
            truffle_connect.getBalancePoints(user.account, (ans) => {
                User.findByIdAndUpdate(req.user.id, {points: parseInt(ans)})
                    .then(() => console.log("User points updated successfully"))
                    .catch((err) => console.error("Error updating points:", err));
            });
            return res.status(403).json({success: false, message: "Not Enough Points", points: user.points});
        }
        const reward = await Reward.findOne({points});
        if (!reward) {
            return res.status(404).json({success: false, message: "No Such Reward"});
        }

        if (reward.type === 'Ether') {
            truffle_connect.getOwner((accounts) => {
                truffle_connect.topUpEther(accounts[0], reward.value);
            });
        } else {
            //TODO
        }

        await truffle_connect.redeemPoints(user.account, points);
        truffle_connect.getBalancePoints(user.account, (ans) => {
            User.findByIdAndUpdate(req.user.id, {points: parseInt(ans)})
                .then(() => console.log("User points updated successfully"))
                .catch((err) => console.error("Error updating points:", err));
        });

        return res.status(201).json({success: true, message: "Redeemed Successfully", points});

    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, message: "Failed to Redeem Reward."});
    }
});

// @desc get all admin values
// @route GET /api/rewards/admin/
// @access private
const getValues = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }
        const admin = await Admin.findOne({anchor: "anchor"});
        res.status(200).json({message: "Value Modified", data: admin});
    } catch (error) {
        console.log(error);
        res.status(500);
        throw new Error('Failed to Modify Value.');
    }
});

// @desc Modify delay between Pics
// @route POST /api/rewards/admin/delay
// @access private
const setDelay = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }
        const {postDelay} = req.body;
        if (!postDelay) {
            console.log(postDelay);
            res.status(400);
            throw new Error('All fields are required');
        }
        const admin = await Admin.findOneAndUpdate(
            {anchor: "anchor"},
            {$set: {postDelay}},
            {new: true} // return updated document
        );
        res.status(200).json({message: "Value Modified", data: admin});
    } catch (error) {
        console.log(error);
        res.status(500);
        throw new Error('Failed to Modify Value.');
    }
});

// @desc Modify Points to add per Pic
// @route POST /api/rewards/admin/points
// @access private
const setPoint = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }
        const {pointsToAdd} = req.body;
        if (!pointsToAdd) {
            console.log(pointsToAdd);
            res.status(400);
            throw new Error('All fields are required');
        }
        const admin = await Admin.findOneAndUpdate(
            {anchor: "anchor"},
            {$set: {pointsToAdd}},
            {new: true} // return updated document
        );
        res.status(200).json({message: "Value Modified", data: admin});
    } catch (error) {
        console.log(error);
        res.status(500);
        throw new Error('Failed to Modify Value.');
    }
});


// @desc get all rewards
// @route GET /api/rewards/all
// @access public
const getRewards = asyncHandler(async (req, res) => {
    try {
        const rewards = await Reward.find().select("points type value");
        res.status(200).json({message: "Rewards Fetched", data: rewards});
    } catch (error) {
        console.log(error);
        res.status(500);
        throw new Error('Failed to Fetch Rewards.');
    }
});


module.exports = {addReward, deleteReward, getPoints, redeemPoint, getValues, setDelay, setPoint, getRewards}