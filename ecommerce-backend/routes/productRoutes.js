import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { getProducts, getProductById } from "../controller/productController.js";

const router = express.Router();

router.route("/").get(getProducts);
router.route("/:id").get(getProductById);

export default router;