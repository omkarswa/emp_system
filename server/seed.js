require("dotenv").config();
const mongoose = require("mongoose");
const Employee = require("./models/Employee.model");
const employees = require("./employees.json"); // Load JSON data

async function seedData() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB");

        await Employee.insertMany(employees);
        console.log(`✅ Inserted ${employees.length} employees successfully`);

        process.exit();
    } catch (err) {
        console.error("❌ Error inserting data:", err.message);
        process.exit(1);
    }
}

seedData();
