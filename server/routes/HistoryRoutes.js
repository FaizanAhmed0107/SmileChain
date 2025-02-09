const express = require('express');
const validateToken = require('../middleware/validateTokenHandler');
const router = express.Router();

const {getHistory} = require('../controllers/historyController')

router.get('/', validateToken, getHistory);

module.exports = router;