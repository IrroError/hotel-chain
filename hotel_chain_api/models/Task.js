const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assuming you have a db config file
const JobAssignment = require('./JobAssignment'); // Assuming you have the JobAssignment model file

const Task = sequelize.define('Task', {
  task_id: {
    type: DataTypes.STRING(15),
    primaryKey: true,
    allowNull: false,
  },
  task_name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  job_id: {
    type: DataTypes.STRING(10),
    references: {
      model: 'JobAssignment',
      key: 'job_id',
    },
    allowNull: false,
  },
  task_description: {
    type: DataTypes.STRING(1000),
    allowNull: true, // Task description is optional
  },
}, {
  // Adding tableName for clarity
  tableName: 'Task',
  timestamps: false, // Assuming no timestamps are needed
});

// Define associations
Task.belongsTo(JobAssignment, { foreignKey: 'job_id' });

module.exports = Task;
