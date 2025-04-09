require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors({
  origin: process.env.CORS_URL, 
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
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

// Endpoint to get all applications
app.get("/applications", async (req, res) => {
  try {
    const applications = await Application.find();
    res.status(200).json(applications);
  } catch (err) {
    console.error('Error fetching applications:', err);
    res.status(500).json({ message: "Failed to fetch applications", error: err.message });
  }
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
