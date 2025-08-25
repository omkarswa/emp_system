require("dotenv").config();
const app = require("./app");
const { ConnectDB } = require("./src/config/db.config");

const PORT = process.env.PORT || 5000;

// Start Server only after DB connects
(async () => {
  try {
    await ConnectDB();
    
    // Initialize server
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      
      // Import the controller after server starts to avoid circular dependencies
      const { initializeJsonFile } = require("./src/controllers/employee.controller");
      
      // Initialize JSON file after server is running
      initializeJsonFile()
        .then(() => console.log('✅ JSON file synced with database'))
        .catch(err => console.error('❌ Error syncing JSON file:', err.message));
    });
    
    // Handle server errors
    server.on('error', (error) => {
      console.error('Server error:', error);
      process.exit(1);
    });
    
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  }
})();
