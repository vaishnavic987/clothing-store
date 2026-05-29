import express from "express";
import { authUser, registerUser, logoutUser } from "../controller/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.post("/logout", logoutUser);
router.get("/logout", logoutUser);

export default router;