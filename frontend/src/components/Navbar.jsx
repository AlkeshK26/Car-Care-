import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const role = localStorage.getItem("userRole"); 

    const handleLogout = () => {
        localStorage.clear(); 
        navigate('/login');
    };

    return (
        <nav style={{
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            padding: '15px 50px', 
            backgroundColor: 'rgba(0, 8, 20, 0.85)', // Matches your nav-sticky background
            backdropFilter: 'blur(12px)',           // Matches glassmorphism in App.css
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            position: 'sticky',
            top: 0,
            zIndex: 1000
        }}>
            {/* --- UPDATED LOGO: Matches Dashboard Sidebar --- */}
            <div className="sidebar-logo" style={{ padding: 0, border: 'none', margin: 0 }}>
                <h4 className="logo" style={{ cursor: 'pointer', margin: 0 }} onClick={() => navigate('/')}>
                    Car<span>Care</span>
                </h4>
            </div>

            <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
                <Link to="/" style={linkStyle}>Home</Link>

                {role === 'admin' ? (
                    <Link to="/admin" style={linkStyle}>Admin Panel</Link>
                ) : (
                    <Link to="/dashboard" style={linkStyle}>My Dashboard</Link>
                )}

                <button onClick={handleLogout} className="logout-item" style={logoutBtnStyle}>
                    Logout
                </button>
            </div>
        </nav>
    );
};

// Refined styles to match the premium App.css theme
const linkStyle = {
    color: 'var(--pure-greys-100)',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'var(--transition)'
};

const logoutBtnStyle = {
    backgroundColor: 'transparent',
    border: '1px solid #ef4444',
    color: '#ef4444',
    padding: '8px 18px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '700'
};

export default Navbar;