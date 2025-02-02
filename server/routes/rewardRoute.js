const express = require('express');
const validateToken = require('../middleware/validateTokenHandler');
const onlyAdmin = require('../middleware/onlyAdminHandler');
const router = express.Router();

const {
    addReward,
    deleteReward,
    getPoints,
    redeemPoint,
    setDelay,
    setPoint,
    getRewards
} = require("../controllers/rewardController");

router.post('/add', validateToken, onlyAdmin, addReward);
router.post('/del', validateToken, onlyAdmin, deleteReward);
router.post('/admin/delay', validateToken, onlyAdmin, setDelay);
router.post('/admin/points', validateToken, onlyAdmin, setPoint);
router.get("/", validateToken, getPoints);
router.post("/redeem", validateToken, redeemPoint);
router.get("/all", getRewards);

module.exports = router;