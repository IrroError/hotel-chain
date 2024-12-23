const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assuming you have a db config file
const Staff = require('./Staff'); // Importing Staff model
const Hotel = require('./Hotel'); // Importing Hotel model

const Department = sequelize.define('Department', {
  department_id: {
    type: DataTypes.STRING(10),
    primaryKey: true,
    allowNull: false,
  },
  department_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  hotel_id: {
    type: DataTypes.STRING(10),
    references: {
      model: Hotel, // Foreign key to Hotel model
      key: 'hotel_id',
    },
    allowNull: false, // Department must be associated with a hotel
  },
  department_head: {
    type: DataTypes.STRING(10),
    references: {
      model: Staff, // Foreign key to Staff model
      key: 'staff_id',
    },
    allowNull: true, // Department head can be null if not assigned
  },
}, {
  // Adding tableName for clarity
  tableName: 'Department',
  timestamps: false, // Assuming no timestamps are needed
});

// Define associations
Department.belongsTo(Hotel, { foreignKey: 'hotel_id' });
Department.belongsTo(Staff, { foreignKey: 'department_head', as: 'head' });

module.exports = Department;
