import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const isAuthenticated = async (req, res, next) => {
    try {
        console.log("Cookies received:", req.cookies);
        const token = req.cookies.token;

        if (!token) {
            console.log("No token found in cookies");
            return res.status(401).json({ message: "Unauthorized", success: false });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);  // ✅ Using your .env SECRET_KEY
        console.log("Token decoded:", decoded);

        const userExists = await User.findById(decoded.userId);
        if (!userExists) {
            console.log("User not found with ID:", decoded.userId);
            return res.status(401).json({ message: "User no longer exists", success: false });
        }

        req.id = decoded.userId;
        next();
    } catch (error) {
        console.error("Auth error:", error);
        return res.status(401).json({ message: "Invalid Token", success: false });
    }
};

export default isAuthenticated;
