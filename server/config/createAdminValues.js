const Admin = require("../models/AdminModel")

const createAdminValues = async () => {
    const valueExists = await Admin.findOne({anchor: "anchor"});
    if (!valueExists) {
        await Admin.create({
            anchor: "anchor",
        });
        console.log("Admin data created");
    }
};

module.exports = createAdminValues;