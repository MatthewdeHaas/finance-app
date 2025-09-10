const Account = require('../models/accountModel');

const createAccount = async (req, res, next) => {
    try {
    const token = req.cookies.refreshToken;
    const { name } = req.body;
      
    const account = await Account.create(token, name);
    res.status(201).json(account);
  } catch (err) {
    next(err);
  } 
}


const getAccounts = async (req, res, next) => {
    try {
      const token = req.cookies.refreshToken;

      const accounts = await Account.getAccounts(token);

      res.status(201).json(accounts);
  } catch (err) {
    next()
  }
};


const updateBalance = async (req, res, next) => {
  try {
    const { account, amount, category, type } = req.body;
    const token = req.cookies.refreshToken;

    const update = await Account.updateBalance(token, account, amount, category, type);
    res.status(201).json(update); 
  } catch (err) {
    next(err);
  }
};



module.exports = { createAccount, getAccounts, updateBalance };
