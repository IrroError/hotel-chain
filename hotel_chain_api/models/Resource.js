const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assuming you have a db config file
const Hotel = require('./Hotel'); // Importing Hotel model
const Department = require('./Department'); // Importing Department model

const Resource = sequelize.define('Resource', {
  resource_id: {
    type: DataTypes.STRING(10),
    primaryKey: true,
    allowNull: false,
  },
  resource_name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  resource_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0, // Ensure resource_quantity is greater than or equal to 0
    },
  },
  hotel_id: {
    type: DataTypes.STRING(10),
    references: {
      model: Hotel, // Foreign key to Hotel model
      key: 'hotel_id',
    },
    allowNull: false, // A resource must be associated with a hotel
  },
  department_id: {
    type: DataTypes.STRING(10),
    references: {
      model: Department, // Foreign key to Department model
      key: 'department_id',
    },
    allowNull: true, // A resource may not necessarily belong to a department
  },
}, {
  // Adding tableName for clarity
  tableName: 'Resource',
  timestamps: false, // Assuming no timestamps are needed
});

// Define associations
Resource.belongsTo(Hotel, { foreignKey: 'hotel_id' });
Resource.belongsTo(Department, { foreignKey: 'department_id' });

module.exports = Resource;
