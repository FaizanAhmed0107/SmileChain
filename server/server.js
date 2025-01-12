const express = require('express');
const http = require('http'); // Import HTTP module
const {Server} = require('socket.io'); // Import Socket.IO
const connectDB = require('./config/dbConnection');
const errorHandler = require("./middleware/errorHandler");
const cors = require('cors');
const compression = require('compression');
const handleImageLike = require("./sockets/HandleLikes");
const dotenv = require('dotenv').config();
const Web3 = require('web3');
const truffle_connect = require('./truffle/Contract.js');

connectDB();
const app = express();
const server = http.createServer(app);

const allowedOrigins = [
    "http://localhost:5173",
    "https://smile-chain.vercel.app", // Add your production frontend URL
];

const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        methods: ["GET", "POST"],
        credentials: true, // Enable credentials if needed
    },
});

const PORT = process.env.PORT || 5000;

app.use(compression());
app.use(cors({
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
}));
app.use(express.json());
app.use('/api/image', require('./routes/imageRoute'));
app.use('/api/users', require('./routes/userRoutes'));
// app.use('/api/web3', require('./routes/etherRoutes'));
app.get('/getBalance', (req, res) => {
    truffle_connect.getOwner(function (accounts) {
        res.send(accounts);

        console.log("**** GET /getBalance ****");

        truffle_connect.sendEther(accounts[0], accounts[1], (answer) => {
            console.log(answer);
        })
        // truffle_connect.getBalance(accounts[0], (balance) => {
        //     console.log("Balance:", balance);
        // })
    })
});
app.use(errorHandler);

io.on('connection', (socket) => {
    console.log('A client connected:', socket.id);

    socket.on('likeImage', async (data, callback) => {
        try {
            await handleImageLike(data, io, callback);
        } catch (error) {
            console.error(`Error in likeImage event: ${error.message}`);
            if (callback) callback({success: false, message: "Internal Server Error"});
        }
    });

    socket.on('disconnect', () => {
        console.log('A client disconnected:', socket.id);
    });

    socket.on('error', (err) => {
        console.error(`Socket error: ${err}`);
    });

    socket.on('ping', () => socket.emit('pong'));
});

app.set('io', io);

server.listen(PORT, () => {
    truffle_connect.web3 = new Web3("http://127.0.0.1:7545");
    console.log(`Server is running on port ${PORT}`);
});