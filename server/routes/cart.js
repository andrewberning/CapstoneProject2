"use strict";

const express = require("express");
const router = new express.Router();
const cartController = require('../controllers/cartController');

// POST /cart/item
router.post('/item', cartController.addItemToCart);

// GET /cart/:id 
router.get("/items/:id", cartController.getCart);

// PATCH /cart/items/:id
router.patch("/items/:id", cartController.updateCartItemQuantity);

// DELETE cart/items/:id
router.delete("/item/:id", cartController.removeItemFromCart);

// DELETE cart/items/:cartId
router.delete("/items/:id", cartController.removeItemsFromCart);

module.exports = router;
