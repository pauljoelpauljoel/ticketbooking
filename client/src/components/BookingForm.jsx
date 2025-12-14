import React, { useState } from 'react';

const BookingForm = ({ isOpen, onClose, movie }) => {
  const [name, setName] = useState('');
  const [seats, setSeats] = useState(1);

  if (!isOpen || !movie) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || seats < 1) {
      alert('Please fill in all valid details!');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          movieId: movie._id,
          name,
          seats,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`🎉 Booking Confirmed!\n\nMovie: ${movie.title}\nName: ${name}\nSeats: ${seats}\nTotal Price: $${movie.price * seats}`);
        // Reset and close
        setName('');
        setSeats(1);
        onClose();
      } else {
        alert(`❌ Booking Failed: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Booking Error:', error);
      alert('❌ Network Error: Could not connect to server.');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>&times;</button>

        <h2>Book Tickets</h2>
        <p style={{ color: '#b3b3b3', marginBottom: '1.5rem' }}>For <strong>{movie.title}</strong></p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="name">Your Name</label>
            <input
              id="name"
              type="text"
              className="form-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="seats">Number of Seats</label>
            <input
              id="seats"
              type="number"
              min="1"
              max="10"
              className="form-input"
              value={seats}
              onChange={(e) => setSeats(parseInt(e.target.value))}
            />
          </div>

          <div style={{ marginBottom: '1.5rem', marginTop: '1rem', padding: '10px', background: '#252530', borderRadius: '8px' }}>
            <span style={{ color: '#b3b3b3' }}>Total:</span>
            <strong style={{ float: 'right', color: '#f5c518' }}>${(movie.price * seats).toFixed(2)}</strong>
          </div>

          <button type="submit" className="btn btn-primary btn-block">Confirm Booking</button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
