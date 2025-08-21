require("dotenv").config();
const app = require("./app");
const { ConnectDB } = require("./src/config/db.config");

const PORT = process.env.PORT || 5000;

// Start Server only after DB connects
(async () => {
  try {
    await ConnectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    process.exit(1); // stop app
  }
})();
