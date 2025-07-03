import User from "../Models/userModel.js";
import bcrypt from "bcrypt";

// Controller for signup
export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Signup Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller for login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        profileImage: user.profileImage || null,
      },
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller for updating profile with optional image
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email } = req.body;
    const profileImage = req.file ? `/uploads/${req.file.filename}` : undefined;

    const userId = req.body.userId || req.params.userId || req.query.userId; // fallback
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    user.fullname = fullname || user.fullname;
    user.email = email || user.email;
    if (profileImage) user.profileImage = profileImage;

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
