const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema(
  {
    institution: String,
    degree: String,
    fieldOfStudy: String,
    startDate: String,
    endDate: String,
    currentlyStudying: Boolean,
    description: String,
  },
  { _id: false }
);

const experienceSchema = new mongoose.Schema(
  {
    company: String,
    position: String,
    location: String,
    startDate: String,
    endDate: String,
    currentlyWorking: Boolean,
    description: String,
  },
  { _id: false }
);

const skillsSchema = new mongoose.Schema(
  {
    skillList: [String],
    proficiencyLevels: { type: Map, of: String },
  },
  { _id: false }
);

const linksSchema = new mongoose.Schema(
  {
    linkedin: String,
    portfolio: String,
    github: String,
    other: String,
  },
  { _id: false }
);

const personalSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    coverLetter: String,
  },
  { _id: false }
);

const jobApplicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  personal: personalSchema,
  education: [educationSchema],
  experience: [experienceSchema],
  skills: skillsSchema,
  links: linksSchema,
  status: {
    type: String,
    enum: ["draft", "submitted", "reviewed", "rejected", "accepted"],
    default: "draft",
  },
  jobSlug: {
    type: String,
    required: false, // Optional
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("JobApplication", jobApplicationSchema);
