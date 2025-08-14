const express = require("express");
const router = express.Router();

// Employees API
router.use("/employees", require("./employee.routes"));
router.use("/test", require("./test.routes"));

module.exports = router;
