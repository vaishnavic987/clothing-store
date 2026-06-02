import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";
import jwt from "jsonwebtoken";

const generateToken = (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        const token = generateToken(user._id);
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
            path: "/",
            maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        res.json({
            success: true,
            message: "Login successful",
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

// @desc Register user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }
    const user = await User.create({ name, email, password });
    if (user) {
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

// @desc Log out user (clear httpOnly JWT cookie)
// @route ALL /api/users/logout (GET, POST, etc. — clears jwt cookie)
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
  const cookieOpts = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    path: "/",
  };
  res.clearCookie("jwt", cookieOpts);
  res.status(200).json({ success: true, message: "Logged out successfully" });
});



// @desc  Get saved address for logged-in user
// @route GET /api/users/address
// @access Private
const getAddress = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("savedAddress");
    res.json(user.savedAddress || {});
});

// @desc  Save / update address for logged-in user
// @route PUT /api/users/address
// @access Private
const saveAddress = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, shippingAddress, city, state, zipCode, country, phoneNumber } = req.body;
    await User.findByIdAndUpdate(req.user._id, {
        savedAddress: { firstName, lastName, email, shippingAddress, city, state, zipCode, country, phoneNumber },
    });
    res.json({ message: "Address saved successfully" });
});

export { authUser, registerUser, logoutUser, getAddress, saveAddress };