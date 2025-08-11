require("dotenv").config({
    path: ".env",
    override: true,
    debug: true,
});

const app = require("./src/app");
const { ConnectDB } = require("./src/config/db.config");

ConnectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => { // ✅ match case here
    console.log(`Server is running on port ${PORT}`);
});
