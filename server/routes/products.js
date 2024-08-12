"use strict";

/** Routes for categories */

const express = require("express");
const router = new express.Router();
const productController = require('../controllers/productController');

// GET /products/search
router.get('/search', productController.searchProducts);

// GET /products/:id 
router.get('/:id', productController.getAllProducts);

// GET /products/product/:id
router.get('/product/:id', productController.getProduct);


module.exports = router;