// models/Employee.js
const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  _id: { type: Number, required: true }, // numeric id from JSON
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  department: String,
  role: String,
  status: { type: String, default: "Active" }
});

module.exports = mongoose.model("Employee", employeeSchema);
