const express = require('express');
const validateToken = require('../middleware/validateTokenHandler');
const onlyAdmin = require('../middleware/onlyAdminHandler');
const router = express.Router();

const {
    addReward,
    deleteReward,
    getPoints,
    redeemPoint
} = require("../controllers/rewardController");

router.post('/add', validateToken, onlyAdmin, addReward);
router.post('/del', validateToken, onlyAdmin, deleteReward);
router.get("/", validateToken, getPoints);
router.post("/redeem", validateToken, redeemPoint);

// const truffle_connect = require("../truffle/Contract");
// router.get("/test2", async (req, res) => {
//     truffle_connect.getOwner((bool, accounts) => {
//         truffle_connect.getOneReward(accounts[0], 20, (ans) => {
//             res.send(ans);
//         });
//     });
// })
// router.get("/test", async (req, res) => {
//     truffle_connect.getOwner((accounts) => {
//         truffle_connect.getRewardKeys(accounts[0], (ans) => {
//             res.send(ans);
//         });
//     });
// });

module.exports = router;