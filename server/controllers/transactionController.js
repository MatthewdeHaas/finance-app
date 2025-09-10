const Transaction = require('../models/transactionModel');



const getTransactions = async (req, res, next) => {

    try {

    const token = req.cookies.refreshToken;
    const transactions = await Transaction.get(token);
    res.status(201).json(transactions);

  } catch (err) {
    next(err);
  }

};


module.exports = { getTransactions  };
