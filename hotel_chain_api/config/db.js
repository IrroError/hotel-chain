const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

pool.connect((err) => {
    if (err) {
        console.error('Error connecting to the database', err);
    } else {
        console.log('Connected to PostgreSQL database');
    }
});

module.exports = pool;