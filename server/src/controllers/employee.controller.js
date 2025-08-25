const Employee = require('../models/Employee');
const fs = require('fs').promises;
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/employees.json');

// Track if we're currently syncing to prevent loops
let isSyncing = false;

// Helper function to sync with JSON file
async function syncWithJsonFile() {
    if (isSyncing) return; // Prevent recursive syncs
    isSyncing = true;
    
    try {
        const employees = await Employee.find({});
        const plainEmployees = employees.map(doc => ({
            _id: doc._id,
            name: doc.name,
            email: doc.email,
            phone: doc.phone,
            department: doc.department,
            role: doc.role,
            status: doc.status
        }));
        
        // Only write if there are changes
        const currentData = JSON.stringify(plainEmployees, null, 2);
        let existingData = '[]';
        
        try {
            existingData = await fs.readFile(DATA_FILE, 'utf8');
        } catch (error) {
            if (error.code !== 'ENOENT') throw error;
            // File doesn't exist, will be created
        }
        
        if (currentData !== existingData) {
            await fs.writeFile(DATA_FILE, currentData);
            console.log('✅ Successfully synced with JSON file');
        }
    } catch (error) {
        console.error('❌ Error syncing with JSON file:', error.message);
        throw error;
    } finally {
        isSyncing = false;
    }
}

// Get all employees
exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({});
        res.json(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get single employee
exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(employee);
    } catch (error) {
        console.error('Error fetching employee:', error);
        res.status(500).json({ message: error.message });
    }
};

// Create new employee
exports.createEmployee = async (req, res) => {
    try {
        // Generate a new ID if not provided
        if (!req.body._id) {
            const count = await Employee.countDocuments();
            req.body._id = count + 1;
        }
        
        const employee = new Employee(req.body);
        const newEmployee = await employee.save();
        
        // Sync with JSON file after creation
        await syncWithJsonFile().catch(console.error);
        
        res.status(201).json(newEmployee);
    } catch (error) {
        console.error('Error creating employee:', error);
        res.status(400).json({ message: error.message });
    }
};

// Update employee
exports.updateEmployee = async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        
        // Sync with JSON file after update
        await syncWithJsonFile().catch(console.error);
        
        res.json(updatedEmployee);
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(400).json({ message: error.message });
    }
};

// Delete employee
exports.deleteEmployee = async (req, res) => {
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        
        // Sync with JSON file after deletion
        await syncWithJsonFile().catch(console.error);
        
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({ message: error.message });
    }
};

// Initialize JSON file with existing data
exports.initializeJsonFile = async () => {
    try {
        await syncWithJsonFile();
        console.log('✅ JSON file initialized with database data');
        return true;
    } catch (error) {
        console.error('❌ Error initializing JSON file:', error.message);
        return false;
    }
};
