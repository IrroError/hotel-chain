const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assuming you have a db config file
const Reservation = require('./Reservation'); // Importing Reservation model
const Guest = require('./Guest'); // Importing Guest model

const ReservationInfo = sequelize.define('ReservationInfo', {
  reservation_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Reservation,
      key: 'reservation_id',
    },
    allowNull: false, // Assuming reservation_id cannot be null
  },
  guest_id: {
    type: DataTypes.STRING(12),
    references: {
      model: Guest,
      key: 'guest_id',
    },
    allowNull: false, // Assuming guest_id cannot be null
  },
}, {
  // Adding tableName for clarity (if you want to specify the name of the table explicitly)
  tableName: 'ReservationInfo',
  timestamps: false, // Assuming you don't need timestamps for this model
});

// Define associations if necessary
ReservationInfo.belongsTo(Reservation, { foreignKey: 'reservation_id' });
ReservationInfo.belongsTo(Guest, { foreignKey: 'guest_id' });

module.exports = ReservationInfo;
