const User = require("../models/User");

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