const { Sequelize } = require('sequelize');
require('dotenv').config();

// Initialize Sequelize with your PostgreSQL connection details
const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: 'postgres', // Specify that you're using PostgreSQL
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection to the PostgreSQL database has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;
