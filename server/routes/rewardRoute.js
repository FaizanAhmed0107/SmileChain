const express = require('express');
const validateToken = require('../middleware/validateTokenHandler');
const onlyAdmin = require('../middleware/onlyAdminHandler');
const router = express.Router();

const {addReward} = require("../controllers/rewardController");
const truffle_connect = require("../truffle/Contract");

router.post('/add', validateToken, onlyAdmin, addReward);

module.exports = router;