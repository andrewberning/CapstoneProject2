"use strict";

const db = require("../config/db");
const { BadRequestError, NotFoundError } = require("../expressError")

class Cart {
  static async createCart(user_id = null, guest_id = null) {
    if (!user_id && !guest_id) {
      throw new BadRequestError("Either user_id or guest_id must be provided");
    }

    const duplicateCheck = await db.query(
      `SELECT id
       FROM carts
       WHERE user_id = $1 OR guest_id = $2`, 
       [user_id, guest_id]
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Cart already created for the provided user_id or guest_id`);
    }

    const result = await db.query(
      `INSERT INTO carts (user_id, guest_id) 
       VALUES ($1, $2) 
       RETURNING id, user_id, guest_id`, 
       [user_id, guest_id]
    );

    const cart = result.rows[0];
    return cart;
  }

  static async findByUserId(user_id){
    if (!user_id) {
      throw new BadRequestError("User id must be provided");
    }

    const result = await db.query(
      `SELECT id, user_id
       FROM carts
       WHERE user_id = $1`,
    [user_id]);

    const cart = result.rows[0];
  
    if(!cart) {
      throw new NotFoundError(`No cart found for user_id: ${user_id}`);
    }
    return cart
  }

  static async findByGuestId(guest_id){
    if (!guest_id) {
      throw new BadRequestError("Guest id must be provided");
    }

    const result = await db.query(
      `SELECT id, guest_id
       FROM carts
       WHERE guest_id = $1`,
    [guest_id]);

    const cart = result.rows[0];

    if(!cart) {
      throw new NotFoundError(`No cart found for user_id: ${guest_id}`);
    }

    return cart
  } 
}

module.exports = Cart;