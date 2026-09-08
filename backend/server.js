const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.log("MongoDB connection failed:", error.message);
    });

app.get("/", (req, res) => {
    res.send("MERN Backend is running!");
});

app.get("/api/students", (req, res) => {
    res.json([
        {
            id: 1,
            name: "Jay",
            course: "B.Tech"
        },
        {
            id: 2,
            name: "Student 2",
            course: "B.Tech"
        }
    ]);
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
