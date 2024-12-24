const express = require('express');
const reservationController = require('../controllers/reservationController');

const router = express.Router();

router.post('/reservations', reservationController.createReservation);
router.get('/reservations', reservationController.getReservations);
router.put('/reservations/:id', reservationController.updateReservation);
router.delete('/reservations/:id', reservationController.deleteReservation);

module.exports = router;