const JobApplication = require("../models/JobApplication");
const User = require("../models/User")
const mongoose = require("mongoose");

// Fetch applications
exports.getApplications = async (req, res) => {
  // Your fetch applications logic here
    try {
      const applications = await JobApplication.find({})
        .select('personal.firstName personal.lastName skills status createdAt jobSlug userId')
        .sort({ createdAt: -1 });
      
      res.json(applications);
    } catch (error) {
      console.error('Error fetching applications:', error);
      res.status(500).json({ message: 'Server error' });
    }
  
};

// Fetch application by slug
exports.getApplicationBySlug = async (req, res) => {
  // Get application by slug
    try {
      const objectId = new mongoose.Types.ObjectId(req.params.userId); 
      console.log(objectId)
      const application = await JobApplication.findOne({ jobSlug: req.params.slug, _id: objectId });
      console.log(application)
      if (!application) {
        return res.status(404).json({ message: 'Application not found' });
      }
      
      res.json(application);
    } catch (error) {
      console.error(`Error fetching application with slug ${req.params.slug}:`, error);
      res.status(500).json({ message: 'Server error' });
    }
};

// Fetch username by ID
exports.getUsernameById = async (req, res) => {
  // Your fetch username by ID logic here
  //Get username by ID
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
  
};

// Fetch application by user ID
exports.getApplicationByUserId = async (req, res) => {
  // Your fetch application by user ID logic here
    const { userId } = req.body;
    console.log(userId)
  
    try {
      const objectId = new mongoose.Types.ObjectId(userId); // Convert to ObjectId
      console.log(objectId)

      let application = await JobApplication.findOne({ 
        userId: objectId, 
        status: "submitted" 
      });
  
      // If no submitted one, fallback to any application by userId
      if (!application) {
        console.log("No submitted application found, looking for any...");
        application = await JobApplication.findOne({ userId: objectId });
      }
  
      if (!application) {
        console.log("not found")
        return res.status(201).json({ message: "No application found for this user" });
      }
  
      return res.status(200).json(application);
    } catch (error) {
      console.error("Error fetching application:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  
};

// Check drafts
exports.checkDrafts = async (req, res) => {
  // Your check drafts logic here
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
  
};

// Save draft
exports.saveDraft = async (req, res) => {
  // Your save draft logic here
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
  
};

// Submit application
exports.submitApplication = async (req, res) => {
  // Your submit application logic here
    try {
      // Destructure the data from req.body (not req.fields)
      const { userId, personal, education, experience, skills, links, jobSlug } = req.body;
  
      // Validate that userId exists
      if (!userId) {
        return res.status(400).json({ message: "Missing userId. Try logging in again" });
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
  
};