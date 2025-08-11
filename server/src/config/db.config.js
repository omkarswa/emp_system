const mongoose = require('mongoose');

exports.ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`The DB is accessed successfully with ${mongoose.connection.host}`);
    } catch (error) {
        console.log(error.message);
        await mongoose.disconnect();
        process.exit(1);
    }
};
