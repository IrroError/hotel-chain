const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Your database configuration

// Define the Guest model
const Guest = sequelize.define('Guest', {
  guest_id: {
    type: DataTypes.STRING(12),
    primaryKey: true,
    allowNull: false,
    validate: {
      len: [12, 12], // Ensure the guest_id length is exactly 12 characters
    },
  },
  guest_name: {
    type: DataTypes.STRING(50),
    allowNull: true, // Guest name is optional
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', 'unknown'),
    allowNull: false,
    defaultValue: 'male', // Default gender is male
  },
}, {
  // Adding timestamps for easier tracking of creation and updates
  timestamps: false,
  tableName: 'Guest', // Make sure the table name matches the one in the database
});

module.exports = Guest;
