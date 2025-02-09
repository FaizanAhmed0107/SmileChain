const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// @desc Register a user
// @route POST /api/users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password, account} = req.body;
    if (!username || !email || !password || !account) {
        console.log(username, email, password, account)
        res.status(400);
        throw new Error('All fields are required');
    }
    const userAvailable = await User.findOne({email});
    if (userAvailable) {
        res.status(400);
        throw new Error('User Already Registered');
    }
    //Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({username, email, password: hashedPassword, account});
    console.log('User Created');
    if (user) {
        res.status(201).json({_id: user.id, email: user.email});
    } else {
        res.status(400);
        throw new Error('User data is not Valid');
    }
});

// @desc Login a user
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error('All fields are required');
    }
    const user = await User.findOne({email});
    //Compare Password with HashedPassword
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "240m"});
        res.status(200).json({accessToken});
    } else {
        res.status(401);
        throw new Error('Email or Password is not Valid');
    }
});

// @desc Current user info
// @route GET /api/users/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
    try {
        // Populate the likedImages field to fetch details of liked images
        const user = await User.findById(req.user.id);

        if (!user) {
            res.status(404);
            throw new Error("User not found");
        }

        res.json({
            id: req.user.id,
            username: req.user.username,
            email: req.user.email,
            likedImages: user.likedImages,
            isAdmin: user.isAdmin,
            highestPoint: user.highestPoint
        });
    } catch (error) {
        res.status(500);
        throw new Error(error.message || "Failed to fetch user data");
    }
});


module.exports = {registerUser, loginUser, currentUser};