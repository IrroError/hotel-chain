const express = require('express');
const shiftController = require('../controllers/shiftController');

const router = express.Router();

router.post('/shifts', shiftController.createShift);
router.get('/shifts', shiftController.getShifts);
router.put('/shifts/:id', shiftController.updateShift);
router.delete('/shifts/:id', shiftController.deleteShift);

module.exports = router;