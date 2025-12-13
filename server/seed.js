const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

mongoose
    .connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB connected for seeding"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

const movieSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
    },
    { timestamps: true }
);

const Movie = mongoose.models.Movie || mongoose.model("Movie", movieSchema);

const movies = [
    {
        title: "Inception",
        image: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
        price: 12,
    },
    {
        title: "Interstellar",
        image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        price: 14,
    },
    {
        title: "The Dark Knight",
        image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        price: 15,
    },
    {
        title: "Avatar",
        image: "https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg",
        price: 13,
    },
    {
        title: "Avengers: Endgame",
        image: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
        price: 16,
    },
];

const seedDB = async () => {
    try {
        await Movie.deleteMany({});
        console.log("🗑️  Cleared existing movies");

        await Movie.insertMany(movies);
        console.log("🎉 Movies seeded successfully!");

        mongoose.connection.close();
    } catch (err) {
        console.error("Error seeding DB:", err);
        mongoose.connection.close();
    }
};

seedDB();
