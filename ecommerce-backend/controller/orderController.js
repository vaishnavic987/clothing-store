import Order from '../models/orderModel.js';
import asyncHandler from '../middleware/asyncHandler.js';
import { orderJSON } from '../utils/imageUrl.js';

export const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        res.status(200).json(orderJSON(req, order));
    } else {
        res.status(404).json({ message: "Order not found" });
    }
});

export const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find();
    res.status(200).json(orders.map((o) => orderJSON(req, o)));
});

export const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        };
        await order.save();
        res.status(200).json(orderJSON(req, order));
    } else {
        res.status(404).json({ message: "Order not found" });
    }
});

export const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
        await order.save();
        res.status(200).json(orderJSON(req, order));
    } else {
        res.status(404).json({ message: "Order not found" });
    }
});

export const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders.map((o) => orderJSON(req, o)));
});

export const addOrderItems = asyncHandler(async (req, res) => {
    const orderItems = req.body.orderItems || req.body.items;

    if (!orderItems?.length) {
        res.status(400);
        throw new Error("No order items");
    }

    const itemsPrice = orderItems.reduce((sum, item) => sum + item.price * item.qty, 0);

    const order = await Order.create({
        user: req.user._id,
        orderItems,
        itemsPrice,
        shippingPrice: 0,
        totalPrice: itemsPrice,
    });

    res.status(201).json(orderJSON(req, order));
});

