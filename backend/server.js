require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CORS_URL,
    methods: ['GET', 'POST', 'PUT'],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(bodyParser.json());

// Database connection
require("./config/db");

// Custom middleware
const authMiddleware = require("./middleware/authMiddleware");

const initializeAdminUser = require("./initializers/adminUser");
initializeAdminUser();

// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/api/applications", require("./routes/jobApplicationRoutes"));
app.use("/api", require("./routes/userRoutes"));

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));