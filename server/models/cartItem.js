"use strict";

const db = require("../config/db");
const { BadRequestError } = require("../expressError");

class CartItem {
  // Create a new cart item
  static async create({ cart_id, product_id, quantity, price }) {
    const result = await db.query(
      `INSERT INTO cart_items (cart_id, product_id, quantity, price)
       VALUES ($1, $2, $3, $4)
       RETURNING id, cart_id, product_id, quantity, price`,
      [cart_id, product_id, quantity, price]
    );
    
    const cartItem = result.rows[0];
    return cartItem;
  }

  // Find all items in a specific cart
  static async findAllByCartId(cart_id) {
    const result = await db.query(
      `SELECT ci.id, ci.cart_id, ci.product_id, ci.quantity, ci.price, p.name, p.description, p.image_url
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.id
       WHERE ci.cart_id = $1`,
      [cart_id]
    );

    return result.rows;
  }

  // Update the quantity of a specific cart item
  static async updateQuantity(id, quantity) {
    const result = await db.query(
      `UPDATE cart_items
       SET quantity = $1
       WHERE id = $2
       RETURNING id, cart_id, product_id, quantity, price`,
      [quantity, id]
    );

    const cartItem = result.rows[0];
    if (!cartItem) throw new BadRequestError(`No cart item found with id: ${id}`);

    return cartItem;
  }

  // Remove an item from the cart
  static async remove(id) {
    const result = await db.query(
      `DELETE FROM cart_items
       WHERE id = $1
       RETURNING id`,
      [id]
    );

    const cartItem = result.rows[0];
    if (!cartItem) throw new BadRequestError(`No cart item found with id: ${id}`);
    
    return cartItem;
  }

  // Remove all items from the cart
  static async removeAllItems(cartId) {
    const result = await db.query(
      `DELETE FROM cart_items
       WHERE cart_id = $1
       RETURNING id`,
      [cartId]
    );

    if (result.rows.length === 0) {
      throw new BadRequestError(`No cart items found with cartId: ${cartId}`);
    }
  
    return result.rows;
  };
}

module.exports = CartItem;
