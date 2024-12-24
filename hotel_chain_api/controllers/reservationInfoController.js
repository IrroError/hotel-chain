const ReservationInfo = require('../models/reservationInfo');

// Create a new reservation info
exports.createReservationInfo = async (req, res) => {
  try {
    const reservationInfo = await ReservationInfo.create(req.body);
    res.status(201).send(reservationInfo);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Read all reservation infos
exports.getReservationInfos = async (req, res) => {
  try {
    const reservationInfos = await ReservationInfo.findAll();
    res.status(200).send(reservationInfos);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a reservation info
exports.updateReservationInfo = async (req, res) => {
  try {
    const reservationInfo = await ReservationInfo.findOne({
      where: {
        reservation_id: req.params.reservation_id,
        guest_id: req.params.guest_id,
      },
    });
    if (!reservationInfo) {
      return res.status(404).send();
    }
    await reservationInfo.update(req.body);
    res.send(reservationInfo);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a reservation info
exports.deleteReservationInfo = async (req, res) => {
  try {
    const reservationInfo = await ReservationInfo.findOne({
      where: {
        reservation_id: req.params.reservation_id,
        guest_id: req.params.guest_id,
      },
    });
    if (!reservationInfo) {
      return res.status(404).send();
    }
    await reservationInfo.destroy();
    res.send(reservationInfo);
  } catch (error) {
    res.status(500).send(error);
  }
};