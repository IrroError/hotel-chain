const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assuming you have a db config file
const Hotel = require('./Hotel'); // Importing Hotel model
const Department = require('./Department'); // Importing Department model

const Facility = sequelize.define('Facility', {
  facility_id: {
    type: DataTypes.STRING(10),
    primaryKey: true,
    allowNull: false,
  },
  facility_name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  facility_status: {
    type: DataTypes.ENUM('available', 'nonavailable'),
    allowNull: false,
    defaultValue: 'available',
  },
  hotel_id: {
    type: DataTypes.STRING(10),
    references: {
      model: Hotel, // Foreign key to Hotel model
      key: 'hotel_id',
    },
    allowNull: false, // A facility must be associated with a hotel
  },
  department_id: {
    type: DataTypes.STRING(10),
    references: {
      model: Department, // Foreign key to Department model
      key: 'department_id',
    },
    allowNull: true, // A facility may not necessarily belong to a department
  },
  maintainance_cost: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true, // Maintenance cost can be null if not provided
  },
}, {
  // Adding tableName for clarity
  tableName: 'Facility',
  timestamps: false, // Assuming no timestamps are needed
});

// Define associations
Facility.belongsTo(Hotel, { foreignKey: 'hotel_id' });
Facility.belongsTo(Department, { foreignKey: 'department_id' });

module.exports = Facility;
