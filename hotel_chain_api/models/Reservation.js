const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Your database configuration
const Guest = require('./Guest'); // Assuming you have the Guest model
const Room = require('./Room');   // Assuming you have the Room model

// Define the Reservation model
const Reservation = sequelize.define('Reservation', {
  reservation_id: {
    type: DataTypes.STRING(10),
    primaryKey: true,
    allowNull: false,
  },
  room_id: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  hotel_id: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  guest_id: {
    type: DataTypes.STRING(12),
    allowNull: false,
    references: {
      model: 'Guest', // Refers to the Guest model
      key: 'guest_id', // Guest primary key
    },
  },
  reservation_time: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // Default to the current date
  },
  reservation_status: {
    type: DataTypes.ENUM('pending', 'canceled', 'reserved'),
    allowNull: false,
    defaultValue: 'pending',
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 29, // Duration should be between 1 and 29 days
    },
  },
  reservation_cost: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: true,
  },
}, {
  // Adding timestamps for easier tracking of creation and updates
  timestamps: false,
  tableName: 'Reservation', // Make sure the table name matches the one in the database
});

// Association: A reservation belongs to one room and one guest
Reservation.belongsTo(Room, {
  foreignKey: {
    name: 'room_id',
    allowNull: false,
  },
  targetKey: 'room_id',
  scope: {
    hotel_id: sequelize.col('Reservation.hotel_id'),
  },
});

Reservation.belongsTo(Guest, {
  foreignKey: {
    name: 'guest_id',
    allowNull: false,
  },
});

// Define triggers or hooks (like calculate reservation cost) inside Sequelize
Reservation.addHook('beforeCreate', async (reservation, options) => {
  // Retrieve room rent based on room_id and hotel_id
  const room = await Room.findOne({
    where: {
      room_id: reservation.room_id,
      hotel_id: reservation.hotel_id,
    },
  });

  if (room) {
    // Calculate reservation cost based on room rent and duration
    reservation.reservation_cost = room.rent * reservation.duration;
  }
});

module.exports = Reservation;
