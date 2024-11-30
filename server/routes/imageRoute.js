const express = require('express');
const router = express.Router();
const {
    checkImage,
    getImages
} = require('../controllers/imageController');

router.route('/').post(checkImage).get(getImages);

module.exports = router;