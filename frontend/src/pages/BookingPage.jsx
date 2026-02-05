import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

const BookingPage = () => {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userEmail = localStorage.getItem('userEmail');

    const [formData, setFormData] = useState({
        serviceType: 'Full Body Foam Wash',
        serviceMode: 'Garage Service',
        date: '',
        timeSlot: '09:00 AM - 11:00 AM',
        location: '',
        carName: '',
        carModel: ''
    });

    useEffect(() => {
        if (!isLoggedIn) navigate('/login');

        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/auth/profile?email=${userEmail}`);
                setFormData(prev => ({
                    ...prev,
                    carName: response.data.carBrand || '',
                    carModel: response.data.carModel || '',
                    location: response.data.locationArea || ''
                }));
            } catch (err) { console.error("Auto-fill error:", err); }
        };
        if (userEmail) fetchUserDetails();
    }, [isLoggedIn, navigate, userEmail]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/bookings/book', { userEmail, ...formData });
            alert("Booking Confirmed! 🚗✨");
            navigate('/dashboard');
        } catch (err) { alert("Booking failed. Please try again."); }
    };

    return (
        <div className="home-wrapper" style={{ minHeight: '100vh', paddingBottom: '40px' }}>
            <nav className="nav-sticky">
                <div className="nav-content">
                    <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
                        <h2 style={{ color: 'white' }}>Car<span>Care</span></h2>
                    </Link>
                    <Link to="/dashboard" className="outline-btn" style={{ padding: '6px 14px', fontSize: '0.85rem' }}>
                        Back to Dashboard
                    </Link>
                </div>
            </nav>

            {/* Reduced Header Size */}
            <header style={{ textAlign: 'center', padding: '40px 20px 20px' }}>
                <h1 className="text-gradient" style={{ fontSize: '2.2rem', marginBottom: '10px' }}>Confirm Booking</h1>
                <p style={{ color: 'var(--pure-greys-100)', fontSize: '0.9rem' }}>Fast-track your premium car care.</p>
            </header>

            {/* Slimmer Form Container */}
            <div style={{ maxWidth: '550px', margin: '0 auto', padding: '0 20px' }}>
                <div className="service-card" style={{ padding: '30px', cursor: 'default' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>

                        {/* Compact Vehicle Info */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <div className="info-box">
                                <label style={{ fontSize: '0.65rem' }}>Car Brand</label>
                                <input type="text" className="auth-input" style={{ marginBottom: 0 }} value={formData.carName} onChange={(e) => setFormData({ ...formData, carName: e.target.value })} required />
                            </div>
                            <div className="info-box">
                                <label style={{ fontSize: '0.65rem' }}>Car Model</label>
                                <input type="text" className="auth-input" style={{ marginBottom: 0 }} value={formData.carModel} onChange={(e) => setFormData({ ...formData, carModel: e.target.value })} required />
                            </div>
                        </div>

                        {/* Service Preferences - Slimmer Selects */}
                        <div className="info-box">
                            <label style={{ fontSize: '0.65rem' }}>Service Type</label>
                            <select
                                className="auth-input"
                                style={{ marginBottom: 0, appearance: 'none', backgroundColor: '#161D29' }}
                                value={formData.serviceType}
                                onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                            >

                                <option>Exterior  Wash</option>

                                <option>Interior Car Wash </option>

                                <option>Ceramic Coating</option>

                                <option>Interior Detailing</option>

                                <option>Paint Protection Film – PPF</option>

                                <option>Engine Bay Cleaning</option>

                                <option>Full Body Foam Wash</option>

                                <option>AC Vent Cleaning</option>

                                <option>Wheel Alignment & Balancing</option>

                                <option>Leather Seat Treatment</option>

                                <option>Headlight Restoration</option>

                                <option>Anti-Rust Coating</option>

                                <option>Dashcam Installation</option>

                                <option>Brake Oil & Checkup</option>

                                <option>Odour Removal Treatment</option>

                                <option>Nitrogen Filling</option>

                                <option>Glass Scratch Removal</option>



                            </select>
                        </div>

                        <div className="info-box">
                            <label style={{ fontSize: '0.65rem' }}>Service Mode</label>
                            <select className="auth-input" style={{ marginBottom: 0, backgroundColor: '#161D29' }} value={formData.serviceMode} onChange={(e) => setFormData({ ...formData, serviceMode: e.target.value })}>
                                <option value="Garage Service">Garage Service</option>
                                <option value="Doorstep Wash">Doorstep Wash</option>
                            </select>
                        </div>

                        {/* Schedule - Single Row */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <div className="info-box">
                                <label style={{ fontSize: '0.65rem' }}>Date</label>
                                <input type="date" className="auth-input" style={{ marginBottom: 0 }} required onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
                            </div>
                            <div className="info-box">
                                <label style={{ fontSize: '0.65rem' }}>Time Slot</label>
                                <select className="auth-input" style={{ marginBottom: 0, backgroundColor: '#161D29' }} onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}>
                                    <option>09:00 AM - 11:00 AM</option>
                                    <option>02:00 PM - 04:00 PM</option>
                                </select>
                            </div>
                        </div>

                        <div className="info-box">
                            <label style={{ fontSize: '0.65rem' }}>Address</label>
                            <textarea
                                className="auth-input"
                                rows="2"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                style={{ resize: 'none', marginBottom: 0 }}
                                required
                            ></textarea>
                        </div>

                        <button type="submit" className="yellow-btn-large" style={{ padding: '12px', fontSize: '1rem' }}>
                            Confirm Booking
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;