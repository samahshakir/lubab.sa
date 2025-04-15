/* eslint-disable */
// server.js - updated to allow all users to register and login
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
// Authentication packages
const bcrypt = require("bcryptjs");
const formidable = require("express-formidable");
const jwt = require("jsonwebtoken");
const JobApplication = require("./models/JobApplication");
const app = express();
app.use(
  cors({
    origin: process.env.CORS_URL,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// const ApplicationSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   phone: String,
//   position: String,
//   experience: String,
//   message: String,
//   dateSubmitted: { type: Date, default: Date.now },
// });

// const Application = mongoose.model("Application", ApplicationSchema);

// Updated User schema to remove isAdmin default and add email field
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema);

// Setup nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  secure: true,
  port: 465,
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_PASSWORD,
  },
});

// Auth middleware - now checks for any authenticated user
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Initialize admin user on startup - only if no admin exists
(async () => {
  try {
    const adminExists = await User.findOne({ username: "admin" });
    if (
      !adminExists &&
      process.env.DEFAULT_ADMIN_USERNAME &&
      process.env.DEFAULT_ADMIN_PASSWORD
    ) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(
        process.env.DEFAULT_ADMIN_PASSWORD,
        salt
      );

      await new User({
        username: process.env.DEFAULT_ADMIN_USERNAME,
        email: "info@lubab.sa", // Default email for admin
        password: hashedPassword,
        isAdmin: true,
      }).save();

      console.log("Default admin user created");
    }
  } catch (err) {
    console.error("Error initializing admin user:", err);
  }
})();

// New registration route for all users
app.post("/auth/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if username already exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({
        message:
          existingUser.username === username
            ? "Username already exists"
            : "Email already registered",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      // If username is admin, set isAdmin to true
      isAdmin: username === "admin",
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      userType: username === "admin" ? "admin" : "regular",
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Updated login route for all users
app.post("/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
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
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        isAdmin: user.isAdmin,
      },
      // Send redirect information based on username
      redirectTo: username === "admin" ? "/admin-dashboard" : "/applications",
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/api/user/:id/is-admin", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("isAdmin");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ isAdmin: user.isAdmin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

//admin only route
app.get('/api/applications', async (req, res) => {
  try {
    const applications = await JobApplication.find({})
      .select('personal.firstName personal.lastName skills status createdAt jobSlug userId')
      .sort({ createdAt: -1 });
    
    res.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get application by slug
app.get('/api/applications/:slug', async (req, res) => {
  try {
    const application = await JobApplication.findOne({ jobSlug: req.params.slug });
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    res.json(application);
  } catch (error) {
    console.error(`Error fetching application with slug ${req.params.slug}:`, error);
    res.status(500).json({ message: 'Server error' });
  }
});

//Get username by ID
app.get("/api/username/by-id/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).select("username");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ username: user.username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/applications/userId", async (req, res) => {
  const { userId } = req.body;

  try {
    const objectId = new mongoose.Types.ObjectId(userId); // Convert to ObjectId
    const application = await JobApplication.findOne({ userId: objectId });

    if (!application) {
      console.log("not found")
      return res.status(404).json({ message: "No application found for this user" });
    }

    return res.status(200).json(application);
  } catch (error) {
    console.error("Error fetching application:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


app.post("/api/check-drafts", async (req, res) => {
  const { userId, jobSlug } = req.body;

  try {
    // Check if the application exists with the provided userId, jobSlug, and status "draft"
    const application = await JobApplication.findOne({
      userId,
      jobSlug,
      status: "draft",
    });

    if (application) {
      // If application is found, return the application data
      return res.status(200).json({
        message: "Application exists",
        application, // Returning the whole application data
      });
    } else {
      // If no draft application is found
      return res.status(201).json({ message: "No draft application found" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/applications/draft", async (req, res) => {
  try {
    const {
      userId,
      jobSlug,
      status = "draft",
      personal = {},
      education = [],
      experience = [],
      skills = { skillList: [], proficiencyLevels: {} },
      links = {},
    } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Check if a draft already exists for this user/job
    const existingDraft = await JobApplication.findOne({ userId, jobSlug, status: "draft" });

    const applicationData = {
      userId,
      jobSlug: jobSlug || "",
      status,
      personal: {
        firstName: personal.firstName || "",
        lastName: personal.lastName || "",
        email: personal.email || "",
        phone: personal.phone || "",
        address: personal.address || "",
        city: personal.city || "",
        state: personal.state || "",
        zipCode: personal.zipCode || "",
        country: personal.country || "",
        coverLetter: personal.coverLetter || "",
      },
      education: education || [],
      experience: experience || [],
      skills: {
        skillList: skills.skillList || [],
        proficiencyLevels: skills.proficiencyLevels || {},
      },
      links: {
        linkedin: links.linkedin || "",
        portfolio: links.portfolio || "",
        github: links.github || "",
        other: links.other || "",
      },
    };

    if (existingDraft) {
      // Update existing draft
      await JobApplication.updateOne({ _id: existingDraft._id }, { $set: applicationData });
      return res.status(200).json({ message: "Draft updated successfully" });
    } else {
      // Create new draft
      const newDraft = new JobApplication(applicationData);
      await newDraft.save();
      return res.status(200).json({ message: "Draft saved successfully" });
    }
  } catch (err) {
    console.error("Error saving draft:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Fetch a previous application
// app.get("/api/applications/:userId", async (req, res) => {
//   try {
//     const { userId } = req.params;
//     console.log(userId)
//     const application = await JobApplication.findOne({ userId });
//     res.json(application);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

app.post("/api/applications/submit", async (req, res) => {
  try {
    // Destructure the data from req.body (not req.fields)
    const { userId, personal, education, experience, skills, links, jobSlug } = req.body;

    // Validate that userId exists
    if (!userId) {
      return res.status(400).json({ message: "Missing userId" });
    }

    // No need to parse the data since it was sent as JSON
    const application = new JobApplication({
      userId: new mongoose.Types.ObjectId(userId),
      personal,
      education,
      experience,
      skills,
      links,
      jobSlug,
      status: "submitted",
    });

    // Save the application to the database
    await application.save();

    res.status(201).json({
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.error("Error submitting job application:", error);
    res.status(500).json({ message: "Server error", error });
  }
});


// // Regular user endpoints - using standard authMiddleware
// app.get("/user/profile", authMiddleware, async (req, res) => {
//   try {
//     // Return user data without sensitive information
//     const user = await User.findById(req.user._id).select("-password");
//     res.status(200).json({ user });
//   } catch (err) {
//     console.error("Error fetching user profile:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// Verify token endpoint - works for all users
app.get("/auth/verify", authMiddleware, (req, res) => {
  res.status(200).json({
    user: {
      id: req.user._id,
      username: req.user.username,
      isAdmin: req.user.isAdmin,
    },
    // Include redirect information based on username
    redirectTo:
      req.user.username === "admin" ? "/admin-dashboard" : "/applications",
  });
});

app.post("/send-message", async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  // Create the email content
  const mailOptions = {
    from: "samah-s@lubab.sa", // Your Zoho email
    to: "samah.lubab@gmail.com", // Your Zoho email
    replyTo: email, // Reply to the user's email
    subject: subject || "New Message from Contact Form",
    text: `You have received a new message from your website contact form:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    res.status(200).json({ message: "Message sent successfully!" });
  } catch (err) {
    console.error("Error sending email:", err);
    res
      .status(500)
      .json({ message: "Failed to send message", error: err.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
