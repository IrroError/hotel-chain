const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assuming you have a db config file
const Resource = require('./Resource'); // Importing Resource model
const Department = require('./Department'); // Importing Department model

const ResourceRestock = sequelize.define('ResourceRestock', {
  restock_id: {
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
    allowNull: false, // A restock record must be associated with a resource
  },
  department_id: {
    type: DataTypes.STRING(10),
    references: {
      model: Department, // Foreign key to Department model
      key: 'department_id',
    },
    allowNull: false, // A restock record must be associated with a department
  },
  restock_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0, // Ensure restock_quantity is greater than or equal to 0
    },
  },
}, {
  // Adding tableName for clarity
  tableName: 'ResourceRestock',
  timestamps: false, // Assuming no timestamps are needed
});

// Define associations
ResourceRestock.belongsTo(Resource, { foreignKey: 'resource_id' });
ResourceRestock.belongsTo(Department, { foreignKey: 'department_id' });

// Hook to update resource quantity after restock
const updateResourceQuantityOnRestock = async (newRestock) => {
  // Fetch the resource details
  const resource = await Resource.findOne({ where: { resource_id: newRestock.resource_id } });

  // Update the resource quantity in the Resource table
  resource.resource_quantity += newRestock.restock_quantity;
  await resource.save();

  return newRestock;
};

// After creating a new restock record, update the resource quantity
ResourceRestock.afterCreate(updateResourceQuantityOnRestock);

module.exports = ResourceRestock;
