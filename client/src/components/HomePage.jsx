import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookingForm from './BookingForm';

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch movies from backend
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/movies`);
                setMovies(response.data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    const handleBookClick = (movie) => {
        setSelectedMovie(movie);
    };

    return (
        <div className="container fade-in">
            <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
                    <span style={{ color: '#e50914' }}>Book</span>MyFlix
                </h1>
                <p style={{ color: '#b3b3b3' }}>Experience Movies Like Never Before</p>
            </header>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '5rem' }}>Loading Movies...</div>
            ) : (
                <div className="movie-grid">
                    {movies.map((movie) => (
                        <div key={movie._id} className="movie-card">
                            <img src={movie.image} alt={movie.title} className="movie-poster" />
                            <div className="movie-info">
                                <h3 className="movie-title" title={movie.title}>{movie.title}</h3>
                                <div className="movie-details">
                                    <span className="movie-price">${movie.price}</span>
                                    <span style={{ fontSize: '0.8rem', color: '#777' }}>2h 15m</span>
                                </div>
                                <button
                                    className="btn btn-primary btn-block"
                                    onClick={() => handleBookClick(movie)}
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Booking Modal */}
            <BookingForm
                isOpen={!!selectedMovie}
                movie={selectedMovie}
                onClose={() => setSelectedMovie(null)}
            />
        </div>
    );
};

export default HomePage;
