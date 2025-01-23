const express = require('express');
const validateToken = require('../middleware/validateTokenHandler');
const router = express.Router();

const {checkImage, getImages} = require('../controllers/imageController');

router.get('/', getImages);
router.post('/', validateToken, checkImage);

module.exports = router;