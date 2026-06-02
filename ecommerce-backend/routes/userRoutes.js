import express from "express";
import { authUser, registerUser, logoutUser, getAddress, saveAddress } from "../controller/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.post("/logout", logoutUser);
router.get("/logout", logoutUser);
router.route("/address").get(protect, getAddress).put(protect, saveAddress);
// router.route("/profile").get(protect,getUserProfile).put(protect,updateUserProfile);
// router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

export default router;