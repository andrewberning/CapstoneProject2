const jsonschema = require("jsonschema");
const orderSchema = require("../schemas/order.json");
const { createPaypalOrder, capturePaypalOrder } = require('../services/paypal')
const Order = require("../models/order");
const { BadRequestError } = require("../expressError");

// Create a new order
async function createOrder(req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, orderSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    
    const order = await Order.create(req.body.orderData);
    return res.status(201).json({ success: true, order });
  } catch (err) {
    return res.status(400).json({ success: false, errors: [err.message] });
  }
}

// Create Paypal Order
async function createPayPalOrder(req, res, next) {
  console.log(req.body);
  try {
    const { orderData } = req.body;
    const { jsonResponse, httpStatusCode } = await createPaypalOrder(orderData);

    return res.status(httpStatusCode).json({ jsonResponse });
  } catch (err) {
    next(err);
  }
}

// Capture PayPal order
async function capturePayPalOrder(req, res, next) {
  try {
    const { orderID } = req.params;
    const { jsonResponse, httpStatusCode } = await capturePaypalOrder(orderID);
    return res.status(httpStatusCode).json( jsonResponse );
  } catch (err) {
    next(err);
  }
};

// Get an order by ID
async function getOrderById(req, res, next) {
  try { 
    const order = await Order.getOrderById(req.params.id);
    return res.status(200).json(order);
  } catch (err) {
    return next(err);
  }
}

// Get all orders for a user
async function findAllOrders(req, res, next) {
  try {
    const orders = await Order.findAllOrders(req.params.userId);
    return res.json({ orders });
  } catch (err) {
    return next(err);
  }
}

module.exports = { createOrder, getOrderById, findAllOrders, createPayPalOrder, capturePayPalOrder };