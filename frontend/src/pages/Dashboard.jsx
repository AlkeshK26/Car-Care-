import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false); 
    const [bookingData, setBookingData] = useState({
        serviceType: 'Exterior Wash',
        serviceMode: 'Garage Service',
        date: '',
        timeSlot: '09:00 AM - 11:00 AM',
        location: ''
    });

    const navigate = useNavigate();

    const fetchDashboardData = useCallback(async () => {
        const storedEmail = localStorage.getItem('userEmail');
        if (!storedEmail) { navigate('/login'); return; }

        try {
            setIsLoading(true);
            const response = await axios.get(`http://localhost:5000/api/auth/profile?email=${storedEmail}`);
            setUserData(response.data);
            if(response.data.locationArea) {
                setBookingData(prev => ({...prev, location: response.data.locationArea}));
            }
        } catch (err) {
            console.error("Dashboard error:", err);
            navigate('/login');
        } finally {
            setIsLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        try {
            const finalData = {
                userEmail: userData.email,
                carName: userData.carBrand,
                carModel: userData.carModel,
                ...bookingData
            };
            await axios.post('http://localhost:5000/api/bookings/book', finalData);
            alert("Service Booked Successfully! 🚗✨");
            setShowForm(false);
        } catch (err) {
            alert("Booking Error: Please try again.");
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    if (isLoading) return (
        <div className="loading-container">
            <div className="spinner"></div>
            <p style={{marginTop: '20px'}}>Syncing Your Detailing Profile...</p>
        </div>
    );
    
    if (!userData) return null;

    return (
        <div className="dashboard-container">
            {/* --- SIDEBAR --- */}
            <div className="sidebar">
                <div className="sidebar-logo">
                    <h2 className="logo" onClick={() => navigate('/')}>
                        Car<span>Care</span>
                    </h2>
                </div>
                <div className="sidebar-links">
                    <div className="nav-item active">🏠 Dashboard</div>
                    <Link to="/" className="nav-item">🌐 View Website</Link>
                    <Link to="/services" className="nav-item">🛠️ All Services</Link>
                </div>
                <div className="sidebar-footer">
                    <div className="nav-item logout-item" onClick={handleLogout}>🚪 Logout</div>
                </div>
            </div>

            {/* --- MAIN CONTENT --- */}
            <div className="main-content">
                <div className="content-header">
                    <div>
                        <h1 style={{fontSize: '2.5rem', margin: 0}}>
                            Welcome, <span className="text-gradient">{userData.firstName}</span>!
                        </h1>
                        <p style={{color: 'var(--pure-greys-100)', marginTop: '5px'}}>Manage your garage and schedule new detailing sessions.</p>
                    </div>
                    <div style={{display: 'flex', gap: '15px'}}>
                        <button className="yellow-btn" onClick={() => setShowForm(true)}>+ Book A Service</button>
                        <Link to="/" className="outline-btn" style={{padding: '10px 20px'}}>Back Home</Link>
                    </div>
                </div>

                <div className="dashboard-grid">
                    {/* Member Details */}
                    <div className="service-card" style={{padding: '30px', cursor: 'default'}}>
                        <h3 style={{color: 'var(--yellow-50)', marginBottom: '25px', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '1px'}}>Member Details</h3>
                        <div className="info-grid">
                            <div className="info-box">
                                <label>Full Name</label>
                                <p>{userData.firstName} {userData.lastName}</p>
                            </div>
                            <div className="info-box">
                                <label>Email Address</label>
                                <p>{userData.email}</p>
                            </div>
                            <div className="info-box">
                                <label>Contact Number</label>
                                <p>{userData.mobile}</p>
                            </div>
                            <div className="info-box">
                                <label>Age</label>
                                <p>{userData.age} Years</p>
                            </div>
                            <div className="info-box full-width">
                                <label>Primary Service Location</label>
                                <p>{userData.locationArea || "Not Set"}</p>
                            </div>
                        </div>
                    </div>

                    {/* Vehicle Details */}
                    <div className="service-card" style={{padding: '30px', cursor: 'default', borderLeft: '4px solid var(--blue-100)'}}>
                        <h3 style={{color: 'var(--blue-100)', marginBottom: '25px', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '1px'}}>Registered Vehicle</h3>
                        <div style={{marginTop: '20px'}}>
                            <h2 style={{fontSize: '2.2rem', color: 'var(--white)', margin: '10px 0'}}>{userData.carBrand}</h2>
                            <p style={{fontSize: '1.2rem', color: 'var(--pure-greys-100)'}}>{userData.carModel}</p>
                        </div>
                        <div className="status-badge" style={{marginTop: '40px'}}>
                            <span>LIVE STATUS:</span> {userData.status || "Ready for Service"}
                        </div>
                    </div>
                </div>

                {/* --- BOOKING MODAL --- */}
                {showForm && (
                    <div className="booking-overlay">
                        <div className="service-card" style={{width: '100%', maxWidth: '500px', padding: '40px', cursor: 'default'}}>
                            <h2 className="text-gradient" style={{marginBottom: '10px', fontSize: '2rem'}}>New Reservation</h2>
                            <p style={{color: 'var(--pure-greys-100)', marginBottom: '25px', fontSize: '0.9rem'}}>Please confirm your session details below.</p>
                            
                            <form onSubmit={handleBookingSubmit} style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                                <div className="info-box">
                                    <label>Vehicle Selected</label>
                                    <input type="text" disabled value={`${userData.carBrand} ${userData.carModel}`} className="auth-input" style={{opacity: 0.7}} />
                                </div>
                                
                                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
                                    <div className="info-box">
                                        <label>Service Mode</label>
                                        <select className="auth-input" style={{marginBottom: 0, backgroundColor: '#161D29'}} onChange={e => setBookingData({...bookingData, serviceMode: e.target.value})}>
                                            <option value="Garage Service">Garage Service</option>
                                            <option value="Doorstep Wash">Doorstep Wash</option>
                                        </select>
                                    </div>
                                    <div className="info-box">
                                        <label>Service Type</label>
                                        <select className="auth-input" style={{marginBottom: 0, backgroundColor: '#161D29'}} onChange={e => setBookingData({...bookingData, serviceType: e.target.value})}>
                                            <option>Exterior Wash</option>
                                            <option>Full Body Foam Wash</option>
                                            <option>Ceramic Coating</option>
                                            <option>Interior Detailing</option>
                                        </select>
                                    </div>
                                </div>

                                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
                                    <div className="info-box">
                                        <label>Date</label>
                                        <input type="date" required className="auth-input" style={{marginBottom: 0}} onChange={e => setBookingData({...bookingData, date: e.target.value})} />
                                    </div>
                                    <div className="info-box">
                                        <label>Time Slot</label>
                                        <select className="auth-input" style={{marginBottom: 0, backgroundColor: '#161D29'}} onChange={e => setBookingData({...bookingData, timeSlot: e.target.value})}>
                                            <option>09:00 AM - 11:00 AM</option>
                                            <option>11:00 AM - 01:00 PM</option>
                                            <option>02:00 PM - 04:00 PM</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="info-box">
                                    <label>Service Address</label>
                                    <input type="text" value={bookingData.location} className="auth-input" placeholder="Confirm your area..." onChange={e => setBookingData({...bookingData, location: e.target.value})} />
                                </div>

                                <div style={{display: 'flex', gap: '10px', marginTop: '10px'}}>
                                    <button type="submit" className="yellow-btn" style={{flex: 1}}>Confirm Booking</button>
                                    <button type="button" className="outline-btn" style={{padding: '10px', border: 'none'}} onClick={() => setShowForm(false)}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;