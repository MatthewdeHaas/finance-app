const { Pool } = require('pg');
const dotenv = require("dotenv");


// configure .env file
dotenv.config(); 


// Create a database pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});


module.exports = pool;
