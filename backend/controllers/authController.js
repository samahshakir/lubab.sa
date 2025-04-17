const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { sendEmail } = require("../services/emailService");


// Register user
exports.register = async (req, res) => {
  // New registration route for all users
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
};

// Login user
exports.login = async (req, res) => {
  // Updated login route for all users
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
        console.log("Password valid?", isPasswordValid);
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
};

// Verify token
exports.verifyToken = (req, res) => {
  // Your token verification logic here
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

};

async function sendOtpToEmail(email) {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');
  
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins from now
  
    // Store in DB
    user.otp = otp;
    user.otpExpiresAt = otpExpiresAt;
    await user.save();
  
    // Send mail
    sendEmail({
      from: 'samah-s@lubab.sa',
      to: email,
      subject: 'Your OTP for Password Reset',
      text: `Username: ${user.username},\n\nYour OTP is: ${otp}.\nIt will expire in 10 minutes.\n\nIf you didn’t request this, feel free to ignore this email.`,
    });
  
    return true;
}

// Send OTP
exports.sendOtp = async (req, res) => {
  // Your send OTP logic here
    const { email } = req.body;
    try {
      await sendOtpToEmail(email);
      res.status(200).json({ message: 'OTP sent to email' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }

};

// Verify OTP
exports.verifyOtp = async (req, res) => {
  // Your verify OTP logic here
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
  
    if (!user) return res.status(404).json({ error: 'User not found' });
  
    const now = new Date();
    if (user.otp !== otp || user.otpExpiresAt < now) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }
  
    // OTP verified
    // You can now allow user to reset password
    return res.status(200).json({ message: 'OTP verified' });

  
};

// Reset password
exports.resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;
    
    try {
      const user = await User.findOne({ email });
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      // Verify OTP first
      const now = new Date();
      if (user.otp !== otp || user.otpExpiresAt < now) {
        return res.status(400).json({ error: 'Invalid or expired OTP' });
      }
      
      // Hash the new password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
      
      // Update user's password and clear OTP fields
      user.password = hashedPassword;
      user.otp = null;
      user.otpExpiresAt = null;
      
      await user.save();
      
      return res.status(200).json({ message: 'Password updated successfully' });
    } catch (err) {
      console.error('Password reset error:', err);
      return res.status(500).json({ error: 'Failed to reset password' });
    }

};

// Send message
exports.sendMessage = async (req, res) => {
    const { name, email, mobile, subject, message } = req.body;
    // Create the email content
    const mailOptions = {
      from: "samah-s@lubab.sa", // Your Zoho email
      to: "samah.lubab@gmail.com", // Your Zoho email
      replyTo: email, // Reply to the user's email
      subject: subject || "New Message from Contact Form",
      text: `You have received a new message from your website contact form:\n\nName: ${name}\nEmail: ${email}\nPhone: ${mobile}\n\nMessage:\n${message}`,
    };
  
    // Send the email
    try {
      await sendEmail(mailOptions);
      console.log("Email sent successfully");
      res.status(200).json({ message: "Message sent successfully!" });
    } catch (err) {
      console.error("Error sending email:", err);
      res
        .status(500)
        .json({ message: "Failed to send message", error: err.message });
    }
};