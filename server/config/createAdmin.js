const bcrypt = require("bcryptjs");
const User = require("../models/userModel");


const createAdminUser = async () => {
    const adminExists = await User.findOne({email: "admin@smilechain.com"});
    if (!adminExists) {
        const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
        await User.create({
            username: "admin", email: "admin@smilechain.com", password: hashedPassword, account: "admin", isAdmin: true,
        });
        console.log("Admin user created");
    }
};

module.exports = createAdminUser;