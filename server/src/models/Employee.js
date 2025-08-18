// models/employee.js
const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  postalCode: String,
  country: String
});

const employeeSchema = new mongoose.Schema({
  _id: Number, // small numeric id
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  department: String,
  role: String,
  dateOfJoining: Date,
  status: String,
  address: addressSchema,
  salary: Number,
  notes: String
});

module.exports = mongoose.model("Employee", employeeSchema);
