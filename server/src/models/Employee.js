const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  department: String,
  role: String,
  dateOfJoining: Date,
  status: String,
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  },
  salary: Number,
  notes: String
});

module.exports = mongoose.model("Employee", EmployeeSchema);
