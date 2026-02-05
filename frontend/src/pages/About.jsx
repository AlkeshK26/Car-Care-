import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

const About = () => {
    const navigate = useNavigate();

    return (
        <div className="home-wrapper">
            {/* --- 1. NAVIGATION (Standardized with Home) --- */}
            <nav className="nav-sticky">
                <div className="nav-content">
                    <h2 className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                        Car<span>Care</span>
                    </h2>
                    
                    <div className="nav-links">
                        <Link to="/">Home</Link>
                        <Link to="/about" className="active" style={{ color: 'var(--white)' }}>About</Link>
                        <Link to="/services">Services</Link>
                        <Link to="/contact">Contact</Link>
                    </div>

                    <div className="nav-auth">
                        <Link to="/login" className="outline-btn" style={{ padding: '8px 18px', border: 'none' }}>Log in</Link>
                        <Link to="/signup" className="yellow-btn">Sign up</Link>
                    </div>
                </div>
            </nav>

            {/* --- 2. ABOUT HERO SECTION --- */}
            <div className="hero-section" style={{ paddingBottom: '40px' }}>
                <button className="badge-btn">Our Story</button>
                <h1 className="hero-heading">
                    Our Mission to <span className="text-gradient">Shine</span>
                </h1>
                <p className="hero-subtext">
                    At CarCare, we believe every car deserves a showroom finish. We bring world-class detailing right to your doorstep with precision and passion.
                </p>
            </div>

            {/* --- 3. CONTENT GRID --- */}
            <section style={{ padding: '0 10%', marginBottom: '80px' }}>
                <div className="dashboard-grid">
                    {/* Who We Are Card */}
                    <div className="service-card" style={{ padding: '40px', cursor: 'default' }}>
                        <h2 style={{ color: 'var(--yellow-50)', marginBottom: '20px' }}>Who We Are</h2>
                        <p style={{ color: 'var(--pure-greys-100)', lineHeight: '1.8' }}>
                            Founded in 2025, CarCare started with a simple idea: making car maintenance effortless. We combine high-pressure technology with eco-friendly products to ensure your machine stays protected and polished.
                        </p>
                    </div>

                    {/* Why Choose Us Card */}
                    <div className="service-card" style={{ padding: '40px', cursor: 'default', borderLeft: '4px solid var(--blue-100)' }}>
                        <h2 style={{ color: 'var(--blue-100)', marginBottom: '20px' }}>Why Choose Us?</h2>
                        <ul style={{ color: 'var(--pure-greys-100)', listStyle: 'none', padding: 0, lineHeight: '2.2' }}>
                            <li>✨ Certified Detailing Experts</li>
                            <li>🌱 100% Eco-Friendly Products</li>
                            <li>📍 Doorstep & Garage Flexibility</li>
                            <li>🛡️ Premium Paint Protection</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* --- 4. TRUST STATS SECTION --- */}
            <div className="testimonials" style={{ background: 'transparent', borderTop: '1px solid var(--richblack-700)' }}>
                <div className="trust-stats" style={{ justifyContent: 'space-around' }}>
                    <div className="stat-item"><span>5,000+</span> Cars Detailed</div>
                    <div className="stat-item"><span>50+</span> Service Points</div>
                    <div className="stat-item"><span>4.9/5</span> Customer Rating</div>
                </div>
            </div>

            {/* --- 5. CALL TO ACTION --- */}
            <div className="location-strip" style={{ marginTop: '40px' }}>
                <p>Ready to give your car the treatment it deserves?</p>
                <button className="cta-small" onClick={() => navigate('/services')}>View All Services</button>
            </div>
        </div>
    );
};

export default About;