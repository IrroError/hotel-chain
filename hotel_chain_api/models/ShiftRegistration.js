const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assuming you have a db config file
const Staff = require('./Staff'); // Assuming you have the Staff model file
const Shift = require('./Shift'); // Assuming you have the Shift model file

const ShiftRegistration = sequelize.define('ShiftRegistration', {
  shift_registration_id: {
    type: DataTypes.STRING(15),
    primaryKey: true,
    allowNull: false,
  },
  staff_id: {
    type: DataTypes.STRING(10),
    references: {
      model: 'Staff',
      key: 'staff_id',
    },
    allowNull: false,
  },
  shift_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Shift',
      key: 'shift_id',
    },
    allowNull: false,
  },
  shift_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
}, {
  // Adding tableName for clarity
  tableName: 'ShiftRegistration',
  timestamps: false, // Assuming no timestamps are needed
});

// Define associations
ShiftRegistration.belongsTo(Staff, { foreignKey: 'staff_id' });
ShiftRegistration.belongsTo(Shift, { foreignKey: 'shift_id' });

module.exports = ShiftRegistration;
