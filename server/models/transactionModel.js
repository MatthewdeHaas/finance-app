const pool = require('../db');


const get = async (token, num) => {

  const transactions = await pool.query(`
    SELECT 
      t.id,
      t.amount,
      t.transaction_type,
      t.date,
      a.name AS account_name,
      c.name AS category_name,
      TO_CHAR(t.date, 'YYYY-MM-DD') as date1
    FROM transactions t
    INNER JOIN refresh_tokens rt 
      ON t.user_id = rt.user_id
    INNER JOIN accounts a 
      ON t.account_id = a.id
    LEFT JOIN categories c 
      ON t.category_id = c.id
    WHERE rt.token = $1
    ORDER BY date DESC    
    LIMIT NULLIF($2::INT, 0);
  `, [token, num]); 
 
  return transactions.rows;

};

const create = async (token, account, amount, category, type) => {

  const transaction = await pool.query(`
    INSERT INTO transactions (user_id, account_id, category_id, amount, date, transaction_type)
    SELECT u.id, a.id, c.id, $3, NOW(), $5
    FROM users u 
    INNER JOIN refresh_tokens rt ON u.id =  rt.user_id
    INNER JOIN accounts a ON u.id = a.user_id AND a.name = $2
    LEFT JOIN categories c ON u.id = c.user_id AND c.name = $4
    WHERE rt.token = $1
    RETURNING *;
  `, [token, account, amount, category, type])

  return transaction.rows;

}


const monthlySpending = async (token) => {

  const monthlySpending = await pool.query(`
    SELECT 
      ABS(SUM(t.amount)) as amount,
      COUNT(*) as num_transactions
    FROM transactions t
    INNER JOIN refresh_tokens rt ON rt.user_id = t.user_id
    WHERE rt.token = $1
      AND date_trunc('month', t.date) = date_trunc('month', NOW())
      AND t.transaction_type = 'Withdrawal';
  `, [token])

  return monthlySpending.rows[0];  

};

const dailyVolume = async (token, startDate) => {
  

  const dailyVolume = await pool.query(`
    WITH days AS (
      SELECT generate_series(
        $2::date,
        CURRENT_DATE,
        interval '1 day'
      )::date AS day
    ),
    agg AS (
      SELECT 
        t.date::date AS day,
        ABS(SUM(t.amount)) as day_amount
      FROM transactions t
      INNER JOIN refresh_tokens rt 
        ON t.user_id = rt.user_id
      WHERE rt.token = $1
        AND t.transaction_type = 'Withdrawal'
        AND t.date > $2
      GROUP BY t.date::date
      ORDER BY day
    )
    SELECT 
      d.day,
      COALESCE(a.day_amount, 0) AS day_amount
    FROM days d
    LEFT JOIN agg a
      on d.day = a.day
    ORDER BY d.day;
  `, [token, startDate])

  return dailyVolume.rows;  
};


module.exports = { get, create, monthlySpending, dailyVolume };
