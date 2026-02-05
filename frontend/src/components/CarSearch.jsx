import React, { useState } from 'react';
import axios from 'axios';

const CarSearch = ({ onSelectCar }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length > 1) {
            try {
                // Backend URL check karein
                const res = await axios.get(`http://localhost:5000/api/cars/search?query=${value}`);
                setResults(res.data);
            } catch (err) {
                console.error("Search error", err);
            }
        } else {
            setResults([]);
        }
    };

    return (
        <div style={{ position: 'relative', width: '100%' }}>
            <input
                type="text"
                placeholder="Search Car (e.g. Tata, Kia...)"
                value={query}
                onChange={handleSearch}
                className="auth-input"
            />
            {results.length > 0 && (
                <ul style={{ 
                    position: 'absolute', background: '#161D29', border: '1px solid #2C333F', 
                    width: '100%', zIndex: 100, listStyle: 'none', padding: '10px', borderRadius: '8px' 
                }}>
                    {results.map((car, index) => (
                        <li 
                            key={index} 
                            onClick={() => {
                                onSelectCar(car.Brand, car.Model);
                                setQuery(`${car.Brand} ${car.Model}`);
                                setResults([]);
                            }}
                            style={{ cursor: 'pointer', padding: '8px', color: 'white' }}
                        >
                            {car.Brand} - {car.Model}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

// YEH LINE SABSE ZAROORI HAI
export default CarSearch;