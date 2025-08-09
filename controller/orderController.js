const Order = require("../models/orderModel");
const AppError = require("../utils/AppError");
const Logger = require("../utils/logger");
const asyncHandler = require("../utils/asyncHandler");
exports.getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find();
    res.status(200).json({
        success: true,
        data: orders
    });
});


exports.getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if(!order){
        throw new AppError("Order not found", 404);
    }
    res.status(200).json({
        success: true,
        data: order
    });
});


// get pending orders
exports.getPendingOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({status: "pending"});
    res.status(200).json({
        success: true,
        data: orders
    });
});


// get completed orders
exports.getCompletedOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({status: "completed"});
    res.status(200).json({
        success: true,
        data: orders
    });
});


// get cancelled orders
exports.getCancelledOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({status: "cancelled"});
    res.status(200).json({
        success: true,
        data: orders
    });
});


// change state of order 
exports.changeOrderState = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if(!order){
        throw new AppError("Order not found", 404);
    }
    order.status = req.body.status;
    await order.save();
    res.status(200).json({
        success: true,
        data: order
    });
});

exports.createOrder = asyncHandler(async (req, res) => {
    const {name, email, phone, message}= req.body;
    if(!name || !email || !phone || !message){
        throw new AppError("All fields are required", 400);
    }
    const order = await Order.create({
        name,
        email,
        phone,
        message
    });
    res.status(201).json({
        success: true,
        data: order
    });
});
