const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assuming you have a db config file
const ShiftRegistration = require('./ShiftRegistration'); // Assuming you have the ShiftRegistration model
const Task = require('./Task'); // Assuming you have the Task model

const TaskAssignment = sequelize.define('TaskAssignment', {
  task_assignment_id: {
    type: DataTypes.STRING(15),
    primaryKey: true,
    allowNull: false,
  },
  shift_registration_id: {
    type: DataTypes.STRING(15),
    references: {
      model: 'ShiftRegistration',
      key: 'shift_registration_id',
    },
    allowNull: false,
  },
  task_id: {
    type: DataTypes.STRING(15),
    references: {
      model: 'Task',
      key: 'task_id',
    },
    allowNull: false,
  },
}, {
  // Adding tableName for clarity
  tableName: 'TaskAssignment',
  timestamps: false, // Assuming no timestamps are needed
});

// Define associations
TaskAssignment.belongsTo(ShiftRegistration, { foreignKey: 'shift_registration_id' });
TaskAssignment.belongsTo(Task, { foreignKey: 'task_id' });

module.exports = TaskAssignment;
