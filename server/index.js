require("dotenv").config();
const app = require("./app");
const { ConnectDB } = require("./src/config/db.config");

// connect to MongoDB
ConnectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
