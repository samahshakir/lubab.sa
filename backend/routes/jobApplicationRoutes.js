const express = require("express");
const router = express.Router();
const jobApplicationController = require("../controllers/jobApplicationController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, jobApplicationController.getApplications);
router.get("/:slug/:userId", authMiddleware, jobApplicationController.getApplicationBySlug);
router.get("/username/by-id/:userId", jobApplicationController.getUsernameById);
router.post("/userId", jobApplicationController.getApplicationByUserId);
router.post("/check-drafts", authMiddleware, jobApplicationController.checkDrafts);
router.post("/draft", jobApplicationController.saveDraft);
router.post("/submit", authMiddleware, jobApplicationController.submitApplication);

module.exports = router;