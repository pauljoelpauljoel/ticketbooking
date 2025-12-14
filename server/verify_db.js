const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

console.log("🔌 Attempting to connect to MongoDB...");

mongoose
    .connect(MONGO_URI)
    .then(async () => {
        console.log("✅ MongoDB connected successfully!");
        console.log(`📂 Database Name: ${mongoose.connection.db.databaseName}`);

        // List collections
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log("📚 Collections found:");
        collections.forEach(c => console.log(` - ${c.name}`));

        mongoose.connection.close();
        console.log("🔌 Connection closed.");
        process.exit(0);
    })
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1);
    });
