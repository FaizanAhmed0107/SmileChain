const express = require('express');
const validateToken = require('../middleware/validateTokenHandler');
const router = express.Router();

const {
    checkImage,
    getImages,
    likeImage
} = require('../controllers/imageController');
const {currentUser} = require("../controllers/userController");

router.route('/').post(checkImage).get(getImages);

module.exports = router;