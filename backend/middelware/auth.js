const jwt = require("jsonwebtoken");
const env = require("dotenv");
env.config();  

const isLoggedIn = (req, res, next) => {
    
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (token) {
     
        
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ message: "Token has expired" });
                }
                return res.status(401).json({ message: "Invalid token", error: err.message });
            }
            
            
            req.user = decoded;
           

            next(); 
        });
    } else {
        return res.status(401).json({ message: "No token provided" });
    }
};

module.exports = { isLoggedIn };
