const express = require('express');
const reservationInfoController = require('../controllers/reservationInfoController');

const router = express.Router();

router.post('/reservationInfos', reservationInfoController.createReservationInfo);
router.get('/reservationInfos', reservationInfoController.getReservationInfos);
router.put('/reservationInfos/:reservation_id/:guest_id', reservationInfoController.updateReservationInfo);
router.delete('/reservationInfos/:reservation_id/:guest_id', reservationInfoController.deleteReservationInfo);

module.exports = router;