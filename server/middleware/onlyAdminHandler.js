const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const onlyAdmin = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    if (user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin.');
    }
});

module.exports = onlyAdmin;