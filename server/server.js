const express = require('express');
const http = require('http'); // Import HTTP module
const {Server} = require('socket.io'); // Import Socket.IO
const connectDB = require('./config/dbConnection');
const errorHandler = require("./middleware/errorHandler");
const cors = require('cors');
const dotenv = require('dotenv').config();

connectDB();
const app = express();
const server = http.createServer(app);

// CORS configuration
const corsOptions = {
    origin: ["https://smile-chain.vercel.app", "http://localhost:5173"],
    methods: ['GET', 'POST']
};

// Apply CORS middleware
app.use(cors(corsOptions));
app.use(express.json());

// Import and use routes
app.use('/api/image', require('./routes/imageRoute'));
app.use('/api/users', require('./routes/userRoutes'));

// Custom error handler middleware
app.use(errorHandler);

// Socket.IO setup with CORS configuration
const io = new Server(server, {
    cors: {
        origin: ["https://smile-chain.vercel.app", "http://localhost:5173"],
        methods: ["GET", "POST"],
    },
});

// Handle Socket.IO connections
io.on('connection', (socket) => {
    console.log('A client connected:', socket.id);

    // Handle client disconnection
    socket.on('disconnect', () => {
        console.log('A client disconnected:', socket.id);
    });
});

// Attach io instance to the app
app.set('io', io);

// Define the port
const PORT = process.env.PORT || 5000;

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
