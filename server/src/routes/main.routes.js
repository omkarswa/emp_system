const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// ✅ Health Check Route
router.get("/test", (req, res) => {
    let mongoStatus = "❌ MongoDB not connected";

    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    switch (mongoose.connection.readyState) {
        case 0:
            mongoStatus = "❌ MongoDB disconnected";
            break;
        case 1:
            mongoStatus = "✅ MongoDB connected";
            break;
        case 2:
            mongoStatus = "🔄 MongoDB connecting...";
            break;
        case 3:
            mongoStatus = "⚠️ MongoDB disconnecting...";
            break;
    }

    res.json({
        message: "✅ Backend is running",
        mongo: mongoStatus,
        timestamp: new Date().toISOString()
    });
});

module.exports = router;
