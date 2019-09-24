require('dotenv').config();

const mysql = require('mysql2/promise');

var pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DB
});

module.exports = pool;
