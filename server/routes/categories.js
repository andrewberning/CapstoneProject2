"use strict";

/** Routes for categories */

const express = require("express");
const router = new express.Router();
const db = require("../config/db");
const Category = require("../models/category");

/** GET / =>
 * {categories: [ {id, name}, ...]}
 */
router.get("/", async (req, res, next) => {
  try {
    let categories = await Category.getAll();
    return res.json({categories});
  } catch(err) {
    return next(err);
  }
});

/** GET /:category =>
 * Category is { id, name }
 */
router.get("/:category", async (req, res, next) => {
  try {
    let category = await Category.get(req.params.category);
    return res.json({category});
  } catch(err) {
    return next(err);
  }
});

module.exports = router;