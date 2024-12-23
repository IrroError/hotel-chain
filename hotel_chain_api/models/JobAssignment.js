const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assuming you have a db config file
const Department = require('./Department'); // Importing Department model

// Define the 'jobs' ENUM type
const JobNameEnum = ['cook', 'hygienist', 'receptionist', 'TBD'];

const JobAssignment = sequelize.define('JobAssignment', {
  job_id: {
    type: DataTypes.STRING(10),
    primaryKey: true,
    allowNull: false,
  },
  job_name: {
    type: DataTypes.ENUM(...JobNameEnum),
    allowNull: false,
    defaultValue: 'TBD', // Default value as 'TBD'
  },
  salary: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true, // Salary can be null
  },
  department_id: {
    type: DataTypes.STRING(10),
    references: {
      model: Department, // Foreign key relation to the Department model
      key: 'department_id',
    },
    allowNull: true, // department_id can be null if no department is assigned
  },
  job_description: {
    type: DataTypes.STRING(1000),
    allowNull: true, // job_description can be null if not provided
  },
}, {
  // Adding tableName for clarity (if you want to specify the name of the table explicitly)
  tableName: 'JobAssignment',
  timestamps: false, // Assuming you don't need timestamps for this model
});

// Define associations if necessary
JobAssignment.belongsTo(Department, { foreignKey: 'department_id' });

module.exports = JobAssignment;
