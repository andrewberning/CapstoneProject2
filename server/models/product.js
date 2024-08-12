"use strict";

const db = require("../config/db");
const { NotFoundError } = require("../expressError")

class Product {

  /** Get all products by category id */
  static async getAllProductsByCategoryId(id) {
    const results = await db.query(
      `SELECT id, name, description, price, image_url, stock, category_id
       FROM products 
       WHERE category_id = $1`, [id]);
    return results.rows;
  }

  /**Get a product by its id */
  static async getProduct(id) {
    const result = await db.query(
      `SELECT id, name, description, price, image_url, stock, category_id
       FROM products
       WHERE id = $1`, [id]
    );
  
    if (!result || !result.rows || result.rows.length === 0) {
      throw new NotFoundError('Product Not Found', 404);
    }
  
    return result.rows[0];
  }

  /** Search for products by a search term */
  static async find(searchTerm) {
    const result = await db.query(
      `SELECT id, name, description, price, image_url, stock, category_id
       FROM products
       WHERE name ILIKE $1`,
      [`%${searchTerm}%`]
    );
  
    if (!result || !result.rows || result.rows.length === 0) {
      throw new NotFoundError('Product Not Found', 404);
    }
  
    return result.rows;
  }

}

module.exports = Product;