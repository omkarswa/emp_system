const mongoose = require("mongoose");

const testDataSchema = new mongoose.Schema({
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    show: { type: String } // or Date if you want
});

module.exports = mongoose.model("TestData", testDataSchema);
