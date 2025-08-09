const express = require("express");
const router = express.Router();

const orderController = require("../controller/orderController");


router.route("/")
        .get(orderController.getAllOrders)
        .post(orderController.createOrder);


module.exports = router;
