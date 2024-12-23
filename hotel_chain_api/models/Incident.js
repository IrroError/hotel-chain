const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assuming you have a db config file
const Hotel = require('./Hotel'); // Assuming you have the Hotel model
const Staff = require('./Staff'); // Assuming you have the Staff model

// Define the Incident model
const Incident = sequelize.define('Incident', {
  incident_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Equivalent to SERIAL in PostgreSQL
  },
  hotel_id: {
    type: DataTypes.STRING(15),
    references: {
      model: 'Hotel',
      key: 'hotel_id',
    },
    allowNull: false,
  },
  reporter: {
    type: DataTypes.STRING(10),
    references: {
      model: 'Staff',
      key: 'staff_id',
    },
    allowNull: false,
  },
  handler_id: {
    type: DataTypes.STRING(10),
    references: {
      model: 'Staff',
      key: 'staff_id',
    },
    allowNull: true,
  },
  incident_time: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  incident_status: {
    type: DataTypes.ENUM('success', 'proceeding', 'fail'),
    allowNull: false,
    defaultValue: 'proceeding',
  },
  incident_cost: {
    type: DataTypes.NUMERIC(10, 2),
    defaultValue: 0.00,
  },
  description: {
    type: DataTypes.STRING(1000),
    allowNull: true,
  },
}, {
  tableName: 'Incident',
  timestamps: false, // Assuming no timestamps are needed
});

// Define associations
Incident.belongsTo(Hotel, { foreignKey: 'hotel_id' });
Incident.belongsTo(Staff, { foreignKey: 'reporter' });
Incident.belongsTo(Staff, { foreignKey: 'handler_id' });

// Trigger: Ensure that handler matches hotel and department
Incident.addHook('beforeCreate', async (incident, options) => {
  const handler = incident.handler_id;
  const hotel = incident.hotel_id;

  const handlerValid = await sequelize.query(`
    SELECT 1
    FROM "Staff"
    JOIN "Department" ON "Department".department_id = "Staff".department_id
    JOIN "JobAssignment" ON "JobAssignment".job_id = "Staff".job_id
    WHERE "Staff".staff_id = :handler AND "Department".hotel_id = :hotel
  `, {
    replacements: { handler, hotel },
    type: sequelize.QueryTypes.SELECT,
  });

  if (!handlerValid.length) {
    throw new Error('Handler and hotel do not match.');
  }
});

module.exports = Incident;
