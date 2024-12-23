const express = require('express');
const router = express.Router();
const guestController = require('../controllers/guestController');

router.get('/guests', guestController.getAllGuests);
router.get('/guests/:id', guestController.getGuestById);
router.post('/guests', guestController.createGuest);
router.put('/guests/:id', guestController.updateGuest);
router.delete('/guests/:id', guestController.deleteGuest);

module.exports = router;