const Guest = require('../models/Guest');

exports.getAllGuests = async (req, res) => {
    try {
        const guests = await Guest.findAll();
        res.json(guests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getGuestById = async (req, res) => {
    try {
        const guest = await Guest.findByPk(req.params.id);
        if (guest) {
            res.json(guest);
        } else {
            res.status(404).json({ message: 'Guest not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createGuest = async (req, res) => {
    try {
        const newGuest = await Guest.create(req.body);
        res.status(201).json(newGuest);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateGuest = async (req, res) => {
    try {
        const [updated] = await Guest.update(req.body, {
            where: { guest_id: req.params.id }
        });
        if (updated) {
            const updatedGuest = await Guest.findByPk(req.params.id);
            res.json(updatedGuest);
        } else {
            res.status(404).json({ message: 'Guest not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteGuest = async (req, res) => {
    try {
        const deleted = await Guest.destroy({
            where: { guest_id: req.params.id }
        });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ message: 'Guest not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};