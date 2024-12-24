import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Guest = () => {
    const [guests, setGuests] = useState([]);
    const [formData, setFormData] = useState({ guest_id: '', guest_name: '', gender: '' });
    const [formTitle, setFormTitle] = useState('Add New Guest');

    const API_URL = 'http://localhost:5000/api';

    // Fetch all hotels
    const fetchGuests = async () => {
        try {
            const response = await axios.get(`${API_URL}/guests`);
            setGuests(response.data);
        } catch (error) {
            console.error('Error fetching guests:', error);
        }
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.guest_id) {
                await axios.put(`${API_URL}/guests/${formData.guest_id}`, {
                    guest_name: formData.guest_name,
                    gender: formData.gender,
                   
                });
            } else {
                await axios.post(`${API_URL}/guests`, {
                    guest_id: formData.guest_id,
                    guest_name: formData.guest_name,
                    gender: formData.gender,
                    
                });
            }
            resetForm();
            fetchGuests();
        } catch (error) {
            console.error('Error saving guest:', error);
        }
    };

    // Handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Edit hotel
    const editGuest = (guest_id, guest_name, gender) => {
        setFormData({ guest_id, guest_name, gender });
        setFormTitle('Edit Guest');
    };

    // Delete hotel
    const deleteGuest = async (guest_id) => {
        try {
            await axios.delete(`${API_URL}/guests/${guest_id}`);
            fetchGuests();
        } catch (error) {
            console.error('Error deleting guest:', error);
        }
    };

    // Reset form
    const resetForm = () => {
        setFormData({ guest_id: '', guest_name: '', gender: '' });
        setFormTitle('Add New Guest');
    };

    useEffect(() => {
        fetchGuests();
    }, []);

    

    return (
        <div className="container mt-5">
            

            {/* Hotel List Section */}
            <section id="guest-list">
                <h2>Guest</h2>
                <table className="table table-bordered">
                    <thead>
                        <tr >
                            <th>ID</th>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Actions</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {guests.map((guest) => (
                            <tr key={guest.guest_id}>
                                <td>{guest.guest_id}</td>
                                <td>{guest.guest_name}</td>
                                <td>{guest.gender}</td>
                                <td>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        onClick={() => editGuest(guest.guest_id,guest.guest_name ,guest.gende )}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteGuest(guest.guest_id)}
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
                        <label htmlFor="guest-id" className="form-label">Guest ID</label>
                        <input
                            type="text"
                            className="form-control"
                            id="guest-id"
                            name="guest_id"
                            value={formData.guest_id}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="guest-name" className="form-label">Guest Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="guest-name"
                            name="guest_name"
                            value={formData.guest_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="gender" className="form-label">Gender</label>
                        <input
                            type="text"
                            className="form-control"
                            id="gender"
                            name="gender"
                            value={formData.gender}
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

export default Guest;