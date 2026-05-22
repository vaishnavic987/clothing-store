import Product from "../models/productModels.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { productJSON } from "../utils/imageUrl.js";

const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;
    const search = req.query.search
        ? { name: { $regex: req.query.search, $options: "i" } }
        : {};
    const category =
        req.query.category && ["mens", "womens", "kids"].includes(req.query.category)
            ? { category: req.query.category }
            : {};
    const filter = { ...search, ...category };
    const count = await Product.countDocuments(filter);
    const products = await Product.find(filter)
        .limit(pageSize)
        .skip(pageSize * (page - 1));
    res.json({
        products: products.map((p) => productJSON(req, p)),
        page,
        pages: Math.ceil(count / pageSize),
    });
});

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(productJSON(req, product));
    } else {
        res.status(404).json({ message: "Product not found" });
    }
})


const createProductReview = asyncHandler(async (req, res) => {
    const { productId, rating, comment } = req.body;
    const product = await Product.findById(productId);
    if (product) {
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment: comment,
        }
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;
        await product.save();
        res.status(201).json({ message: "Review added" });
    } else {
        res.status(404).json({ message: "Product not found" });
    }
})

export { getProducts, getProductById, createProductReview };