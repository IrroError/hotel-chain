const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

// Define routes for Room CRUD operations
router.get('/rooms', roomController.getAllRooms); // Get all rooms
router.get('/room/:roomId/hotel/:hotelId', roomController.getRoomById); // Get room by ID
router.get('/rooms/hotel/:hotelId', roomController.getRoomsByHotelId); // Get all rooms by hotel_id
router.post('/room', roomController.createRoom); // Create a new room
router.put('/room/:roomId/hotel/:hotelId', roomController.updateRoom); // Update room
router.delete('/room/:roomId/hotel/:hotelId', roomController.deleteRoom); // Delete room

module.exports = router;
