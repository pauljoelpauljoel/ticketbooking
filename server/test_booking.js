const mongoose = require("mongoose");
const axios = require("axios");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

const testBooking = async () => {
    try {
        // Check GET Movies
        console.log("🔍 Checking GET /api/movies...");
        try {
            const getRes = await axios.get("http://127.0.0.1:5000/api/movies");
            console.log("✅ GET /api/movies Status:", getRes.status);
            console.log("✅ GET /api/movies Data Length:", getRes.data.length);
        } catch (err) {
            console.error("❌ GET /api/movies Failed:", err.message);
            if (err.response) console.error(err.response.data);
        }

        // 1. Get a movie ID
        await mongoose.connect(MONGO_URI);
        const movie = await mongoose.connection.db.collection("movies").findOne();
        if (!movie) {
            console.error("❌ No movies found in DB");
            process.exit(1);
        }
        console.log("🎬 Found movie for POST:", movie.title, movie._id);
        await mongoose.disconnect();

        // 2. Make API Request
        const payload = {
            movieId: movie._id,
            name: "API Tester",
            seats: 2,
        };

        console.log("🚀 Sending POST request to http://127.0.0.1:5000/api/bookings...");
        const response = await axios.post("http://127.0.0.1:5000/api/bookings", payload);

        console.log("✅ POST Response Status:", response.status);
        console.log("✅ POST Response Data:", response.data);

    } catch (error) {
        if (error.response) {
            console.error("❌ POST API Error:", error.response.status);
            console.error("❌ POST API Error Data:", error.response.data);
        } else {
            console.error("❌ Network/Script Error:", error.message);
        }
    }
};

testBooking();
