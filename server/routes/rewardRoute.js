const express = require('express');
const validateToken = require('../middleware/validateTokenHandler');
const onlyAdmin = require('../middleware/onlyAdminHandler');
const router = express.Router();

const {
    addReward,
    deleteReward,
    addPoint
} = require("../controllers/rewardController");
const truffle_connect = require("../truffle/Contract");

// router.get("/", validateToken, getPoints);
router.post('/add', validateToken, onlyAdmin, addReward);
router.post('/del', validateToken, onlyAdmin, deleteReward);
router.post("/addPoint", validateToken, addPoint);


// router.get("/", async (req, res) => {
//     truffle_connect.getOwner((accounts) => {
//         truffle_connect.getOneReward(accounts[0], 500, (ans) => {
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