const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Employee = require("../models/Employee");
const employees = require("./src/data/employees.json"); // 👈 put your JSON in employees.json file

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB connected, seeding data...");
    await Employee.deleteMany(); // clear old data
    await Employee.insertMany(employees);
    console.log("✅ Employees seeded successfully!");
    process.exit();
  })
  .catch(err => console.error("❌ MongoDB error:", err));
