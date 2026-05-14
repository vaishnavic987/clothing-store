import express from "express";
import { authUser, registerUser, getUserProfile, getUsers, getUserById, updateUser, deleteUser, updateUserProfile, logoutUser } from "../controller/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();
/** Parses Postman "form-data" (multipart/form-data); JSON still uses express.json() */

router.route("/").post(registerUser).get(getUsers);
router.route("/login").post(authUser);
router.route("/profile").get(protect,getUserProfile).put(protect,updateUserProfile);
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);
router.route("/logout").post(logoutUser);

export default router;