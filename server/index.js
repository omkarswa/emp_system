require("dotenv").config({
    path: ".env",
    override: true,
    debug: true,
});

const app = require("./src/app");
const { ConnectDB } = require("./src/config/db.config");

// Connect to MongoDB
ConnectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
