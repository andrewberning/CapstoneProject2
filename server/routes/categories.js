"use strict";

/** Routes for categories */

const express = require("express");
const router = new express.Router();
const categoryController = require("../controllers/categoryController")


// GET /:category
router.get('/:category', categoryController.getCategory)

// GET /
router.get('/', categoryController.getAllCategories)

module.exports = router;