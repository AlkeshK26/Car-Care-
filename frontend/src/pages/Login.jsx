import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", {
                email: formData.email,
                password: formData.password
            });

            if (res.data.success) {
                // Save essential data to local storage
                localStorage.setItem("userEmail", res.data.email);
                localStorage.setItem("userRole", res.data.role); 
                localStorage.setItem("isLoggedIn", "true");

                // Role-based redirection logic (Logic remains same, just added Owner)
                if (res.data.role === "admin") {
                    window.location.href = "/admin"; 
                } else if (res.data.role === "garage_owner") {
                    // Added redirection for the new Garage Owner role
                    window.location.href = "/owner-dashboard"; 
                } else {
                    window.location.href = "/dashboard"; 
                }
            }
        } catch (err) {
            alert(err.response?.data?.message || "Invalid Credentials!");
        }
    };

    return (
        <div className="auth-container" style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000814' }}>
            <div className="auth-card" style={{ maxWidth: '450px', width: '100%', background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '40px', borderRadius: '24px' }}>
                <div style={{ marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '2.2rem', marginBottom: '10px', color: '#fff' }}>
                        Welcome <span style={{ color: '#FFD60A' }}>Back</span>
                    </h2>
                    <p style={{ color: '#888', fontSize: '0.9rem' }}>
                        Enter your credentials to access your CarCare account.
                    </p>
                </div>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="auth-input" 
                            style={{ width: '100%', padding: '12px', background: '#112240', border: '1px solid #233554', color: '#fff', borderRadius: '8px' }}
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            className="auth-input"
                            style={{ width: '100%', padding: '12px', background: '#112240', border: '1px solid #233554', color: '#fff', borderRadius: '8px' }}
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        className="yellow-btn-large" 
                        style={{ marginTop: '15px', width: '100%', padding: '15px', backgroundColor: '#FFD60A', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                        Login to Account
                    </button>
                </form>

                <p className="auth-footer" style={{ textAlign: 'center', marginTop: '25px', color: '#888' }}>
                    Don't have an account? <Link to="/signup" style={{ color: '#FFD60A', textDecoration: 'none' }}>Register now</Link>
                </p>
                
                <Link to="/" style={{ 
                    display: 'block', 
                    textAlign: 'center',
                    marginTop: '20px', 
                    fontSize: '0.8rem', 
                    color: '#888', 
                    textDecoration: 'none' 
                }}>
                    ← Back to Website
                </Link>
            </div>
        </div>
    );
};

export default Login;