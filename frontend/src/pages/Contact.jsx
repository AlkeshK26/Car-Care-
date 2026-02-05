import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

const Contact = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thank you! Your message has been sent to the CarCare team.");
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="home-wrapper">
            {/* --- 1. NAVIGATION --- */}
            <nav className="nav-sticky">
                <div className="nav-content">
                    <h2 className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                        Car<span>Care</span>
                    </h2>
                    <div className="nav-links">
                        <Link to="/">Home</Link>
                        <Link to="/about">About</Link>
                        <Link to="/services">Services</Link>
                        <Link to="/contact" style={{ color: 'var(--white)' }}>Contact</Link>
                    </div>
                    <Link to="/" className="outline-btn" style={{ padding: '8px 18px' }}>Back to Home</Link>
                </div>
            </nav>

            {/* --- 2. CONTACT HERO --- */}
            <header className="hero-section" style={{ paddingBottom: '20px' }}>
                <button className="badge-btn">Contact Us</button>
                <h1 className="hero-heading">
                    Get in <span className="text-gradient">Touch</span>
                </h1>
                <p className="hero-subtext">
                    Have questions about our premium detailing packages or need a custom quote? Our team is here to help.
                </p>
            </header>

            {/* --- 3. MAIN CONTENT --- */}
            <div style={{ padding: '0 10% 100px 10%', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '40px' }}>
                    
                    {/* LEFT: GLASSMORPHISM FORM */}
                    <div className="service-card" style={{ padding: '40px', cursor: 'default' }}>
                        <h2 style={{ color: 'var(--white)', marginBottom: '30px' }}>Send a Message</h2>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <input 
                                    type="text" placeholder="Your Name" className="auth-input" required 
                                    value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                                <input 
                                    type="email" placeholder="Email Address" className="auth-input" required 
                                    value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                            <textarea 
                                placeholder="How can we help you? (e.g., Query about Ceramic Coating...)" 
                                className="auth-input" rows="6" required 
                                value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
                                style={{ resize: 'none' }}
                            ></textarea>
                            <button type="submit" className="yellow-btn-large" style={{ marginTop: '10px' }}>
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* RIGHT: CONTACT CARDS */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {/* Address */}
                        <div className="service-card" style={{ padding: '25px', cursor: 'default' }}>
                            <h3 style={{ color: 'var(--blue-100)', fontSize: '1.1rem' }}>📍 Main Workshop</h3>
                            <p style={{ color: 'var(--pure-greys-100)', marginTop: '8px', fontSize: '0.9rem', lineHeight: '1.6' }}>
                                123 Detailing Lane, Sector 62,<br/> Noida, UP 201301
                            </p>
                        </div>

                        {/* Contact */}
                        <div className="service-card" style={{ padding: '25px', cursor: 'default', borderColor: 'var(--yellow-50)' }}>
                            <h3 style={{ color: 'var(--yellow-50)', fontSize: '1.1rem' }}>📞 Support Line</h3>
                            <p style={{ color: 'var(--pure-greys-100)', marginTop: '8px', fontSize: '0.9rem', lineHeight: '1.6' }}>
                                +91 98765 43210<br/>
                                support@carcarepro.com
                            </p>
                        </div>

                        {/* Hours */}
                        <div className="service-card" style={{ padding: '25px', cursor: 'default' }}>
                            <h3 style={{ color: 'var(--white)', fontSize: '1.1rem' }}>⏰ Business Hours</h3>
                            <p style={{ color: 'var(--pure-greys-100)', marginTop: '8px', fontSize: '0.9rem', lineHeight: '1.6' }}>
                                Mon - Sat: 08:00 AM - 08:00 PM<br/>
                                Sun: 09:00 AM - 04:00 PM
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- 4. LOCATION STRIP --- */}
            <div className="location-strip">
                <p>📍 Our technicians are active in your area right now.</p>
                <Link to="/services" className="cta-small" style={{ textDecoration: 'none' }}>View Services</Link>
            </div>
        </div>
    );
};

export default Contact;