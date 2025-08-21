const express = require("express");
const Employee = require("../models/Employee");
const router = express.Router();

// GET all employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single employee by ID
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findOne({ _id: req.params.id });
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ADD employee
router.post("/", async (req, res) => {
  try {
    const newEmp = new Employee(req.body);
    await newEmp.save();
    res.status(201).json(newEmp);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE employee
router.put("/:id", async (req, res) => {
  try {
    const updated = await Employee.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Employee not found" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE employee
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Employee.findOneAndDelete({ _id: req.params.id });
    if (!deleted) return res.status(404).json({ message: "Employee not found" });
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
