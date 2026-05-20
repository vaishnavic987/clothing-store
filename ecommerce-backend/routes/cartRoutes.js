import express from "express";
import {
    getCart,
    addToCart,
    updateCartItemQty,
    removeFromCart,
    clearCart,
    checkoutCart,
} from "../controller/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.route("/").get(getCart).post(addToCart).delete(clearCart);
router.post("/checkout", checkoutCart);
router.patch("/:productId", updateCartItemQty);
router.delete("/:productId", removeFromCart);

export default router;
