const express = require('express');
const hotelRevenueController = require('../controllers/hotelRevenueController');

const router = express.Router();

router.post('/hotelRevenues', hotelRevenueController.createHotelRevenue);
router.get('/hotelRevenues', hotelRevenueController.getHotelRevenues);
router.put('/hotelRevenues/:id', hotelRevenueController.updateHotelRevenue);
router.delete('/hotelRevenues/:id', hotelRevenueController.deleteHotelRevenue);

module.exports = router;