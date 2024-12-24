const Shift = require('../models/Shift');

// Create a new shift
exports.createShift = async (req, res) => {
  try {
    const shift = await Shift.create(req.body);
    res.status(201).send(shift);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Read all shifts
exports.getShifts = async (req, res) => {
  try {
    const shifts = await Shift.findAll();
    res.status(200).send(shifts);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a shift
exports.updateShift = async (req, res) => {
  try {
    const shift = await Shift.findByPk(req.params.id);
    if (!shift) {
      return res.status(404).send();
    }
    await shift.update(req.body);
    res.send(shift);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a shift
exports.deleteShift = async (req, res) => {
  try {
    const shift = await Shift.findByPk(req.params.id);
    if (!shift) {
      return res.status(404).send();
    }
    await shift.destroy();
    res.send(shift);
  } catch (error) {
    res.status(500).send(error);
  }
};