const asyncHandler = require('express-async-handler');
const History = require("../models/historyModel");
const Reward = require("../models/rewardModel");

// @desc get all history related to user
// @route GET /api/history
// @access private
const getHistory = asyncHandler(async (req, res) => {
    try {
        const hist = await History.find({owner: req.user.id})
            .sort({createdAt: -1}) // Sort by creation date in descending order (latest first)
            .limit(30); // Limit the result to the latest 30 entries
        res.status(200).json({message: "History Fetched", data: hist});
    } catch (error) {
        console.log(error);
        res.status(500);
        throw new Error('Failed to Fetch History.');

    }
})

module.exports = {getHistory}