"use strict";

/** Routes for categories */

const express = require("express");
const router = new express.Router();
const db = require("../config/db");
const { NotFoundError } = require("../expressError")
const Cart = require("../models/cart");
const CartItem = require("../models/cartItem");

/**
 * POST /list
 */
// Add item to cart route
router.post('/items', async (req, res, next) => {
  try {
    const {user, item, quantity} = req.body
    const cart = await Cart.findByUserId(user.id)

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const cartItem = await CartItem.create({
      cart_id: cart.id,
      product_id: item.id,
      price: item.price,
      quantity
    });

      res.status(201).json({ message: 'Item added to cart', cartItem });
  } catch (error) {
      res.status(500).json({ message: 'Error adding item to cart', error });
  }
});


/** GET /:id =>
 * {cart: {id, user_id, guest_id}
 */
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    let cart;

    if (isUUID(id)) {
      cart = await Cart.findByGuestId(id);
    } else {
      cart = await Cart.findByUserId(id);
    }

    if(!cart) {
      throw new NotFoundError("Cart not found");
    }

    const items = await CartItem.findAllByCartId(cart.id);
    return res.json({ items });
  } catch(err) {
    return next(err);
  }
});

function isUUID(str) {
  const regexExp = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return regexExp.test(str);
}



module.exports = router;