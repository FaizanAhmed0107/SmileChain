const mongoose = require('mongoose')
const createAdminUser = require("./createAdmin")
const createAdminValue = require("./createAdminValues")

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_CONNECTION);
        console.log('DataBase Connected: ', connect.connection.host, connect.connection.name);
        await createAdminUser();
        await createAdminValue();
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;