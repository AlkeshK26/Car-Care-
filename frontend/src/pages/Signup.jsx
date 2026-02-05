import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import CarSearch from '../components/CarSearch';

const Signup = () => {
    const [isOwner, setIsOwner] = useState(false); 
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', age: '', email: '', password: '',
        mobile: '', locationArea: '', carBrand: '', carModel: '',
        garageName: '', role: 'user' 
    });
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCarSelect = (brand, model) => {
        setFormData({ ...formData, carBrand: brand, carModel: model });
    };

    const toggleRole = () => {
        const newRole = !isOwner ? 'garage_owner' : 'user';
        setIsOwner(!isOwner);
        setFormData({ ...formData, role: newRole });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/signup', formData);
            alert(`Welcome ${formData.firstName}! Registration Successful.`);

            if (formData.role === 'garage_owner') {
                localStorage.setItem("userRole", "garage_owner");
                localStorage.setItem("userEmail", formData.email);
                navigate('/owner-dashboard'); 
            } else {
                navigate('/login');
            }
        } catch (err) {
            alert(err.response?.data?.message || "Signup Failed");
        }
    };

    // --- Premium Dark Theme Styles ---
    const styles = {
        wrapper: { minHeight: '100vh', backgroundColor: '#000814', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', color: '#e2e8f0', fontFamily: 'Inter, sans-serif' },
        card: { maxWidth: '500px', width: '100%', backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(15px)', border: '1px solid #1e293b', padding: '40px', borderRadius: '28px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)' },
        input: { width: '100%', backgroundColor: '#0f172a', border: '1px solid #334155', padding: '14px', borderRadius: '12px', color: 'white', outline: 'none', marginBottom: '15px', fontSize: '0.95rem', boxSizing: 'border-box' },
        toggleContainer: { display: 'flex', backgroundColor: '#1e293b', padding: '4px', borderRadius: '14px', marginBottom: '30px', position: 'relative' },
        toggleBtn: (active) => ({ flex: 1, padding: '12px', border: 'none', borderRadius: '11px', cursor: 'pointer', fontWeight: '800', backgroundColor: active ? '#bcb300' : 'transparent', color: active ? '#000' : '#94a3b8', transition: 'all 0.4s ease' }),
        submitBtn: { width: '100%', padding: '16px', backgroundColor: '#bcb300', color: '#000', border: 'none', borderRadius: '12px', fontWeight: '900', cursor: 'pointer', marginTop: '10px', fontSize: '1.1rem', boxShadow: '0 0 25px rgba(34, 211, 238, 0.4)', transition: '0.3s' }
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.card}>
                
                <div style={{ textAlign: 'center', marginBottom: '35px' }}>
                    <h2 style={{ fontSize: '2.2rem', fontWeight: '900', margin: 0 }}>Join <span style={{ color: '#22d3ee' }}>CarCare Pro</span></h2>
                    <p style={{ color: '#94a3b8', marginTop: '10px', fontSize: '0.9rem' }}>Experience premium car detailing or manage your garage.</p>
                </div>

                {/* ROLE TOGGLE SWITCH */}
                <div style={styles.toggleContainer}>
                    <button type="button" onClick={toggleRole} style={styles.toggleBtn(!isOwner)}>Customer</button>
                    <button type="button" onClick={toggleRole} style={styles.toggleBtn(isOwner)}>Garage Owner</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <input name="firstName" placeholder="First Name" onChange={handleChange} required style={styles.input} />
                        <input name="lastName" placeholder="Last Name" onChange={handleChange} required style={styles.input} />
                    </div>
                    
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <input name="age" type="number" placeholder="Age" onChange={handleChange} required style={styles.input} />
                        <input name="mobile" placeholder="Mobile Number" onChange={handleChange} required style={styles.input} />
                    </div>

                    <input name="email" type="email" placeholder="Email Address" onChange={handleChange} required style={styles.input} />
                    <input name="password" type="password" placeholder="Password" onChange={handleChange} required style={styles.input} />
                    
                    <input name="locationArea" placeholder="Business/Home Location" onChange={handleChange} required style={styles.input} />

                    {/* DYNAMIC FIELDS BASED ON ROLE */}
                    {isOwner ? (
                        <div style={{ border: '1px solid #22d3ee', padding: '15px', borderRadius: '15px', backgroundColor: 'rgba(34, 211, 238, 0.05)', marginBottom: '15px' }}>
                            <label style={{ color: '#22d3ee', textTransform: 'uppercase', fontSize: '11px', fontWeight: '900', marginBottom: '8px', display: 'block' }}>Garage Details</label>
                            <input name="garageName" placeholder="Enter Garage Full Name" onChange={handleChange} required style={{ ...styles.input, marginBottom: 0, border: '1px solid #22d3ee' }} />
                        </div>
                    ) : (
                        <div>
                            <label style={{ color: '#94a3b8', textTransform: 'uppercase', fontSize: '11px', fontWeight: '900', marginBottom: '8px', display: 'block' }}>Select Your Vehicle</label>
                            <CarSearch onSelectCar={handleCarSelect} />
                        </div>
                    )}

                    <button type="submit" style={styles.submitBtn}>
                        {isOwner ? 'REGISTER MY GARAGE' : 'CREATE CUSTOMER ACCOUNT'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '25px', fontSize: '14px', color: '#64748b' }}>
                    Already part of the club? <Link to="/login" style={{ color: '#22d3ee', textDecoration: 'none', fontWeight: 'bold' }}>Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;