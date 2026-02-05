import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import myVideo from '../assets/carwash.mp4';

const Home = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const handleBookingClick = () => {
    if (isLoggedIn) {
      navigate('/book-service');
    } else {
      navigate('/login');
    }
  };

  // Navbar.jsx mein handleDashboardClick function add karein
  const handleDashboardClick = () => {
    const role = localStorage.getItem("userRole");

    if (role === "admin") {
      navigate("/admin");
    } else if (role === "garage_owner") {
      navigate("/owner-dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="home-wrapper">
      {/* --- 1. NAVIGATION --- */}
      <nav className="nav-sticky">
        <div className="nav-content">
          <h2 className="logo" onClick={() => navigate('/')}>
            Car<span>Care</span>
          </h2>

          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/services">Services</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className="nav-auth">
            {isLoggedIn ? (
              <>
                <button onClick={handleBookingClick} className="yellow-btn">
                  Book a Service
                </button>

                <button onClick={handleDashboardClick} className="yellow-btn">
                  Dashboard
                </button>
                <button
                  className="logout-item" // Using your specific red-hover class from App.css
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: '500' }}
                  onClick={() => { localStorage.clear(); window.location.reload(); }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="outline-btn" style={{ padding: '8px 18px', border: 'none' }}>Log in</Link>
                <Link to="/signup" className="yellow-btn">Sign up</Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* --- 2. HERO SECTION --- */}
      <header className="hero-section">
        <div className="hero-content">
          <button className="badge-btn">✨ Premium Car Detailing in Your City</button>

          <h1 className="hero-heading">
            Professional Care for <br />
            <span className="text-gradient">Your Beloved Car</span>
          </h1>

          <p className="hero-subtext">
            Experience world-class doorstep car washing. Trusted by enthusiasts who love their machines as much as we do.
          </p>

          <div className="hero-btns" style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <button onClick={handleBookingClick} className="yellow-btn-large">
              {isLoggedIn ? "Book a Service" : "Get Started Now"}
            </button>

            <Link to={isLoggedIn ? "/dashboard" : "/about"} className="outline-btn">
              {isLoggedIn ? "View Dashboard" : "Learn More"}
            </Link>
          </div>

          <div className="trust-stats">
            <div className="stat-item"><span>4.9/5</span> ⭐ Rated</div>
            <div className="stat-item"><span>5,000+</span> Cars Detailed</div>
            <div className="stat-item"><span>100%</span> Eco Products</div>
          </div>
        </div>

        {/* --- 3. VIDEO SHOWCASE --- */}
        <div className="video-container video-glow">
          <video width="100%" height="auto" autoPlay loop muted className="hero-video">
            <source src={myVideo} type="video/mp4" />
          </video>
        </div>
      </header>

      {/* --- 4. SERVICES SECTION --- */}
      <section className="services-section">
        <h2 className="section-title">Our Best Selling Services</h2>
        <div className="service-grid">

          <div className="service-card">
            <div className="price-badge">Starting @ ₹499</div>
            <img src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=500" alt="Interior" />
            <h3>Deep Interior Cleaning</h3>
            <p>Sanitization, vacuuming, and leather conditioning for a fresh feel.</p>
          </div>

          <div className="service-card">
            <div className="price-badge" style={{ borderColor: '#FFD60A', color: '#FFD60A' }}>Most Popular</div>
            <img src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=500" alt="Exterior" />
            <h3>Full Body Foam Wash</h3>
            <p>High-pressure foam wash with wax finish for that showroom shine.</p>
          </div>

          <div className="service-card">
            <div className="price-badge">Starting @ ₹1999</div>
            <img src="https://images.unsplash.com/photo-1552930294-6b595f4c2974?q=80&w=500" alt="Ceramic" />
            <h3>Ceramic Protection</h3>
            <p>Advanced paint protection that lasts for months with a mirror finish.</p>
          </div>
        </div>
      </section>

      {/* --- 5. TESTIMONIALS --- */}
      <section className="testimonials">
        <h2 className="section-title">What Owners Say</h2>
        <div className="testi-grid">
          <div className="testi-card">
            <p>"Best doorstep service! My Fortuner looks brand new every time."</p>
            <h4>- Vikram Singh, Noida</h4>
          </div>
          <div className="testi-card">
            <p>"Eco-friendly products and super professional staff. Highly recommended."</p>
            <h4>- Ananya Iyer, Bangalore</h4>
          </div>
        </div>
      </section>

      {/* --- 6. FOOTER STRIP --- */}
      <div className="location-strip">
        <p>📍 Now Serving: Delhi NCR • Mumbai • Bangalore • Pune • Indore</p>
        <button className="cta-small" onClick={() => navigate('/contact')}>Check Availability</button>
      </div>
    </div>
  );
};

export default Home;