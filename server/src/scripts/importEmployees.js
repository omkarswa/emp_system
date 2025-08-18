const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Employee = require("../models/Employee");

dotenv.config();

// connect to DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// read employees.json
const employees = JSON.parse(fs.readFileSync("data/employees.json", "utf-8"));

const importData = async () => {
  try {
    await Employee.deleteMany(); // clear old data
    await Employee.insertMany(employees);
    console.log("Employees Imported ✅");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

importData();
