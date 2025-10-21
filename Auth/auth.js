// middleware/auth.js
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  // Get the token from the request header using optional chaining
  const token = req.headers['authorization']?.split(' ')[1]; // Extract the token part

  if (token == null) {
    return res.status(401).json({ message: "Access token required" }); // 401 Unauthorized
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" }); // 403 Forbidden
    }
    req.user = user; // Attach user info to the request object
    next(); // Pass control to the next middleware/controller
  });
};

module.exports = authenticateToken;