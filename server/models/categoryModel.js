const pool = require('../db')


const get = async (token) => {


  const result = await pool.query(`
    SELECT name 
    FROM categories c
    INNER JOIN refresh_tokens rt ON c.user_id = rt.user_id
    WHERE rt.token = $1
  `, [token]);

 
  return result.rows;

};

const create = async (token, name) => {
  
  const result = await pool.query(`
    INSERT INTO categories (user_id, name)
    SELECT u.id, $2
    FROM users u
    INNER JOIN refresh_tokens rt ON u.id = rt.user_id
    WHERE rt.token = $1
      AND NOT EXISTS (
      SELECT 1
      FROM categories c
      WHERE c.user_id = u.id
        AND c.name = $2
      )
  `, [token, name])

  return result.rows;

};


const aggregateAmountByCategory = async (token, type) => {

  const agg = await pool.query(`
    SELECT c.name as category_name, ABS(SUM(t.amount)) as volume, b.threshold
    FROM categories c
    INNER JOIN refresh_tokens rt ON c.user_id = rt.user_id
    INNER JOIN transactions t ON c.id = t.category_id
    LEFT JOIN budgets b ON b.user_id = c.user_id AND b.category_id = c.id
    WHERE rt.token = $1
    AND t.transaction_type = $2
    GROUP BY c.name, b.threshold
  `, [token, type])

  return agg.rows;

};


module.exports = { get, create, aggregateAmountByCategory };

