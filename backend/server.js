// server.js - with added authentication code (keeping existing code intact)
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
// Add these packages for authentication
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors({
  origin: process.env.CORS_URL, 
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"], // Added Authorization header
}));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const ApplicationSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  position: String,
  experience: String,
  message: String,
  dateSubmitted: { type: Date, default: Date.now }
});

const Application = mongoose.model("Application", ApplicationSchema);

// Add User schema for admin authentication
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", UserSchema);

console.log(process.env.MONGO_URI);
console.log(process.env.ZOHO_EMAIL);
console.log(process.env.ZOHO_PASSWORD);

// Setup nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  secure: true,
  port: 465,
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_PASSWORD 
  }
});

// Add auth middleware
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: 'Access denied' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Initialize admin user on startup - only if no admin exists
(async () => {
  try {
    const adminExists = await User.findOne({ isAdmin: true });
    if (!adminExists && process.env.DEFAULT_ADMIN_USERNAME && process.env.DEFAULT_ADMIN_PASSWORD) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(process.env.DEFAULT_ADMIN_PASSWORD, salt);
      
      await new User({
        username: process.env.DEFAULT_ADMIN_USERNAME,
        password: hashedPassword,
        isAdmin: true
      }).save();
      
      console.log('Default admin user created');
    }
  } catch (err) {
    console.error('Error initializing admin user:', err);
  }
})();

// Login route for authentication
app.post("/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    // Check if the user is an admin
    if (!user.isAdmin) {
      return res.status(403).json({ message: "Only admin users can sign in" });
    }
    
    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        isAdmin: user.isAdmin
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: "Server error" });
  }
});

// Endpoint to get all applications - Adding auth middleware
app.get("/applications", authMiddleware, async (req, res) => {
  try {
    const applications = await Application.find();
    res.status(200).json(applications);
  } catch (err) {
    console.error('Error fetching applications:', err);
    res.status(500).json({ message: "Failed to fetch applications", error: err.message });
  }
});

// Verify token endpoint
app.get("/auth/verify", authMiddleware, (req, res) => {
  res.status(200).json({
    user: {
      id: req.user._id,
      username: req.user.username,
      isAdmin: req.user.isAdmin
    }
  });
});

app.post("/send-message", async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  console.log(req.body)

  // Create the email content
  const mailOptions = {
    from: 'samah-s@lubab.sa',  // Your Zoho email
    to: 'samah.lubab@gmail.com', // Your Zoho email
    replyTo: email, // Reply to the user's email
    subject: subject || "New Message from Contact Form",
    text: `You have received a new message from your website contact form:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`
  };


  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    res.status(200).json({ message: "Message sent successfully!" });
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).json({ message: "Failed to send message", error: err.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));