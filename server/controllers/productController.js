const Product = require('../models/product');

async function getProduct(req, res, next) {
  try {
    let product = await Product.getProduct(req.params.id);
    return res.json({product});
  } catch(err) {
    return next(err);
  }
}

async function getAllProducts(req, res, next) {
  try {
    let categoryId = req.params.id;
    let products = await Product.getAllProductsByCategoryId(categoryId);
    return res.json({products});
  } catch(err) {
    return next(err);
  }
}

async function searchProducts(req, res, next) {
  console.log("using searchProducts method");
  
  const searchTerm = req.query.q;
  try {
    const products = await Product.find(searchTerm);
    return res.json({products})
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getProduct,
  getAllProducts,
  searchProducts
}