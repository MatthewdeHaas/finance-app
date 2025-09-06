const pool = require('../db');
const bcrypt = require('bcrypt');

const save = async (user_id, token) => {
  const tokenHash = await bcrypt.hash(token, 12);
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
  await pool.query(
    `INSERT INTO refresh_tokens (user_id, token) VALUES ($1, $2)`,
    [user_id, token]
  );
}

const find = async (token) => {

  const result = await pool.query(
    `SELECT * FROM refresh_tokens WHERE token = $1`, [token]);

  return result.rows[0] || null;

}

const revoke = async (token) => {
  const result = await pool.query(`SELECT id, token FROM refresh_tokens`);
  for (const row of result.rows) {
    const match = await bcrypt.compare(token, row.token);
    if (match) {
      await pool.query('DELETE FROM refresh_tokens WHERE id = $1', [row.id]);
      break;
    }
  }
}

module.exports = { save, find, revoke };
