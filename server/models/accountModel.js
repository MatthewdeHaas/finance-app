const pool = require('../db');

const create = async (token, name) => {  

    const result = await pool.query(`
      INSERT INTO accounts (user_id, name)
      SELECT u.id, $2
      FROM users u
      INNER JOIN refresh_tokens rt ON u.id = rt.user_id
      WHERE rt.token = $1;
    `, [token, name]);

    return result.rows;
};

const getAccounts = async (token) => {


  // TODO: Currently returning empty - fix
  // Cookies are fine
  
  const result = await pool.query(`
    SELECT a.name, a.balance
    FROM accounts a
    INNER JOIN refresh_tokens rt ON a.user_id = rt.user_id
    WHERE rt.token = $1;
    `, [token]);

  return result.rows;

};

module.exports = { create, getAccounts }
