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

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
        maxAge: 0,
    });
    res.status(200).json({ success: true, message: "Logged out successfully" });
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
    res.send("getUserProfile");
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
    res.send("updateUserProfile");
});

// @desc Get users
// @route GET /api/users
// @access Private
const getUsers = asyncHandler(async (req, res) => {
    res.send("getUsers");
});

// @desc Get user by ID
// @route GET /api/users/:id
// @access Private
const getUserById = asyncHandler(async (req, res) => {
    res.send("getUserById");
});

// @desc Update user
// @route PUT /api/users/:id
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    res.send("updateUser");
});

// @desc Delete user
// @route DELETE /api/users/:id
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    res.send("deleteUser");
});

export { authUser, registerUser, getUserProfile, getUsers, getUserById, updateUser, deleteUser, updateUserProfile, logoutUser };