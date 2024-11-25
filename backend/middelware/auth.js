const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();  // Load environment variables from .env

const isLoggedIn = (req, res, next) => {
    // Extract the token from the Authorization header, expecting the format "Bearer <token>"
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (token) {
        // Verify the token
        console.log("Authorization header:", req.headers.authorization);
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ message: "Token has expired" });
                }
                return res.status(401).json({ message: "Invalid token", error: err.message });
            }
            
            // Store the decoded user data in req.user
            req.user = decoded;
            console.log("Decoded user:", decoded);  // Optional: Remove for production

            next();  // Proceed to the next middleware or route handler
        });
    } else {
        return res.status(401).json({ message: "No token provided" });
    }
};

module.exports = { isLoggedIn };
