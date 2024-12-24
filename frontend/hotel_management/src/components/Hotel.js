import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Hotel = () => {
    const [hotels, setHotels] = useState([]);
    const [formData, setFormData] = useState({ hotel_id: '', hotel_name: '', hotel_location: '',rating: '' });
    const [formTitle, setFormTitle] = useState('Add New Hotel');

    const API_URL = 'http://localhost:5000/api';

    // Fetch all hotels
    const fetchHotels = async () => {
        try {
            const response = await axios.get(`${API_URL}/hotels`);
            setHotels(response.data);
        } catch (error) {
            console.error('Error fetching hotels:', error);
        }
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.hotel_id) {
                await axios.put(`${API_URL}/hotel/${formData.hotel_id}`, {
                    hotel_name: formData.hotel_name,
                    hotel_location: formData.hotel_location,
                    rating:formData.rating,
                });
            } else {
                await axios.post(`${API_URL}/hotel`, {
                    hotel_id: formData.hotel_id,
                    hotel_name: formData.hotel_name,
                    hotel_location: formData.hotel_location,
                    rating:formData.rating,
                });
            }
            resetForm();
            fetchHotels();
        } catch (error) {
            console.error('Error saving hotel:', error);
        }
    };

    // Handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Edit hotel
    const editHotel = (hotel_id, hotel_name, hotel_location,rating) => {
        setFormData({ hotel_id, hotel_name, hotel_location,rating });
        setFormTitle('Edit Hotel');
    };

    // Delete hotel
    const deleteHotel = async (hotel_id) => {
        try {
            await axios.delete(`${API_URL}/hotel/${hotel_id}`);
            fetchHotels();
        } catch (error) {
            console.error('Error deleting hotel:', error);
        }
    };

    // Reset form
    const resetForm = () => {
        setFormData({ hotel_id: '', hotel_name: '', hotel_location: '', rating: '' });
        setFormTitle('Add New Hotel');
    };

    useEffect(() => {
        fetchHotels();
    }, []);

    useEffect(() => {
      console.log(hotels); // Log the hotels to check the data structure
  }, [hotels]);

    return (
        <div className="container mt-5">
            <h1 className="text-center">Hotel Management</h1>

            {/* Hotel List Section */}
            <section id="hotel-list">
                <h2>Hotels</h2>
                <table className="table table-bordered">
                    <thead>
                        <tr >
                            <th>ID</th>
                            <th>Name</th>
                            <th>Location</th>
                            <th>Actions</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hotels.map((hotel) => (
                            <tr key={hotel.hotel_id}>
                                <td>{hotel.hotel_id}</td>
                                <td>{hotel.hotel_name}</td>
                                <td>{hotel.hotel_location}</td>
                                <td>{hotel.rating}</td>
                                <td>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => editHotel(hotel.hotel_id, hotel.hotel_name, hotel.hotel_location,hotel.rating)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteHotel(hotel.hotel_id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>

            {/* Add/Edit Hotel Form */}
            <section id="hotel-form">
                <h2>{formTitle}</h2>
                <form onSubmit={handleSubmit}>
                <div className="mb-3">
                        <label htmlFor="hotel-id" className="form-label">Hotel ID</label>
                        <input
                            type="text"
                            className="form-control"
                            id="hotel-id"
                            name="hotel_id"
                            value={formData.hotel_id}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="hotel-name" className="form-label">Hotel Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="hotel-name"
                            name="hotel_name"
                            value={formData.hotel_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="hotel-location" className="form-label">Location</label>
                        <input
                            type="text"
                            className="form-control"
                            id="hotel-location"
                            name="hotel_location"
                            value={formData.hotel_location}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="rating" className="form-label">Rating</label>
                        <input
                            type="text"
                            className="form-control"
                            id="rating"
                            name="rating"
                            value={formData.rating}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Save</button>
                </form>
            </section>
        </div>
    );
};

export default Hotel;
