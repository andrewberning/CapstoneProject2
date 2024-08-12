const express = require("express");
const router = new express.Router();
const orderController = require("../controllers/orderController");

// POST /orders/create-order - create a new order
router.post('/create-order',  orderController.createOrder);

// POST /orders/create-paypal-order
router.post('/create-paypal-order', orderController.createPayPalOrder);

// POST /orders/capture-paypal-order
router.post('/:orderID/capture-paypal-order', orderController.capturePayPalOrder);

module.exports = router;