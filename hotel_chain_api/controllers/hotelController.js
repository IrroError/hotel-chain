const Hotel = require('../models/Hotel');

// Get all hotels
exports.getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.findAll();
    res.status(200).json(hotels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get a single hotel by ID
exports.getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findByPk(req.params.hotelId);
    if (hotel) {
      res.status(200).json(hotel);
    } else {
      res.status(404).json({ message: 'Hotel not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Create a new hotel
exports.createHotel = async (req, res) => {
  try {
    const { hotel_id, hotel_name, hotel_location, rating } = req.body;

    const newHotel = await Hotel.create({
      hotel_id,
      hotel_name,
      hotel_location,
      rating,
    });

    res.status(201).json(newHotel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update an existing hotel
exports.updateHotel = async (req, res) => {
  try {
    const { hotel_id, hotel_name, hotel_location, rating } = req.body;

    const hotel = await Hotel.findByPk(req.params.hotelId);

    if (hotel) {
      hotel.hotel_name = hotel_name || hotel.hotel_name;
      hotel.hotel_location = hotel_location || hotel.hotel_location;
      hotel.rating = rating || hotel.rating;

      await hotel.save();
      res.status(200).json(hotel);
    } else {
      res.status(404).json({ message: 'Hotel not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete a hotel
exports.deleteHotel = async (req, res) => {
  try {
    const hotel = await Hotel.findByPk(req.params.hotelId);

    if (hotel) {
      await hotel.destroy();
      res.status(204).json({ message: 'Hotel deleted successfully' });
    } else {
      res.status(404).json({ message: 'Hotel not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
