require("dotenv").config({ path: __dirname + "/../../.env" });
const fs = require("fs");
const mongoose = require("mongoose");
const Employee = require("../models/Employee");

async function importData() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB Connected");

        const employees = JSON.parse(fs.readFileSync(__dirname + "/../data/employees.json", "utf-8"));
        await Employee.insertMany(employees);

        console.log("🎉 Employees Imported Successfully!");
        mongoose.connection.close();
    } catch (error) {
        console.error("❌ Error importing data:", error);
        process.exit(1);
    }
}

importData();
