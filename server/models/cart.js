"use strict";

const db = require("../config/db");

class Cart {
  // Create a new cart
  static async createCart(user_id) {
    const result = await db.query(
      `INSERT INTO carts (user_id)
       VALUES ($1)
       RETURNING id, user_id`,
      [user_id]
    );
    
    const cart = result.rows[0];
    return cart;
  }

  // Find cart by user ID
  static async findByUserId(user_id) {
    const result = await db.query(
      `SELECT id, user_id
       FROM carts
       WHERE user_id = $1`,
      [user_id]
    );

    const cart = result.rows[0];
    return cart;
  }
}

module.exports = Cart;
