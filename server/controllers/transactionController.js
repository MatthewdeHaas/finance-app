const Transaction = require('../models/transactionModel');


const getTransactions = async (req, res, next) => {

    try {
      const { num } = req.body;
      const token = req.cookies.refreshToken;
      const transactions = await Transaction.get(token, num);
      res.status(201).json(transactions);
  } catch (err) {
      next(err);
  }

};

const monthlySpending = async (req, res, next) => {

    try {
      const token = req.cookies.refreshToken;
      const monthlyTransactions = await Transaction.monthlySpending(token);
      res.status(201).json(monthlyTransactions );
  } catch (err) {
      next(err);
  }

};

module.exports = { getTransactions, monthlySpending };
