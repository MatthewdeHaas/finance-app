const Budget = require('../models/budgetModel');


const getBudget = async (req, res, next) => {

    try {
      const token = req.cookies.refreshToken;
      const budgets = await Budget.get(token);
      res.status(201).json(budgets);
  } catch (err) {
      next(err);
  }

};

const createBudget = async (req, res, next) => {

    try {
      const { category, threshold, period } = req.body;
      const token = req.cookies.refreshToken;
      const budget = await Budget.create(token, category, threshold, period);
      res.status(201).json(budget);
  } catch (err) {
      next(err);
  }

};

const pastThreshold = async (req, res, next) => {

    try {
      const token = req.cookies.refreshToken;
      const budgets = await Budget.pastThreshold(token);
      res.status(201).json(budgets);
  } catch (err) {
      next(err);
  }

};

module.exports = { getBudget, createBudget, pastThreshold };
