const Room = require('../models/Room');

// Get all rooms
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.findAll();
    res.status(200).json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get all rooms by hotel_id
exports.getRoomsByHotelId = async (req, res) => {
  try {
    const { hotelId } = req.params;
    const rooms = await Room.findAll({
      where: { hotel_id: hotelId }, // Filter rooms by hotel_id
    });

    if (rooms.length > 0) {
      res.status(200).json(rooms);
    } else {
      res.status(404).json({ message: 'No rooms found for this hotel' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


// Get a single room by ID
exports.getRoomById = async (req, res) => {
  try {
    const { roomId, hotelId } = req.params;
    const room = await Room.findOne({
      where: { room_id: roomId, hotel_id: hotelId },
    });

    if (room) {
      res.status(200).json(room);
    } else {
      res.status(404).json({ message: 'Room not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Create a new room
exports.createRoom = async (req, res) => {
  try {
    const { room_id, hotel_id, rent, room_status, room_category } = req.body;

    const newRoom = await Room.create({
      room_id,
      hotel_id,
      rent,
      room_status,
      room_category,
    });

    res.status(201).json(newRoom);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update an existing room
exports.updateRoom = async (req, res) => {
  try {
    const { roomId, hotelId } = req.params;
    const { rent, room_status, room_category } = req.body;

    const room = await Room.findOne({
      where: { room_id: roomId, hotel_id: hotelId },
    });

    if (room) {
      room.rent = rent || room.rent;
      room.room_status = room_status || room.room_status;
      room.room_category = room_category || room.room_category;

      await room.save();
      res.status(200).json(room);
    } else {
      res.status(404).json({ message: 'Room not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete a room
exports.deleteRoom = async (req, res) => {
  try {
    const { roomId, hotelId } = req.params;

    const room = await Room.findOne({
      where: { room_id: roomId, hotel_id: hotelId },
    });

    if (room) {
      await room.destroy();
      res.status(204).json({ message: 'Room deleted successfully' });
    } else {
      res.status(404).json({ message: 'Room not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
