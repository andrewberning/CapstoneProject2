"use strict";

/** Routes for categories */

const express = require("express");
const router = new express.Router();
const db = require("../config/db");
const Product = require("../models/product");

/** GET / =>
 * {products: [{ id, name, description, price, image_url, stock, category_id }, ...] }
 */ 
router.get("/:id", async (req, res, next) => {
  try {
    let categoryId = req.params.id;
    let products = await Product.getAllProductsByCategoryId(categoryId);
    return res.json({products});
  } catch(err) {
    return next(err);
  }
});

router.get("/product/:id", async (req, res, next) => {
  try {
    let product = await Product.getProduct(req.params.id);
    return res.json({product});
  } catch(err) {
    return next(err);
  }
})



module.exports = router;