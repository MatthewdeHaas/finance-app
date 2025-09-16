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
    const { name } = req.body;

    const result = await Category.create(token, name);

    res.status(201).json(result);
  } catch (err) {
      next(err);
  }

};


const aggregateAmountByCategory = async (req, res, next) => {

  
  try { 
    const token = req.cookies.refreshToken;
    const { type, period } = req.body;
    const result = await Category.aggregateAmountByCategory(token, type, period);
    res.status(201).json(result);
  } catch (err) {
      next(err);
  }

};


module.exports = { getCategories, createCategory, aggregateAmountByCategory };
