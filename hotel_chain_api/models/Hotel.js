const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Your database configuration

const Hotel = sequelize.define('Hotel', {
  hotel_id: {
    type: DataTypes.STRING(10),
    primaryKey: true,
    allowNull: false,
    validate: {
      len: [10, 10], // Ensure the hotel_id length is exactly 10 characters
    },
  },
  hotel_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  hotel_location: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  rating: {
    type: DataTypes.DECIMAL(2, 1),
    allowNull: true, // Rating is optional, can be null
    validate: {
      min: 0.0,
      max: 5.0, // Rating should be between 0 and 5
    },
  },
}, {
  // Adding timestamps, which will make queries easier to track
  timestamps: false,
  tableName: 'Hotel', // To ensure Sequelize uses the exact table name
});

module.exports = Hotel;
