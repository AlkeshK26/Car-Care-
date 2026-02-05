import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import BookingPage from './pages/BookingPage';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Admin from './pages/AdminPanel';
import OwnerDashboard from './pages/OwnerDashboard'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      {/* </Routes>
      <Navbar />
      <Routes> */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/book-service" element={<BookingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/owner-dashboard" element={<OwnerDashboard />} />

      </Routes>
    </Router>
  );
}

export default App;