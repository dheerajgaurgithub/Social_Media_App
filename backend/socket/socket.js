import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const server = http.createServer(app);

// Add middlewares here:
app.use(express.json());  // ✅ JSON parser
app.use(express.urlencoded({ extended: true }));

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || "http://localhost:5173",  // Allow frontend URL
        credentials: true,
        methods: ["GET", "POST"],
    },
});

const userSocketMap = {};

// Get socket id of a specific receiver
export const getReceiverSocketId = (receiverId) => userSocketMap[receiverId];

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    console.log(`⚡ New client connected: ${socket.id} with userId: ${userId}`);

    if (userId) {
        userSocketMap[userId] = socket.id;
    }

    // Broadcast online users to all clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log(`🚫 Client disconnected: ${socket.id} with userId: ${userId}`);

        if (userId) {
            delete userSocketMap[userId];
        }

        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { app, server, io };
