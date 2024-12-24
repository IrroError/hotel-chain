const Reservation = require('../models/reservation');

// Create a new reservation
exports.createReservation = async (req, res) => {
  try {
    const reservation = await Reservation.create(req.body);
    res.status(201).send(reservation);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Read all reservations
exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll();
    res.status(200).send(reservations);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a reservation
exports.updateReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id);
    if (!reservation) {
      return res.status(404).send();
    }
    await reservation.update(req.body);
    res.send(reservation);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a reservation
exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id);
    if (!reservation) {
      return res.status(404).send();
    }
    await reservation.destroy();
    res.send(reservation);
  } catch (error) {
    res.status(500).send(error);
  }
};