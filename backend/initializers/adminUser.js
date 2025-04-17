const User = require("../models/User");
const bcrypt = require("bcryptjs");

async function initializeAdminUser() {
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
}

module.exports = initializeAdminUser;