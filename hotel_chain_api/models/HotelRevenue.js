const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assuming you have a db config file
const Hotel = require('./Hotel'); // Assuming you have the Hotel model
const ServiceRequest = require('./ServiceRequest'); // Assuming you have the ServiceRequest model
const Incident = require('./Incident'); // Assuming you have the Incident model
const JobAssignment = require('./JobAssignment'); // Assuming you have the JobAssignment model
const Facility = require('./Facility'); // Assuming you have the Facility model
const Reservation = require('./Reservation'); // Assuming you have the Reservation model

// Define the HotelRevenue model
const HotelRevenue = sequelize.define('HotelRevenue', {
  revenue_id: {
    type: DataTypes.STRING(15),
    primaryKey: true,
  },
  hotel_id: {
    type: DataTypes.STRING(10),
    references: {
      model: 'Hotel',
      key: 'hotel_id',
    },
    allowNull: false,
  },
  revenue_month: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  reservation_income: {
    type: DataTypes.NUMERIC(15, 2),
    defaultValue: 0.00,
  },
  service_income: {
    type: DataTypes.NUMERIC(15, 2),
    defaultValue: 0.00,
  },
  total_salary: {
    type: DataTypes.NUMERIC(15, 2),
    defaultValue: 0.00,
  },
  total_maintenance_cost: {
    type: DataTypes.NUMERIC(15, 2),
    defaultValue: 0.00,
  },
  total_incident_cost: {
    type: DataTypes.NUMERIC(15, 2),
    defaultValue: 0.00,
  },
}, {
  tableName: 'HotelRevenue',
  timestamps: false, // Assuming no timestamps are needed
});

// Define associations
HotelRevenue.belongsTo(Hotel, { foreignKey: 'hotel_id' });

// Trigger Functions Simulation with Sequelize Hooks

// Update incident cost on insert/update/delete
HotelRevenue.addHook('afterUpdate', async (hotelRevenue, options) => {
  const hotelId = hotelRevenue.hotel_id;
  const revenueMonth = hotelRevenue.revenue_month;

  // Update total incident cost
  const totalIncidentCost = await sequelize.query(`
    SELECT COALESCE(SUM(incident_cost), 0)
    FROM "Incident"
    WHERE hotel_id = :hotelId AND DATE_TRUNC('month', incident_time) = DATE_TRUNC('month', :revenueMonth)
  `, {
    replacements: { hotelId, revenueMonth },
    type: sequelize.QueryTypes.SELECT,
  });

  hotelRevenue.total_incident_cost = totalIncidentCost[0].sum;
  await hotelRevenue.save();
});

// Update service income on insert/update/delete
HotelRevenue.addHook('afterUpdate', async (hotelRevenue, options) => {
  const hotelId = hotelRevenue.hotel_id;
  const revenueMonth = hotelRevenue.revenue_month;

  // Update service income
  const totalServiceIncome = await sequelize.query(`
    SELECT COALESCE(SUM(service_cost), 0)
    FROM "ServiceRequest"
    JOIN "Service" ON "ServiceRequest".service_id = "Service".service_id
    WHERE DATE_TRUNC('month', request_timestamp) = DATE_TRUNC('month', :revenueMonth)
    AND "Service".department_id IN (
      SELECT department_id
      FROM "Department"
      WHERE hotel_id = :hotelId
    )
  `, {
    replacements: { hotelId, revenueMonth },
    type: sequelize.QueryTypes.SELECT,
  });

  hotelRevenue.service_income = totalServiceIncome[0].sum;
  await hotelRevenue.save();
});

// Update salary on insert/update/delete
HotelRevenue.addHook('afterUpdate', async (hotelRevenue, options) => {
  const hotelId = hotelRevenue.hotel_id;

  // Update total salary
  const totalSalary = await sequelize.query(`
    SELECT COALESCE(SUM(salary), 0)
    FROM "JobAssignment"
    JOIN "Staff" ON "Staff".job_id = "JobAssignment".job_id
    JOIN "Department" ON "JobAssignment".department_id = "Department".department_id
    WHERE "Department".hotel_id = :hotelId
  `, {
    replacements: { hotelId },
    type: sequelize.QueryTypes.SELECT,
  });

  hotelRevenue.total_salary = totalSalary[0].sum;
  await hotelRevenue.save();
});

// Update maintenance cost on insert/update/delete
HotelRevenue.addHook('afterUpdate', async (hotelRevenue, options) => {
  const hotelId = hotelRevenue.hotel_id;

  // Update total maintenance cost
  const totalMaintenanceCost = await sequelize.query(`
    SELECT COALESCE(SUM(maintenance_cost), 0)
    FROM "Facility"
    WHERE hotel_id = :hotelId
  `, {
    replacements: { hotelId },
    type: sequelize.QueryTypes.SELECT,
  });

  hotelRevenue.total_maintenance_cost = totalMaintenanceCost[0].sum;
  await hotelRevenue.save();
});

// Update reservation income on insert/update/delete
HotelRevenue.addHook('afterUpdate', async (hotelRevenue, options) => {
  const hotelId = hotelRevenue.hotel_id;
  const revenueMonth = hotelRevenue.revenue_month;

  // Update reservation income
  const totalReservationIncome = await sequelize.query(`
    SELECT COALESCE(SUM(reservation_cost), 0)
    FROM "Reservation"
    WHERE hotel_id = :hotelId AND DATE_TRUNC('month', reservation_time) = DATE_TRUNC('month', :revenueMonth)
  `, {
    replacements: { hotelId, revenueMonth },
    type: sequelize.QueryTypes.SELECT,
  });

  hotelRevenue.reservation_income = totalReservationIncome[0].sum;
  await hotelRevenue.save();
});

module.exports = HotelRevenue;
