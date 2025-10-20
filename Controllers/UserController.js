import User from "../Models/User.js";

export const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;


    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }


    const existingUser = await User.findOne({ Email: username });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }


    const user = new User({
      Email: username,
      Password: password
    });
   console.log("Saving user:", user);

   const savedUser = await new User({ Email: username, Password: password }).save();
  console.log("User saved!",savedUser);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: savedUser._id,
        email: savedUser.Email,
        createdAt: savedUser.createdAt
      }
    });

  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server Error" });
  }
};