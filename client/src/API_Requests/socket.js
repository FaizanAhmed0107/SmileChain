// socket.js
import io from "socket.io-client";
import serverAddress from "./serverAddress.js";

const socket = io(serverAddress, {
    transports: ["websocket", "polling"], // Ensure compatibility with various environments
});

export default socket;
