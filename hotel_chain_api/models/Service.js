const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assuming you have a db config file
const Department = require('./Department'); // Assuming you have the Department model

const Service = sequelize.define('Service', {
  service_id: {
    type: DataTypes.STRING(15),
    primaryKey: true,
    allowNull: false,
  },
  service_name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  department_id: {
    type: DataTypes.STRING(10),
    references: {
      model: 'Department',
      key: 'department_id',
    },
    allowNull: true, // assuming it's optional, adjust if necessary
  },
  service_cost: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    defaultValue: 10.00,
  },
}, {
  // Adding tableName for clarity
  tableName: 'Service',
  timestamps: false, // Assuming no timestamps are needed
});

// Define associations
Service.belongsTo(Department, { foreignKey: 'department_id' });

module.exports = Service;
