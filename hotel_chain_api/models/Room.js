const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Your database configuration
const Hotel = require('./Hotel'); // Import the Hotel model to establish the relationship

// Define the Room model
const Room = sequelize.define('Room', {
  room_id: {
    type: DataTypes.STRING(10),
    primaryKey: true,
    allowNull: false,
  },
  hotel_id: {
    type: DataTypes.STRING(10),
    references: {
      model: Hotel, // Referencing the Hotel model
      key: 'hotel_id', // The foreign key should refer to hotel_id in the Hotel model
    },
    allowNull: false,
    primaryKey: true, // Part of the composite primary key
  },
  rent: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false, // Rent is required for the room
  },
  room_status: {
    type: DataTypes.ENUM('available', 'unavailable', 'reserved'),
    allowNull: false,
    defaultValue: 'available',
  },
  room_category: {
    type: DataTypes.ENUM('VIP', 'regular'),
    allowNull: false,
    defaultValue: 'regular',
  },
}, {
  // Adding timestamps for easier tracking of creation and updates
  timestamps: true,
  tableName: 'Rooms', // Make sure the table name matches the one in the database
});

// Set up associations (foreign key relationship)
Room.belongsTo(Hotel, { foreignKey: 'hotel_id', targetKey: 'hotel_id' });

module.exports = Room;
