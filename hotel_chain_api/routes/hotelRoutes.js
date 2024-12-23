const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');

// Define routes for Hotel CRUD operations
router.get('/hotels', hotelController.getAllHotels);
router.get('/hotel/:hotelId', hotelController.getHotelById);
router.post('/hotel', hotelController.createHotel);
router.put('/hotel/:hotelId', hotelController.updateHotel);
router.delete('/hotel/:hotelId', hotelController.deleteHotel);

module.exports = router;
