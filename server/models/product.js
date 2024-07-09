"use strict";

const db = require("../config/db");
const { NotFoundError } = require("../expressError")

class Product {
  /** All: all categories */

  static async getAllProductsByCategoryId(id) {
    const results = await db.query(
      `SELECT id, name, description, price, image_url, stock, category_id
       FROM products 
       WHERE category_id = $1`, [id]);
    return results.rows;
  }

  static async getProduct(id) {
    const result = await db.query(
      `SELECT id, name, description, price, image_url, stock, category_id
       FROM products
       WHERE id = $1`, [id]
    );

    if(!result.rows[0]) throw new NotFoundError(`Category Not Found: ${category}`, 404);

    return result.rows[0];
  }
}

module.exports = Product;