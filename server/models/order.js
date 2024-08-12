"use strict";
const db = require("../config/db");
const { BadRequestError } = require("../expressError");

class Order {
  // Create a new order
  static async create({ cartItems, userId, totalItems, totalAmount, name, address, city, state, zip, country }) {
    const result = await db.query(
      `INSERT INTO orders (user_id, name, total_items, total_amount, address, city, state, zip, country)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING id, user_id, total_items, total_amount, status, address, city, state, zip, country`,
       [userId, name, totalItems, totalAmount, address, city, state, zip, country]
    );
    const order = result.rows[0];
    console.log("The order was inserted into the database: ", order);

    // Insert items into order_items table
    for (let item of cartItems) {
      await db.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price)
         VALUES ($1, $2, $3, $4)`,
         [order.id, item.product_id, item.quantity, item.price]
      );
    }

    return order;
  }

  // Find all orders by user ID
  static async findAllByUserId(userId) {
    const result = await db.query(
      `SELECT id, user_id, name, address, city, state, zip, total_amoutn, created_at
       FROM orders
       WHERE user_id = $1`,
       [userId]
    );

    return result.rows;
  }
}

module.exports = Order;