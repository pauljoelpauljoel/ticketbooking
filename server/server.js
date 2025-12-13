// server.js

// ================== IMPORTS ==================
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// ================== APP INIT ==================
const app = express();

// ================== MIDDLEWARE ==================
app.use(cors());
app.use(express.json()); // to parse JSON requests

// ================== MONGODB CONNECTION ==================
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));


// ================== MOVIE MODEL ==================
const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const Movie = mongoose.models.Movie || mongoose.model("Movie", movieSchema);

// ================== BOOKING MODEL ==================
const bookingSchema = new mongoose.Schema(
  {
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    name: { type: String, required: true },
    seats: { type: Number, required: true, min: 1 },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

// ================== ROUTES ==================

// Root route
app.get("/", (req, res) => {
  res.send("🎬 Book My Flix Backend is Running");
});

// GET all movies
app.get("/api/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch movies",
      error: error.message,
    });
  }
});

// GET all bookings
app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find().populate('movieId', 'title image price').sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
});

// POST a new booking
app.post("/api/bookings", async (req, res) => {
  console.log("📥 Received booking request:", req.body);
  try {
    const { movieId, name, seats } = req.body;

    if (!movieId || !name || !seats) {
      console.error("❌ Missing fields:", { movieId, name, seats });
      return res.status(400).json({ message: "Missing required fields" });
    }

    const movie = await Movie.findById(movieId);
    if (!movie) {
      console.error("❌ Movie not found for ID:", movieId);
      return res.status(404).json({ message: "Movie not found" });
    }

    const totalPrice = movie.price * seats;

    const newBooking = new Booking({
      movieId,
      name,
      seats,
      totalPrice,
    });

    await newBooking.save();
    console.log("✅ Booking saved:", newBooking);

    res.status(201).json({
      message: "Booking confirmed successfully",
      booking: newBooking,
    });
  } catch (error) {
    console.error("❌ Booking Server Error:", error);
    res.status(500).json({
      message: "Booking failed",
      error: error.message,
    });
  }
});

// ================== SERVER START ==================
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
