const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5001;

// Minimal root route
app.get("/", (req, res) => res.send("Minimal Server Running"));

app.listen(PORT, () => {
    console.log(`Minimal server running on ${PORT}`);

    // Connect Mongo
    mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("Mongo connected"))
        .catch(err => console.error("Mongo error:", err));
});
