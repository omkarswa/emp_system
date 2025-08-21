const mongoose = require("mongoose");

exports.ConnectDB = async () => {
    if (!process.env.MONGO_URI) {
        console.error("❌ MONGO_URI is not defined in .env");
        process.exit(1);
    }

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Failed: ${error.message}`);
        process.exit(1);
    }
};
