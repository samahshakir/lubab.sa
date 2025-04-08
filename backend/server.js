const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Configure the SMTP transport using Zoho's SMTP settings
const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'samah-s@lubab.sa', // Replace with your Zoho email
    pass: 'TsSkTj3x4quM', // Replace with your Zoho email password or app-specific password
  },
});

// Endpoint to handle the form submission
app.post('/send-email', (req, res) => {
  const { name, email, mobile, subject, message } = req.body;

  const mailOptions = {
    from: `"${name}" <${email}>`, 
    to: 'samah-s@lubab.sa', 
    subject: subject, // Subject line
    text: `Name: ${name}\nEmail: ${email}\nMobile: ${mobile}\nMessage: ${message}`, // Plain text body
    html: `<h2>Contact Form Submission</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Mobile:</strong> ${mobile}</p><p><strong>Message:</strong> ${message}</p>`, // HTML body
  };

  // Send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: 'Error sending email', error });
    }
    res.status(200).json({ message: 'Email sent successfully', info });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});