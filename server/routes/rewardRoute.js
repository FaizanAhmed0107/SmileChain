const express = require('express');
const validateToken = require('../middleware/validateTokenHandler');
const onlyAdmin = require('../middleware/onlyAdminHandler');
const router = express.Router();

const {
    addReward,
    deleteReward,
    getPoints,
    redeemPoint,
    getRewards
} = require("../controllers/rewardController");
const truffle_connect = require("../truffle/Contract");
const User = require("../models/userModel");

router.post('/add', validateToken, onlyAdmin, addReward);
router.post('/del', validateToken, onlyAdmin, deleteReward);
router.get("/", validateToken, getPoints);
router.post("/redeem", validateToken, redeemPoint);
router.get("/all", getRewards);

router.get("/test", async (req, res) => {
    truffle_connect.getOwner((accounts) => {
        truffle_connect.getBalancePoints(accounts[1], (ans) => {
            res.send(ans);
        });
    });
});

module.exports = router;