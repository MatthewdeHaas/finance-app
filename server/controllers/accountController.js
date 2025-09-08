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

      // console.log(`\n\n\n Token: ${ req.cookies.refreshToken } \n\n\n`)

      const accounts = await Account.getAccounts(token);
      res.status(201).json(accounts);

  } catch (err) {
    next()
  }
};

module.exports = { createAccount, getAccounts}
