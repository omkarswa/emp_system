const express = require("express");
const router = express.Router();
const { createEmployee, getEmployees } = require("../controllers/employee.controller");

router.post("/", createEmployee);
router.get("/", getEmployees);

module.exports = router;
