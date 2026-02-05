import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const OwnerDashboard = () => {
    const [data, setData] = useState({ stats: {}, myBookings: [] });
    const [services, setServices] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [username, setUsername] = useState(""); 
    const [newService, setNewService] = useState({ name: '', price: '' });
    const [garageName, setGarageName] = useState(localStorage.getItem("garageName") || "My Garage");
    const ownerEmail = localStorage.getItem("userEmail");
    const navigate = useNavigate();

    // Default 10 services for new garages
    const defaultServices = [
        { serviceName: "Exterior Car Wash", price: 499 },
        { serviceName: "Interior Car Wash", price: 599 },
        { serviceName: "Full Body Foam Wash", price: 899 },
        { serviceName: "Engine Bay Cleaning", price: 399 },
        { serviceName: "AC Vent Cleaning", price: 799 },
        { serviceName: "Deep Interior Detailing", price: 2499 },
        { serviceName: "Ceramic Coating", price: 14999 },
        { serviceName: "Paint Protection Film (PPF)", price: 45000 },
        { serviceName: "Wheel Alignment", price: 500 },
        { serviceName: "Brake Oil Checkup", price: 299 }
    ];

    const fetchData = async () => {
        try {
            const res = await axios.get(`http://localhost:5000/api/owner/stats?ownerEmail=${ownerEmail}`);
            setData(res.data);
            
            // Initialization logic if menu is empty
            if (res.data.userServices && res.data.userServices.length > 0) {
                setServices(res.data.userServices);
            } else {
                handleInitializeDefaults();
            }

            if (res.data.ownerName) {
                setUsername(res.data.ownerName);
            }
        } catch (err) {
            console.error("Fetch Error", err);
        }
    };

    const handleInitializeDefaults = async () => {
        try {
            for (const service of defaultServices) {
                await axios.post('http://localhost:5000/api/owner/add-service', {
                    email: ownerEmail,
                    serviceName: service.serviceName,
                    price: service.price
                });
            }
            fetchData(); 
        } catch (err) {
            console.error("Initialization Error", err);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const filteredBookings = data.myBookings.filter(book => 
        book.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.carName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await axios.put(`http://localhost:5000/api/admin/update-status/${id}`, { status: newStatus });
            alert("Car Status Updated! 🚗✨");
            fetchData(); 
        } catch (err) {
            alert("Status Update Failed");
        }
    };

    const handleAddService = async () => {
        if (!newService.name || !newService.price) return alert("Please fill all fields");
        try {
            const res = await axios.post('http://localhost:5000/api/owner/add-service', {
                email: ownerEmail,
                serviceName: newService.name,
                price: Number(newService.price)
            });
            
            if (res.data.services) {
                setServices(res.data.services);
            } else {
                fetchData();
            }
            
            setNewService({ name: '', price: '' });
            alert("Service Added Successfully! ✨");
        } catch (err) { 
            console.error(err);
            alert("Failed to add service. Check backend connection."); 
        }
    };

    const handleRemoveService = async (serviceId) => {
        try {
            const res = await axios.post('http://localhost:5000/api/owner/remove-service', {
                email: ownerEmail,
                serviceId: serviceId
            });
            setServices(res.data.services);
        } catch (err) { alert("Failed to remove service"); }
    };

    const saveGarageName = async () => {
        try {
            await axios.put('http://localhost:5000/api/owner/update-garage', {
                email: ownerEmail,
                garageName: garageName
            });
            localStorage.setItem("garageName", garageName);
            alert("Garage Details Updated! ✅");
        } catch (err) { alert("Update Failed"); }
    };

    // --- STYLING OBJECTS ---
    const styles = {
        wrapper: { minHeight: '100vh', backgroundColor: '#000814', color: '#AFB2BF', padding: '40px', fontFamily: '"Inter", sans-serif' },
        header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #2C333F', paddingBottom: '30px', marginBottom: '40px' },
        titleInput: { background: 'transparent', border: 'none', color: '#FFD60A', fontSize: '2.8rem', fontWeight: '900', outline: 'none', width: 'auto' },
        statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px', marginBottom: '40px' },
        statCard: (borderColor) => ({ background: '#161D29', padding: '30px', borderRadius: '24px', borderBottom: `8px solid ${borderColor}`, boxShadow: '0 10px 30px rgba(0,0,0,0.4)' }),
        mainLayout: { display: 'grid', gridTemplateColumns: '1fr 2.2fr', gap: '30px' },
        sidePanel: { background: '#161D29', padding: '30px', borderRadius: '28px', border: '1px solid #2C333F', height: 'fit-content' },
        tablePanel: { background: '#161D29', borderRadius: '28px', border: '1px solid #2C333F', overflow: 'hidden' },
        input: { width: '100%', padding: '15px', background: '#000814', border: '1px solid #2C333F', borderRadius: '12px', color: 'white', outline: 'none', marginBottom: '15px', boxSizing: 'border-box' },
        btnYellow: { background: '#FFD60A', color: '#000', padding: '12px 25px', borderRadius: '12px', fontWeight: '900', border: 'none', cursor: 'pointer', transition: '0.3s' },
        table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left' }
    };

    return (
        <div style={styles.wrapper}>
            
            {/* --- HEADER --- */}
            <div style={styles.header}>
                <div>
                    <input style={styles.titleInput} value={garageName} onChange={(e) => setGarageName(e.target.value)} />
                    <div style={{ marginTop: '10px' }}>
                        <p style={{ margin: 0, color: '#47A5C5', fontWeight: 'bold' }}>MANAGER: <span style={{ color: 'white' }}>{username || "Loading..."}</span></p>
                        <p style={{ margin: '5px 0', fontSize: '0.85rem' }}>MAIL: <span style={{ color: 'white' }}>{ownerEmail}</span></p>
                    </div>
                    <Link to="/" style={{ color: '#47A5C5', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 'bold', display: 'block', marginTop: '10px' }}>← BACK TO HOME PAGE</Link>
                </div>

                <div style={{ display: 'flex', gap: '15px' }}>
                    <button style={styles.btnYellow} onClick={saveGarageName}>SAVE SETTINGS</button>
                    <button onClick={handleLogout} style={{ ...styles.btnYellow, background: 'transparent', border: '1px solid #ef4444', color: '#ef4444' }}>LOGOUT</button>
                </div>
            </div>

            {/* --- STATS OVERVIEW --- */}
            <div style={styles.statsGrid}>
                <div style={styles.statCard('#FFD60A')}>
                    <p style={{ fontSize: '0.7rem', fontWeight: '900', letterSpacing: '3px' }}>REVENUE</p>
                    <h2 style={{ color: '#FFD60A', fontSize: '3rem', margin: '10px 0 0 0' }}>₹{data.stats.totalEarnings || 0}</h2>
                </div>
                <div style={styles.statCard('#47A5C5')}>
                    <p style={{ fontSize: '0.7rem', fontWeight: '900', letterSpacing: '3px' }}>LIVE BOOKINGS</p>
                    <h2 style={{ color: '#47A5C5', fontSize: '3rem', margin: '10px 0 0 0' }}>{data.stats.totalBookings || 0}</h2>
                </div>
                <div style={styles.statCard('#06D6A0')}>
                    <p style={{ fontSize: '0.7rem', fontWeight: '900', letterSpacing: '3px' }}>GARAGE TRAFFIC</p>
                    <h2 style={{ color: '#06D6A0', fontSize: '3rem', margin: '10px 0 0 0' }}>{data.stats.liveCars || 0}</h2>
                </div>
            </div>

            <div style={styles.mainLayout}>
                
                {/* --- SERVICE MENU --- */}
                <div style={styles.sidePanel}>
                    <h3 style={{ color: 'white', marginBottom: '25px', marginTop: 0 }}>🛠️ Service Menu</h3>
                    <input style={styles.input} placeholder="Service Name" value={newService.name} onChange={e => setNewService({...newService, name: e.target.value})} />
                    <input style={styles.input} type="number" placeholder="Rate (₹)" value={newService.price} onChange={e => setNewService({...newService, price: e.target.value})} />
                    <button style={{ ...styles.btnYellow, width: '100%' }} onClick={handleAddService}>+ ADD NEW SERVICE</button>

                    <div style={{ marginTop: '35px', maxHeight: '450px', overflowY: 'auto', paddingRight: '5px' }}>
                        <p style={{ fontSize: '0.65rem', fontWeight: '900', color: '#47A5C5', marginBottom: '15px', letterSpacing: '2px' }}>ACTIVE OFFERINGS ({services.length})</p>
                        {services.map(s => (
                            <div key={s._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#000814', padding: '15px', borderRadius: '15px', marginBottom: '12px', border: '1px solid #2C333F' }}>
                                <div>
                                    <p style={{ margin: 0, fontWeight: 'bold', fontSize: '0.9rem', color: 'white' }}>{s.serviceName}</p>
                                    <span style={{ color: '#FFD60A', fontWeight: '900', fontSize: '0.8rem' }}>₹{s.price}</span>
                                </div>
                                <button onClick={() => handleRemoveService(s._id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', fontSize: '1.2rem', cursor: 'pointer' }}>🗑️</button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- BOOKINGS TABLE --- */}
                <div style={styles.tablePanel}>
                    <div style={{ padding: '30px', borderBottom: '1px solid #2C333F', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(28, 37, 51, 0.4)' }}>
                        <h3 style={{ color: 'white', margin: 0 }}>Live Job Cards</h3>
                        <input 
                            placeholder="Search client or car..." 
                            style={{ ...styles.input, width: '300px', marginBottom: 0, borderRadius: '30px', padding: '10px 25px' }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={styles.table}>
                            <thead style={{ background: '#2C333F', color: '#47A5C5', fontSize: '0.75rem', fontWeight: '900', letterSpacing: '1px' }}>
                                <tr>
                                    <th style={{ padding: '20px' }}>CLIENT ID</th>
                                    <th>VEHICLE UNIT</th>
                                    <th>WORKFLOW STATUS</th>
                                    <th style={{ textAlign: 'center' }}>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBookings.map(book => (
                                    <tr key={book._id} style={{ borderBottom: '1px solid #2C333F' }}>
                                        <td style={{ padding: '20px', fontWeight: 'bold', color: 'white' }}>{book.userEmail.split('@')[0]}</td>
                                        <td style={{ color: '#47A5C5', fontWeight: '900' }}>{book.carName}</td>
                                        <td>
                                            <span style={{ padding: '5px 15px', borderRadius: '8px', background: '#000814', border: '1px solid #FFD60A', color: '#FFD60A', fontSize: '0.7rem', fontWeight: 'bold' }}>
                                                {book.status}
                                            </span>
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            <select 
                                                style={{ background: '#000814', color: '#FFD60A', border: '1px solid #2C333F', padding: '8px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 'bold' }}
                                                value={book.status}
                                                onChange={(e) => handleStatusUpdate(book._id, e.target.value)}
                                            >
                                                <option value="Pending ⏳">WAITLIST</option>
                                                <option value="Confirmed ✅">READY</option>
                                                <option value="In Progress 🧼">CLEANING</option>
                                                <option value="Completed ✨">RELEASED</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredBookings.length === 0 && (
                            <div style={{ padding: '100px', textAlign: 'center', opacity: 0.3, fontStyle: 'italic' }}>No job cards found matching the criteria.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OwnerDashboard;