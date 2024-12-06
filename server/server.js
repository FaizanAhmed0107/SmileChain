const express = require('express');
const http = require('http'); // Import HTTP module
const {Server} = require('socket.io'); // Import Socket.IO
const connectDB = require('./config/dbConnection');
const errorHandler = require("./middleware/errorHandler");
const cors = require('cors');
const compression = require('compression');
const dotenv = require('dotenv').config();

connectDB();
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Allow requests from any origin;
        methods: ["GET", "POST"],
    },
});

const PORT = process.env.PORT || 5000;

app.use(compression());
app.use(cors());
app.use(express.json());
app.use('/api/image', require('./routes/imageRoute'));
app.use('/api/users', require('./routes/userRoutes'));
app.use(errorHandler);

io.on('connection', (socket) => {
    console.log('A client connected:', socket.id);

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
    console.log(`Server is running on port ${PORT}`);
})