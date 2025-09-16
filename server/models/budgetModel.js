const pool = require('../db');

const get = async (token) => {

  const budgets = await pool.query(`
    SELECT b.id, b.threshold, b.period, c.name AS category_name
    FROM budgets b
    INNER JOIN refresh_tokens rt ON b.user_id = rt.user_id
    LEFT JOIN categories c ON b.category_id = c.id
    WHERE rt.token = $1;
  `, [token]);


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

const pastThreshold = async (token) => {

  const budgets = await pool.query(` 
    SELECT
      COUNT(b.id) AS total_budgets_num,
      COUNT(
        CASE 
          WHEN ABS(t_sum.volume) > b.threshold THEN 1
          ELSE NULL
        END
      ) AS num_past_threshold,
      COALESCE(
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'category_id', c.id,
            'category_name', c.name,
            'volume', t_sum.volume,
            'threshold', b.threshold
          )
        ) FILTER (WHERE ABS(t_sum.volume) > b.threshold),
        '[]'
      ) AS over_budget_categories
    FROM categories c
    JOIN refresh_tokens rt
      ON c.user_id = rt.user_id
      AND rt.token = $1
    LEFT JOIN budgets b
      ON b.user_id = c.user_id
      AND b.category_id = c.id
    LEFT JOIN (
      SELECT category_id, COALESCE(SUM(amount::numeric),0) AS volume
      FROM transactions
      WHERE transaction_type = 'Withdrawal'
      GROUP BY category_id
    ) t_sum
      ON t_sum.category_id = c.id;
  `, [token]);

  return budgets.rows[0];
  
};


module.exports = { get, create, pastThreshold };
