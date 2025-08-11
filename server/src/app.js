const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const morgan = require("morgan")


// Middleware
app.use(express.json({limit: "10mb"}))
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use(morgan("dev"))


// Routes
app.use("/api/v1", require("./routes/main.routes"))

module.exports = app;