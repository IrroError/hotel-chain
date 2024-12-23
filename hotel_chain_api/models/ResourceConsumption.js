const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assuming you have a db config file
const Resource = require('./Resource'); // Importing Resource model
const Department = require('./Department'); // Importing Department model

const ResourceConsumption = sequelize.define('ResourceConsumption', {
  consumption_id: {
    type: DataTypes.STRING(15),
    primaryKey: true,
    allowNull: false,
  },
  resource_id: {
    type: DataTypes.STRING(10),
    references: {
      model: Resource, // Foreign key to Resource model
      key: 'resource_id',
    },
    allowNull: false, // A consumption record must be associated with a resource
  },
  department_id: {
    type: DataTypes.STRING(10),
    references: {
      model: Department, // Foreign key to Department model
      key: 'department_id',
    },
    allowNull: false, // A consumption record must be associated with a department
  },
  consumption_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0, // Ensure consumption_quantity is greater than or equal to 0
    },
  },
}, {
  // Adding tableName for clarity
  tableName: 'ResourceConsumption',
  timestamps: false, // Assuming no timestamps are needed
});

// Define associations
ResourceConsumption.belongsTo(Resource, { foreignKey: 'resource_id' });
ResourceConsumption.belongsTo(Department, { foreignKey: 'department_id' });

// Trigger to validate and update consumption quantity
const validateConsumptionQuantity = async (newConsumption) => {
  // Fetch the resource details
  const resource = await Resource.findOne({ where: { resource_id: newConsumption.resource_id } });

  // Check if consumption quantity exceeds resource quantity
  if (newConsumption.consumption_quantity > resource.resource_quantity) {
    throw new Error('Consumption quantity exceeds available resource quantity.');
  }

  // Update the resource quantity in the Resource table
  resource.resource_quantity -= newConsumption.consumption_quantity;
  await resource.save();

  return newConsumption;
};

// Hook to validate before insert or update
ResourceConsumption.beforeCreate(validateConsumptionQuantity);
ResourceConsumption.beforeUpdate(validateConsumptionQuantity);

module.exports = ResourceConsumption;
