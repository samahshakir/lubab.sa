require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Email sending route
app.post('/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
        host: "smtp.zoho.com",
        port: 465,
        secure: true, // True for SSL
        auth: {
          user: "info@lubab.sa", // Your Zoho email
          pass: "YOUR_ZOHO_APP_PASSWORD", // Use an App Password if 2FA is enabled
        },
      });

    let mailOptions = {
      from: process.env.EMAIL,
      to: 'info@lubab.sa', // Your receiving email
      subject: subject,
      text: `From: ${name} \nEmail: ${email} \n\n${message}`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Email sent successfully!' });

  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
