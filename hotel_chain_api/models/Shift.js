const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assuming you have a db config file

const Shift = sequelize.define('Shift', {
  shift_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  start_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  end_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
}, {
  // Adding tableName for clarity
  tableName: 'Shift',
  timestamps: false, // Assuming no timestamps are needed
});

module.exports = Shift;
