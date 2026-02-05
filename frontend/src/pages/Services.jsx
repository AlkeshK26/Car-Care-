import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

// --- ASSETS IMPORT ---
import img1 from '../assets/exterior-wash.jpg';
import img2 from '../assets/interior-wash.jpg';
import img3 from '../assets/ceramic.jpg';
import img4 from '../assets/interior.jpg';
import img5 from '../assets/ppf.jpg';
import img6 from '../assets/engine.jpg';
import img7 from '../assets/foam.jpg';
import img8 from '../assets/ac.jpg';
import img9 from '../assets/alignment.jpg';
import img10 from '../assets/leather.jpg';
import img11 from '../assets/headlight.jpg';
import img12 from '../assets/antirust.jpg';
import img13 from '../assets/music.jpg';
import img14 from '../assets/dashcam.jpg';
import img15 from '../assets/brake.jpg';
import img16 from '../assets/oduor.jpg';
import img17 from '../assets/nitrogen.jpg';
import img18 from '../assets/glass.jpg';

const Services = () => {
    const [selectedService, setSelectedService] = useState(null);
    const navigate = useNavigate();

    const serviceData = [
        { id: 1, title: "Exterior Car Wash", category: "BASIC", img: img1, desc: "Professional high-pressure exterior wash using pH-balanced premium shampoo that safely removes dirt, mud, and road grime." },
        { id: 2, title: "Interior Car Wash", category: "BASIC", img: img2, desc: "Thorough interior cleaning including vacuuming of seats, carpets, mats, and boot area." },
        { id: 3, title: "Ceramic Coating", category: "PREMIUM", img: img3, desc: "Advanced 9H nano-ceramic coating that forms a durable protective layer over your car’s paint." },
        { id: 4, title: "Interior Detailing", category: "DETAILING", img: img4, desc: "Complete deep interior cleaning covering seats, roof liner, carpets, mats, dashboard, and panels." },
        { id: 5, title: "Paint Protection Film – PPF", category: "PREMIUM", img: img5, desc: "Ultra-clear, self-healing paint protection film designed to shield your car from scratches and stone chips." },
        { id: 6, title: "Engine Bay Cleaning", category: "BASIC", img: img6, desc: "Safe and controlled engine bay cleaning using non-conductive degreasers." },
        { id: 7, title: "Full Body Foam Wash", category: "BASIC", img: img7, desc: "Thick snow-foam wash that gently lifts dirt from the surface without damaging paint." },
        { id: 8, title: "AC Vent Cleaning", category: "CAR CARE", img: img8, desc: "Deep AC vent sanitation using specialized antibacterial foam to remove dust and mold." },
        { id: 9, title: "Wheel Alignment & Balancing", category: "TYRE", img: img9, desc: "Computerized wheel alignment and balancing for stable steering and reduced tyre wear." },
        { id: 10, title: "Leather Seat Treatment", category: "DETAILING", img: img10, desc: "Premium leather conditioning service that cleans, moisturizes, and protects leather seats." },
        { id: 11, title: "Headlight Restoration", category: "DETAILING", img: img11, desc: "Multi-stage sanding and polishing process to remove oxidation and yellowing from headlights." },
        { id: 12, title: "Anti-Rust Coating", category: "CAR CARE", img: img12, desc: "Heavy-duty bitumen-based underbody coating that protects your car’s chassis from rust." },
        { id: 13, title: "Music System Installation", category: "ELECTRICAL", img: img13, desc: "Professional installation of Android infotainment systems, speakers, and amplifiers." },
        { id: 14, title: "Dashcam Installation", category: "ELECTRICAL", img: img14, desc: "Secure installation of front and rear dash cameras with concealed wiring." },
        { id: 15, title: "Brake Oil & Checkup", category: "MECHANICAL", img: img15, desc: "Complete brake inspection including pads, discs, and brake fluid." },
        { id: 16, title: "Odour Removal Treatment", category: "CAR CARE", img: img16, desc: "Advanced ozone-based odor removal treatment that permanently eliminates smells." },
        { id: 17, title: "Nitrogen Filling", category: "TYRE", img: img17, desc: "Nitrogen tyre filling helps maintain consistent pressure and improves fuel efficiency." },
        { id: 18, title: "Glass Scratch Removal", category: "GLASS", img: img18, desc: "Professional glass polishing to remove light scratches and wiper marks." },
    ];

    return (
        <div className="home-wrapper" style={{ paddingBottom: '80px' }}>
            {/* --- 1. NAVIGATION --- */}
            <nav className="nav-sticky">
                <div className="nav-content">
                    <h2 className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                        Car<span>Care</span>
                    </h2>
                    <div className="nav-links">
                        <Link to="/">Home</Link>
                        <Link to="/about">About</Link>
                        <Link to="/services" style={{ color: 'var(--white)' }}>Services</Link>
                        <Link to="/contact">Contact</Link>
                    </div>
                    <Link to="/book-service" className="yellow-btn">Book Now</Link>
                </div>
            </nav>

            {/* --- 2. HERO HEADER --- */}
            <header className="hero-section" style={{ padding: '80px 10% 40px' }}>
                <button className="badge-btn">Our Menu</button>
                <h1 className="hero-heading">
                    Our Expert <span className="text-gradient">Services</span>
                </h1>
                <p className="hero-subtext">
                    From basic maintenance to premium detailing, we provide specialized care for every inch of your vehicle.
                </p>
            </header>

            {/* --- 3. SERVICE GRID --- */}
            <section style={{ padding: '0 8%' }}>
                <div className="service-grid">
                    {serviceData.map((service) => (
                        <div className="service-card" key={service.id} onClick={() => setSelectedService(service)}>
                            <div className="price-badge">{service.category}</div>
                            <img src={service.img} alt={service.title} style={{ height: '200px', width: '100%', objectFit: 'cover' }} />
                            <div style={{ padding: '20px' }}>
                                <h3 style={{ color: 'var(--white)', marginBottom: '10px', fontSize: '1.2rem' }}>{service.title}</h3>
                                <p style={{ color: 'var(--pure-greys-100)', fontSize: '0.85rem' }}>Click to view details & benefits →</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- 4. DETAIL MODAL --- */}
            {selectedService && (
                <div className="booking-overlay" onClick={() => setSelectedService(null)}>
                    <div className="service-card detail-modal" onClick={e => e.stopPropagation()} 
                         style={{ display: 'flex', flexDirection: 'row', maxWidth: '900px', height: 'auto', padding: 0, overflow: 'hidden', cursor: 'default' }}>
                        
                        <div style={{ flex: 1, minHeight: '400px' }}>
                            <img src={selectedService.img} alt="Detail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>

                        <div style={{ flex: 1.2, padding: '40px', background: 'var(--richblack-800)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <span className="badge-btn" style={{ margin: '0 0 15px 0', width: 'fit-content', fontSize: '0.7rem' }}>
                                {selectedService.category} SERVICE
                            </span>
                            <h2 style={{ color: 'var(--white)', fontSize: '2rem', marginBottom: '20px' }}>{selectedService.title}</h2>
                            
                            <div style={{ marginBottom: '30px' }}>
                                <h4 style={{ color: 'var(--blue-100)', marginBottom: '10px', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>
                                    Detailed Overview
                                </h4>
                                <p style={{ color: 'var(--pure-greys-100)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                                    {selectedService.desc}
                                </p>
                            </div>

                            <div style={{ display: 'flex', gap: '15px' }}>
                                <Link to="/book-service" className="yellow-btn" style={{ padding: '12px 25px', textAlign: 'center' }}>
                                    Book This Service
                                </Link>
                                <button className="outline-btn" style={{ padding: '12px 25px' }} onClick={() => setSelectedService(null)}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Services;