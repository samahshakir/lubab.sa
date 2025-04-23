const JobApplication = require("../models/JobApplication");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Check if user is admin
exports.isAdmin = async (req, res) => {
  // Your check if user is admin logic here
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
};

exports.deleteAccount = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log(userId);
    // Validate request
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Invalid credential",
      });
    }

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Delete all user's job applications
    await JobApplication.deleteMany({ userId: userId });

    // Delete the user account
    await User.findByIdAndDelete(userId);

    // Clear any auth tokens if using token-based auth
    // res.clearCookie('authToken'); // If using cookies

    return res.status(200).json({
      success: true,
      message: "Account and associated data successfully deleted",
    });
  } catch (error) {
    console.error("Error deleting account:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting account",
      error: error.message,
    });
  }
};
