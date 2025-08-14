const express = require("express");
const mongoose = require("mongoose");
const TestData = require("../models/TestData");
const router = express.Router();

// Test backend + MongoDB connection
router.get("/test", (req, res) => {
    const mongoStatus = mongoose.connection.readyState === 1 ? "✅ MongoDB connected" : "❌ MongoDB not connected";
    res.json({
        message: "✅ Backend is connected to frontend!",
        mongo: mongoStatus
    });
});

// Save sample data to MongoDB
router.post("/save-test", async (req, res) => {
    try {
        const { message } = req.body;
        const data = new TestData({ message });
        await data.save();
        res.json({ success: true, message: "✅ Data saved to MongoDB!", data });
    } catch (error) {
        res.status(500).json({ success: false, message: "❌ Failed to save data", error: error.message });
    }
});

module.exports = router;
