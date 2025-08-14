// app.js
const express = require("express");
const cors = require("cors");
const TestData = require("./models/TestData");

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.get("/api/v1/test", async (req, res) => {
    res.json({ message: "Backend is running!" });
});

app.post("/api/v1/save-test", async (req, res) => {
    const { message, show } = req.body;
    const testData = new TestData({ message, show });
    await testData.save();
    res.json({ success: true, message: "Data saved!" });
});

module.exports = app;  // ✅ export app without listen
