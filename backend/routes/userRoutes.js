const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/user/:id/is-admin",authMiddleware, userController.isAdmin);
router.post("/users/delete-account",authMiddleware, userController.deleteAccount);

module.exports = router;