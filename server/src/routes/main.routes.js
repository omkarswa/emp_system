const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// ✅ Test backend + MongoDB connection (without TestData)
router.get("/test", (req, res) => {
    const mongoStatus = mongoose.connection.readyState === 1
        ? "✅ MongoDB connected"
        : "❌ MongoDB not connected";

    res.json({
        message: "✅ Backend is connected to frontend!",
        mongo: mongoStatus
    });
});

module.exports = router;
