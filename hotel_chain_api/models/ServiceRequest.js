const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assuming you have a db config file
const Service = require('./Service'); // Assuming you have the Service model
const Guest = require('./Guest'); // Assuming you have the Guest model

const ServiceRequest = sequelize.define('ServiceRequest', {
  service_request_id: {
    type: DataTypes.STRING(15),
    primaryKey: true,
    allowNull: false,
  },
  service_id: {
    type: DataTypes.STRING(10),
    references: {
      model: 'Service',
      key: 'service_id',
    },
    allowNull: false,
  },
  request_timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  guest_id: {
    type: DataTypes.STRING(12),
    references: {
      model: 'Guest',
      key: 'guest_id',
    },
    allowNull: false,
  },
  request_status: {
    type: DataTypes.ENUM('success', 'proceeding', 'fail'),
    allowNull: false,
    defaultValue: 'proceeding',
  },
}, {
  tableName: 'ServiceRequest',
  timestamps: false, // Assuming no timestamps are needed
});

// Define associations
ServiceRequest.belongsTo(Service, { foreignKey: 'service_id' });
ServiceRequest.belongsTo(Guest, { foreignKey: 'guest_id' });

module.exports = ServiceRequest;
