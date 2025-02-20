import bycrptjs from "bcryptjs";

import User from "../model/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Email doesn't exist" });
    }

    const isPasswordCorrect = bycrptjs.compareSync(
      password,
      user?.password || null
    );

    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      success: true,
      user: {
        ...user._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log("Error in login controller : " + error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const signUp = async (req, res) => {
  try {
    const { email, password, confirmPassword, username } = req.body;

    if (!email || !password || !confirmPassword || !username) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    if (password.trim() !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords don't match" });
    }

    const existingEmail = await User.findOne({ email: email });

    if (existingEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email is already taken" });
    }

    const existingUser = await User.findOne({ username: username.trim() });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Username is already taken" });
    }

    const profileImgs = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const randomImg =
      profileImgs[Math.floor(Math.random() * profileImgs.length)];

    const salt = await bycrptjs.genSalt(10);
    const hashedPassword = bycrptjs.hashSync(password.trim(), salt);

    const newUser = new User({
      username: username.trim(),
      email,
      password: hashedPassword,
      profileImg: randomImg,
    });

    generateTokenAndSetCookie(newUser._id, res);

    await newUser.save();

    return res.status(201).json({
      success: true,
      user: {
        ...newUser._doc,
        password: "",
      },
    });
  } catch (error) {
    console.log("Error in signUp controller : " + error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const logOut = (req, res) => {
  try {
    res.clearCookie("jwt-netflix");
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logOut controller : " + error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json({success : true, user : req.user})
  } catch (error) {
    console.log("Error in checkAuth controller : " + error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
