const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');

router.get('/staff', staffController.getAllStaff);
router.get('/staff/:id', staffController.getStaffById);
router.post('/staff', staffController.createStaff);
router.put('/staff/:id', staffController.updateStaff);
router.delete('/staff/:id', staffController.deleteStaff);

module.exports = router;