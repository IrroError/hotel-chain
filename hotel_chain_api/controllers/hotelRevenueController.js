const HotelRevenue = require('../models/hotelRevenue');

// Create a new hotel revenue record
exports.createHotelRevenue = async (req, res) => {
  try {
    const hotelRevenue = await HotelRevenue.create(req.body);
    res.status(201).send(hotelRevenue);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Read all hotel revenue records
exports.getHotelRevenues = async (req, res) => {
  try {
    const hotelRevenues = await HotelRevenue.findAll();
    res.status(200).send(hotelRevenues);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a hotel revenue record
exports.updateHotelRevenue = async (req, res) => {
  try {
    const hotelRevenue = await HotelRevenue.findByPk(req.params.id);
    if (!hotelRevenue) {
      return res.status(404).send();
    }
    await hotelRevenue.update(req.body);
    res.send(hotelRevenue);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a hotel revenue record
exports.deleteHotelRevenue = async (req, res) => {
  try {
    const hotelRevenue = await HotelRevenue.findByPk(req.params.id);
    if (!hotelRevenue) {
      return res.status(404).send();
    }
    await hotelRevenue.destroy();
    res.send(hotelRevenue);
  } catch (error) {
    res.status(500).send(error);
  }
};