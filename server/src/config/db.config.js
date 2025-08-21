const mongoose = require('mongoose');

exports.ConnectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error("❌ MONGO_URI is not defined in .env");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI); // 👈 bas itna hi kaafi hai
    console.log(`✅ MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error("❌ DB connection failed:", error.message);
    process.exit(1);
  }
};
