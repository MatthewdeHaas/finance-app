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



module.exports = { get, create };
