const Category = require('../models/categoryModel')


const getCategories = async (req, res, next) => {

  try {
    const token = req.cookies.refreshToken;

    const categories = await Category.get(token);


    res.status(201).json(categories)
  } catch (err) {
      next(err); 
  }

};

const createCategory = async (req, res, next) => {

  try {
    const token = req.cookies.refreshToken;
    const { category } = req.body;

    const result = await Category.create(token, category);

    res.status(201).json(result);
  } catch (err) {
      next(err);
  }

};


module.exports = { getCategories, createCategory };
