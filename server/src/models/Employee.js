const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    department: { type: String },
    role: { type: String, default: "Employee" }, // Employee, Manager, Admin
    dateOfJoining: { type: Date, default: Date.now },
    status: { type: String, default: "Active" }, // Active, Inactive, On Leave
    address: {
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: String
    },
    salary: { type: Number },
    notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Employee", employeeSchema);
