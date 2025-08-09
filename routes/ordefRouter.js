const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");
const asyncHandler = require("../utils/asyncHandler");

// Get all orders with optional status filter
router.get("/", orderController.getAllOrders);

// Create a new order
router.post("/", orderController.createOrder);

// Get a specific order
router.get("/:id", orderController.getOrderById);

// Update an order's status
router.patch("/:id", orderController.updateOrderStatus);

// Delete an order
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
