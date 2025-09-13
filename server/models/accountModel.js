const pool = require('../db');
const Transaction = require('./transactionModel') 

const create = async (token, name) => {  

    const result = await pool.query(`
      INSERT INTO accounts (user_id, name)
      SELECT u.id, $2
      FROM users u
      INNER JOIN refresh_tokens rt ON u.id = rt.user_id
      WHERE rt.token = $1
        AND NOT EXISTS (
        SELECT 1
        FROM accounts a
        WHERE a.user_id = u.id
          AND a.name = $2
      )
      RETURNING *;
    `, [token, name]);

    return result.rows;
};

const getAccounts = async (token) => {
  
  const result = await pool.query(`
    SELECT a.name, a.balance
    FROM accounts a
    INNER JOIN refresh_tokens rt ON a.user_id = rt.user_id
    WHERE rt.token = $1;
    `, [token]);

  return result.rows;

};


const updateBalance = async (token, account, amount, category, type) => {

  amount = parseInt(amount);
    
  if (type === "Withdrawal") amount *= -1; 

  const accountQuery = await pool.query(`
    UPDATE accounts a
    SET balance = balance + $1
    FROM refresh_tokens rt
    WHERE a.user_id = rt.user_id
      AND rt.token = $2
      AND a.name = $3
    RETURNING *;
  `, [amount, token, account]); 

  const transactions = await Transaction.create(token, account, amount, category, type);

  return accountQuery.rows[0]; 

};



const netBalance = async (token) => {

  const netBalance = await pool.query(`
    SELECT SUM(a.balance) as amount
    FROM accounts a
    INNER JOIN refresh_tokens rt ON a.user_id = rt.user_id
    WHERE rt.token = $1
   `, [token])


  return netBalance.rows[0];

};




module.exports = { create, getAccounts, updateBalance, netBalance };
