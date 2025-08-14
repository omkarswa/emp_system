const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

router.get("/add", async (req, res) => {
    try {
        const testEmployee = new Employee({
            name: "Frontend Demo",
            email: "frontend@example.com",
            position: "Tester",
            salary: 12345
        });
        await testEmployee.save();
        res.send("✅ Test employee added to MongoDB");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
