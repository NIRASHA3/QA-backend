const User = require("../Models/User");
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
    console.log("Missing username or password");
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find user by email (username in request)
    const user = await User.findOne({ Email: username.toLowerCase() });
     console.log("User found in DB:", user);
    if (!user) {
    console.log("User not found in database");
      return res.status(400).json({ message: "User not found" });
    }

    if (user.Password !== password) {
    console.log("Incorrect password provided:");
      return res.status(400).json({ message: "Incorrect password" });
    }
     const token = jwt.sign(
          { userId: user._id, email: user.email },
          process.env.JWT_SECRET, // Make sure this environment variable is set!
          { expiresIn: '1h' } // Token expires in 1 hour
        );
    console.log("Login successful for user:");
    res.status(200).json({ message: "Login successful",accessToken: token, user: { id: user._id, email: user.Email } });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { loginUser };
