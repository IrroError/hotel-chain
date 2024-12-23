const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assuming you have a db config file
const JobAssignment = require('./JobAssignment'); // Importing JobAssignment model

const Staff = sequelize.define('Staff', {
  staff_id: {
    type: DataTypes.STRING(10),
    primaryKey: true,
    allowNull: false,
  },
  supervisor_id: {
    type: DataTypes.STRING(10),
    references: {
      model: Staff, // Self-referencing Staff model
      key: 'staff_id',
    },
    allowNull: true, // Supervisor can be null if the staff doesn't have a supervisor
    onDelete: 'SET NULL', // When supervisor is deleted, set this field to NULL
  },
  staff_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  job_id: {
    type: DataTypes.STRING(10),
    references: {
      model: JobAssignment, // Foreign key to JobAssignment model
      key: 'job_id',
    },
    allowNull: true, // job_id can be null if no job is assigned
  },
}, {
  // Adding tableName for clarity
  tableName: 'Staff',
  timestamps: false, // Assuming no timestamps are needed
});

// Define associations
Staff.belongsTo(Staff, { foreignKey: 'supervisor_id', as: 'supervisor' });
Staff.belongsTo(JobAssignment, { foreignKey: 'job_id' });

module.exports = Staff;
