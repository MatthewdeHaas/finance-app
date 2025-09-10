const pool = require('../db');

const get = async (token) => {

  const budgets = await pool.query(`
    SELECT b.id, b.threshold, b.period, c.name AS category_name
    FROM budgets b
    INNER JOIN refresh_tokens rt ON b.user_id = rt.user_id
    LEFT JOIN categories c ON b.category_id = c.id
    WHERE rt.token = $1;
  `, [token]);

  console.log(`\n${ budget.rows }\n`)

  return budgets.rows;
  

};

const create = async (token, category, threshold, period) => {

  const budget = await pool.query(`
    INSERT INTO budgets (user_id, category_id, threshold, period, date)
    SELECT u.id, c.id, $3, $4, NOW()
    FROM users u
    INNER JOIN refresh_tokens rt ON u.id = rt.user_id
    INNER JOIN categories c ON u.id = c.user_id and c.name = $2
    WHERE rt.token = $1
    ON CONFLICT (user_id, category_id, period)
    DO UPDATE SET threshold = EXCLUDED.threshold
    RETURNING *;
  `, [token, category, threshold, period])

  return budget.rows[0];

};

module.exports = { get, create };
