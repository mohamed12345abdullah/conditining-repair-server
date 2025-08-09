const Order = require("../models/orderModel");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");

// @desc    Get all orders or filter by status
// @route   GET /api/orders
// @access  Public
exports.getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json({
        success: true,
        count: orders.length,
        data: orders
    });
});

// @desc    Get orders by status
// @route   GET /api/orders?status=:status
// @access  Public
exports.getOrdersByStatus = asyncHandler(async (req, res) => {
    const { status } = req.query;
    const validStatuses = ['pending', 'completed', 'cancelled'];
    
    if (!validStatuses.includes(status)) {
        throw new AppError('Invalid status value', 400);
    }
    
    const orders = await Order.find({ status }).sort({ createdAt: -1 });
    
    res.status(200).json({
        success: true,
        count: orders.length,
        data: orders
    });
});

// @desc    Get single order by ID
// @route   GET /api/orders/:id
// @access  Public
exports.getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
        throw new AppError('Order not found', 404);
    }
    
    res.status(200).json({
        success: true,
        data: order
    });
});

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
exports.createOrder = asyncHandler(async (req, res) => {
    const { name, email, phone, message } = req.body;
    
    if (!name || !email || !phone || !message) {
        throw new AppError('Please provide all required fields', 400);
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

// @desc    Update order status
// @route   PATCH /api/orders/:id
// @access  Public
exports.updateOrderStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const validStatuses = ['pending', 'completed', 'cancelled'];
    
    if (!status || !validStatuses.includes(status)) {
        throw new AppError('Please provide a valid status (pending, completed, or cancelled)', 400);
    }
    
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        { status, updatedAt: Date.now() },
        { new: true, runValidators: true }
    );
    
    if (!order) {
        throw new AppError('Order not found', 404);
    }
    
    res.status(200).json({
        success: true,
        data: order
    });
});

// @desc    Delete an order
// @route   DELETE /api/orders/:id
// @access  Public
exports.deleteOrder = asyncHandler(async (req, res) => {
    const order = await Order.findByIdAndDelete(req.params.id);
    
    if (!order) {
        throw new AppError('Order not found', 404);
    }
    
    res.status(200).json({
        success: true,
        data: {}
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
