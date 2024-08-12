const Category = require("../models/category");

async function getCategory(req, res, next) {
  try {
    let category = await Category.get(req.params.category);
    return res.json({category});
  } catch(err) {
    return next(err);
  }
}

async function getAllCategories(req, res, next) {
  try {
    let categories = await Category.getAll();
    return res.json({categories});
  } catch(err) {
    return next(err);
  }
}

module.exports = { getCategory, getAllCategories };