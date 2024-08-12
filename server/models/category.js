"use strict";

const db = require("../config/db");
const { NotFoundError } = require("../expressError")

class Category {
  /** All: all categories */

  static async getAll() {
    const results = await db.query(
      `SELECT id, name, image_url 
       FROM categories
       ORDER BY name`);
    return results.rows;
  }

  static async get(category) {
    const result = await db.query(
      `SELECT id, name, image_url
       FROM categories
       WHERE name = $1`, [category]
    );
  
    if (!result || !result.rows || result.rows.length === 0) {
      throw new NotFoundError(`Category Not Found: ${category}`, 404);
    }
  
    return result.rows[0];
  }  
}

module.exports = Category;