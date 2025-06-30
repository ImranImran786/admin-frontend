import { io } from "socket.io-client";

const socket = io("ws:http://localhost:5005/", { reconnection: true });

socket.on("connect", () => {
    console.log("Admin Connected to WebSocket Server");
    socket.emit("registerAdmin", "admin-123");
});

socket.on("disconnect", () => {
    console.log("Admin Disconnected from WebSocket Server");
});

export default socket;
