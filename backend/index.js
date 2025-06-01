import dotenv from "dotenv";
dotenv.config();

import { server, app } from "./socket/socket.js";
import connectDB from "./utils/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import messageRoute from "./routes/message.route.js";

const PORT = process.env.PORT || 8000;

// CORS options
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
};

// Apply CORS and cookie parser
app.use(cors(corsOptions));
app.use(cookieParser());

// Mount your routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/message", messageRoute);

// Test route
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "I am coming from Backend Love",
    success: true,
  });
});

// Start the server
server.listen(PORT, async () => {
  await connectDB();
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
