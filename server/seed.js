// seed.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

// Load env variables
dotenv.config();

// Import Employee model
const Employee = require("../models/Employee");

// Load employees.json dynamically
const employeesPath = path.join(__dirname, "data", "employees.json");
const employees = JSON.parse(fs.readFileSync(employeesPath, "utf-8"));

const seedEmployees = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected...");

    // Clear existing data
    await Employee.deleteMany();
    console.log("🗑 Old employees removed");

    // Insert new data
    await Employee.insertMany(employees);
    console.log("✅ Employees seeded successfully!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding employees:", error);
    process.exit(1);
  }
};

seedEmployees();
