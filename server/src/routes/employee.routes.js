const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controller');

// Get all employees
router.get('/', employeeController.getAllEmployees);

// Get single employee
router.get('/:id', employeeController.getEmployeeById);

// Create new employee
router.post('/', employeeController.createEmployee);

// Update employee
router.put('/:id', employeeController.updateEmployee);

// Delete employee
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;
