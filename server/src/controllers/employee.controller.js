const Employee = require("../models/Employee");

// POST - Create Employee
exports.createEmployee = async (req, res) => {
    try {
        const employee = new Employee(req.body);
        await employee.save();
        res.status(201).json({
            message: "Employee created successfully",
            employee
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// GET - Fetch All Employees
exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET - Fetch Single Employee
exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findOne({ _id: req.params.id });
        if (!employee) return res.status(404).json({ message: "Employee not found" });
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// PUT - Update Employee
exports.updateEmployee = async (req, res) => {
    try {
        const updatedEmployee = await Employee.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedEmployee) return res.status(404).json({ message: "Employee not found" });
        res.json({
            message: "Employee updated successfully",
            updatedEmployee
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE - Remove Employee
exports.deleteEmployee = async (req, res) => {
    try {
        const deletedEmployee = await Employee.findOneAndDelete({ _id: req.params.id });
        if (!deletedEmployee) return res.status(404).json({ message: "Employee not found" });
        res.json({ message: "Employee deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
