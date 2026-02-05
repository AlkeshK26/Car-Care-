import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';

const Admin = () => {
    const [data, setData] = useState({
        totalBusinessRevenue: 0,
        activeBookingsCount: 0,
        totalUsers: 0,
        locationStats: [],
        allBookings: []
    });

    const loadAdminData = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/admin/stats');
            setData(res.data);
        } catch (err) {
            console.error("Admin Load Error", err);
        }
    };

    useEffect(() => { loadAdminData(); }, []);

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await axios.put(`http://localhost:5000/api/admin/update-status/${id}`, { status: newStatus });
            alert("Status Updated! ✨");
            loadAdminData();
        } catch (err) {
            alert("Update Failed");
        }
    };

    return (
        <div className="home-wrapper" style={{ padding: '40px', minHeight: '100vh' }}>
            {/* --- 1. HEADER SECTION --- */}
            <header className="content-header" style={{ marginBottom: '50px' }}>
                <div>
                    <h1 className="hero-heading" style={{ fontSize: '2.8rem', textAlign: 'left' }}>
                        Admin <span className="text-gradient">Control Center</span>
                    </h1>
                    <p style={{ color: 'var(--pure-greys-100)', marginTop: '10px' }}>
                        Real-time monitoring of revenue, bookings, and regional performance.
                    </p>
                </div>
                <button 
                    onClick={loadAdminData} 
                    className="yellow-btn" 
                    style={{ padding: '12px 30px', boxShadow: 'none' }}
                >
                    🔄 Refresh System
                </button>
            </header>

            {/* --- 2. ANALYTICS CARDS --- */}
            <div className="dashboard-grid" style={{ marginBottom: '60px' }}>
                <div className="service-card" style={{ padding: '30px', cursor: 'default' }}>
                    <p className="info-box"><label>Total Business Revenue</label></p>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--yellow-50)', margin: '10px 0' }}>
                        ₹{data.totalBusinessRevenue.toLocaleString()}
                    </h2>
                    <div style={{ color: '#00ff00', fontSize: '0.9rem' }}>+12.5% from last month</div>
                </div>

                <div className="service-card" style={{ padding: '30px', cursor: 'default' }}>
                    <p className="info-box"><label>Active Workload</label></p>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--blue-100)', margin: '10px 0' }}>
                        {data.activeBookingsCount} <span style={{ fontSize: '1.2rem', color: 'var(--pure-greys-100)' }}>Live Orders</span>
                    </h2>
                    <div style={{ color: 'var(--pure-greys-100)', fontSize: '0.9rem' }}>Across all regional hubs</div>
                </div>

                <div className="service-card" style={{ padding: '30px', cursor: 'default' }}>
                    <p className="info-box"><label>Platform Users</label></p>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--white)', margin: '10px 0' }}>
                        {data.totalUsers}
                    </h2>
                    <div style={{ color: 'var(--pure-greys-100)', fontSize: '0.9rem' }}>Registered Customers</div>
                </div>
            </div>

            {/* --- 3. REGIONAL PERFORMANCE --- */}
            <h3 style={{ color: 'var(--white)', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                📍 Regional Garage Performance
            </h3>
            <div className="service-grid" style={{ marginBottom: '60px' }}>
                {data.locationStats.map((loc, i) => (
                    <div key={i} className="service-card" style={{ padding: '25px', background: 'rgba(255,255,255,0.02)', cursor: 'default' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--richblack-700)', paddingBottom: '15px' }}>
                            <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{loc._id || "Main Hub"}</h3>
                            <span className="badge-btn" style={{ margin: 0, padding: '4px 12px', fontSize: '0.7rem' }}>
                                {loc.totalBookings} Total
                            </span>
                        </div>
                        <div className="info-grid" style={{ marginTop: '20px' }}>
                            <div className="info-box">
                                <label>Earnings</label>
                                <p style={{ color: 'var(--yellow-50)' }}>₹{loc.totalEarnings}</p>
                            </div>
                            <div className="info-box" style={{ textAlign: 'right' }}>
                                <label>Active</label>
                                <p style={{ color: 'var(--blue-100)' }}>{loc.activeOnes}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* --- 4. LIVE TRACKING TABLE --- */}
            <div className="service-card" style={{ padding: '0', overflow: 'hidden', cursor: 'default', border: '1px solid var(--richblack-700)' }}>
                <div style={{ padding: '25px', background: 'rgba(255,255,255,0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ margin: 0 }}>Live Appointments Tracking</h3>
                    <input 
                        type="text" 
                        placeholder="Search by customer email..." 
                        className="auth-input" 
                        style={{ width: '300px', marginBottom: 0, padding: '10px 15px' }} 
                    />
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: 'var(--richblack-800)' }}>
                                <th style={{ padding: '18px', textAlign: 'left', color: 'var(--blue-100)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Customer</th>
                                <th style={{ padding: '18px', textAlign: 'left', color: 'var(--blue-100)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Vehicle</th>
                                <th style={{ padding: '18px', textAlign: 'left', color: 'var(--blue-100)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Service</th>
                                <th style={{ padding: '18px', textAlign: 'left', color: 'var(--blue-100)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Price</th>
                                <th style={{ padding: '18px', textAlign: 'left', color: 'var(--blue-100)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Status</th>
                                <th style={{ padding: '18px', textAlign: 'left', color: 'var(--blue-100)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.allBookings.map((book) => (
                                <tr key={book._id} className="nav-item" style={{ display: 'table-row', borderBottom: '1px solid var(--richblack-700)', borderRadius: 0 }}>
                                    <td style={{ padding: '18px' }}>
                                        <div style={{ fontWeight: '600', color: 'var(--white)' }}>{book.userEmail}</div>
                                        <div style={{ fontSize: '0.7rem', color: 'var(--pure-greys-100)' }}>REF: {book._id.slice(-6).toUpperCase()}</div>
                                    </td>
                                    <td style={{ padding: '18px' }}>
                                        <div style={{ color: 'var(--yellow-50)' }}>{book.carName}</div>
                                        <div style={{ fontSize: '0.8rem' }}>{book.carModel}</div>
                                    </td>
                                    <td style={{ padding: '18px', fontSize: '0.9rem' }}>{book.serviceType}</td>
                                    <td style={{ padding: '18px', fontWeight: '700', color: 'var(--white)' }}>₹{book.price}</td>
                                    <td style={{ padding: '18px' }}>
                                        <span className="status-badge">
                                            <span>●</span> {book.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '18px' }}>
                                        <select 
                                            onChange={(e) => handleStatusUpdate(book._id, e.target.value)}
                                            className="auth-input"
                                            style={{ marginBottom: 0, padding: '5px 10px', width: 'auto', fontSize: '0.8rem', borderBottom: '1px solid var(--yellow-50)' }}
                                        >
                                            <option value="">Update Status</option>
                                            <option value="Confirmed ✅">Confirm</option>
                                            <option value="In Progress 🧼">In Progress</option>
                                            <option value="Completed ✨">Complete</option>
                                            <option value="Cancelled ❌">Cancel</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Admin;