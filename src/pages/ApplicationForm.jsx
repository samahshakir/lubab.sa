import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDarkMode } from "../context/DarkModeContext";
import client from "../sanityClient";
import { useLanguage } from "../context/LanguageContext";
import { Pencil } from "lucide-react"; 
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css'
import GoBackButton from "../components/GoBackButton";
import { PortableText } from "@portabletext/react";

const apiUrl = import.meta.env.VITE_API_URL;

const ApplicationForm = () => {
  const jobSlug = sessionStorage.getItem("jobSlug");
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(jobSlug ? "jobDescription" : "personal");
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formCompleted, setFormCompleted] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);
  const darkMode = useDarkMode();
  const { isArabic } = useLanguage();
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const emailInputRef = useRef(null);
  const [isValid, setIsValid] = useState(null);
  const [acknowledged, setAcknowledged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [hasConfirmed, setHasConfirmed] = useState(false);


  const contentAr = {
    personal: {
      personalInformation: "معلومات شخصية",
      firstName: "* الاسم الأول",
      lastName: "* اسم العائلة",
      email: "* البريد الإلكتروني",
      phone: "* رقم الهاتف*",
      address: "العنوان",
      city: "المدينة",
      state: "الولاية",
      zipCode: "الرمز البريدي",
      country: "الدولة",
      coverLetter: "خطاب التقديم",
    },
    education: {
      education: "تعليم",
      addEducation: "إضافة التعليم",
      institution: "* المؤسسة التعليمية",
      degree: "* الدرجة العلمية",
      fieldOfStudy: "* مجال الدراسة",
      startDate: "تاريخ البدء",
      endDate: "تاريخ الانتهاء",
      currentlyStudying: "ما زلت أدرس",
      description: "الوصف",
    },
    experience: {
      experience: "خبرة في العمل",
      company: "الشركة",
      position: "المنصب",
      location: "الموقع",
      startDate: "تاريخ البدء",
      endDate: "تاريخ الانتهاء",
      currentlyWorking: "ما زلت أعمل",
      description: "الوصف",
    },
    skills: {
      skills: "مهارات",
      skillList: "المهارات",
      proficiencyLevels: "مستوى الإتقان",
    },
    links: {
      links: "الروابط",
      linkedin: "لينكدإن",
      portfolio: "المعرض",
      github: "جيت هاب",
      other: "أخرى",
    },
    questions: {
      answers: "إجاباتك",
    },
  };

  // Form data state
  const [formData, setFormData] = useState({
    personal: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      coverLetter: "",
    },
    education: [
      {
        institution: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        currentlyStudying: false,
        description: "",
      },
    ],
    experience: [
      {
        company: "",
        position: "",
        location: "",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
        description: "",
      },
    ],
    skills: {
      skillList: [""],
      proficiencyLevels: {},
    },
    links: {
      linkedin: "",
      portfolio: "",
      github: "",
      other: "",
    },
    questions: {
      // Will be populated based on job-specific questions
      answers: {},
    },
  });

  // Track form completion status for each tab
  const [tabCompletion, setTabCompletion] = useState({
    personal: false,
    education: false,
    experience: false,
    skills: false,
    links: false,
    questions: false,
  });

  const token = localStorage.getItem("authToken");
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;

    const loadApplicationData = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id;
      console.log(userId);

      if (!userId) {
        console.error("User ID not found");
        return;
      }

      try {
        const response = await axios.post(`${apiUrl}/api/applications/userId`, {
          userId,
        });
        if (response.status === 200) {
          setFormData(response.data);
        }else if(response.status == 201){
          setFormData(prev => ({
            ...prev,
            personal: {
              ...prev.personal,
              email: response.data,
            },
          }));
        }
         else if (response.status === 404) {
          console.log("No application found for this user.");
        } else {
          console.error("Failed to fetch application:", response.statusText);
        }
      } catch (error) {
        console.error("Error loading application:", error);
      }
    };

    const fetchJobDetails = async () => {
      if (!jobSlug) {
        setJobDetails(null); // Explicitly set to null to show fallback UI
        setLoading(false);
        return;
      }

      try {
        const query = `*[_type == "job" && slug.current == $slug && active == true][0]{
        titleEn,
        titleAr,
        slug,
        location,
        jobType,
        descriptionEn,
        descriptionAr,
        requirementsEn,
        requirementsAr,
        active
        }`;

        const job = await client.fetch(query, { slug: jobSlug });
        console.log(job)

        if (job) {
          setJobDetails(job);
        } else {
          console.warn("Job not found or inactive.");
        }
      } catch (error) {
        console.error("Error fetching job from Sanity:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchDraftApplication = async () => {
      try {
        const response = await axios.post(
          `${apiUrl}/api/applications/check-drafts`,
          {
            userId,
            jobSlug,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          setFormData(response.data.application);
        } else if (response.status === 201) {
          await loadApplicationData();
        }
      } catch (error) {
        console.error("There was an error!", error);
      }
    };

    // fetchUserData();
    fetchJobDetails();
    if(jobSlug){
    fetchDraftApplication();
    }else{
     loadApplicationData();
    }
  }, [jobSlug]);

  // Check form completion status
  useEffect(() => {
    const checkPersonalCompletion = () => {
      const { firstName, lastName, email, phone, country } = formData.personal;
      return firstName && lastName && email && phone && country;
    };

    const checkEducationCompletion = () => {
      return formData.education.some(
        (edu) =>
          edu.institution &&
          edu.degree &&
          edu.fieldOfStudy &&
          (edu.endDate || edu.currentlyStudying)
      );
    };

    const checkExperienceCompletion = () => {
      return formData.experience.some(
        (exp) =>
          exp.company && exp.position && (exp.endDate || exp.currentlyWorking)
      );
    };

    const checkSkillsCompletion = () => {
      return (
        formData.skills.skillList.filter((skill) => skill.trim()).length > 0
      );
    };

    const checkLinksCompletion = () => {
      const { linkedin, portfolio, github, other } = formData.links;
      return linkedin || portfolio || github || other;
    };

    const updatedTabCompletion = {
      personal: checkPersonalCompletion(),
      education: checkEducationCompletion(),
      experience: checkExperienceCompletion(),
      skills: checkSkillsCompletion(),
      links: checkLinksCompletion()
    };

    setTabCompletion(updatedTabCompletion);
    setFormCompleted(
      Object.values(updatedTabCompletion).every((status) => status)
    );
  }, [formData, jobDetails]);

  const handleInputChange = (section, field, value) => {
    // Regex for letters and spaces (for name-related fields)
    const onlyLetters = /^[a-zA-Z\s]*$/;
  
    // Regex for only numbers (for phone-related fields)
    const onlyNumbers = /^[0-9]*$/;
    if(section === "links"){
      if (value === "") {
        setIsValid(null); // Don't show error when input is empty
      }else{
      try {
        new URL(value); // This will throw an error if the URL is invalid
        setIsValid(true);
      } catch (e) {
        setIsValid(false);
      }
    }
  }
    // Handle email input (allow anything)
    if (["email", "address","coverLetter","description","linkedin","portfolio","github","other"].includes(field))
      {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      }));
    }else if (field === "phone") {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      }));
    }else if (["zipCode"].includes(field)) {
      if (value === '' || onlyNumbers.test(value)) {
        setFormData((prev) => ({
          ...prev,
          [section]: {
            ...prev[section],
            [field]: value,
          },
        }));
      }
    } else {
      // Allow only letters and spaces for other fields (like name)
      if (value === '' || onlyLetters.test(value)) {
        setFormData((prev) => ({
          ...prev,
          [section]: {
            ...prev[section],
            [field]: value,
          },
        }));
      }
    }
  };
  

  // Define the tab order
  const tabOrder = [
    ...(jobSlug ? ["jobDescription"] : []),
    "personal", 
    "education", 
    "experience", 
    "skills", 
    "links", 
    "acknowledgment"
  ];

  // Get current tab index
  const currentTabIndex = tabOrder.indexOf(activeTab);

  // Determine if current tab is the last one
  const isLastTab = currentTabIndex === tabOrder.length - 1;

  const isFirstTab = currentTabIndex === 0;

  // Determine the next tab
  const nextTab = isLastTab ? activeTab : tabOrder[currentTabIndex + 1];

  const previousTab = isFirstTab ? activeTab : tabOrder[currentTabIndex - 1];
  const handleArrayInputChange = (section, index, field, value) => {
    let updatedValue = value;
  
    if (["degree","fieldOfStudy","position","location"].includes(field)) {
      // Keep only letters, spaces, and basic punctuation
      updatedValue = value.replace(/[^a-zA-Z\s]/g, "");
    }
  
    setFormData((prev) => {
      const newArray = [...prev[section]];
      newArray[index] = {
        ...newArray[index],
        [field]: updatedValue,
      };
      return {
        ...prev,
        [section]: newArray,
      };
    });
  };
  

  const handleSkillChange = (index, value) => {
    // Allow only letters and spaces
    const textOnly = value.replace(/[^a-zA-Z\s]/g, "");
  
    setFormData((prev) => {
      const newSkillList = [...prev.skills.skillList];
      newSkillList[index] = textOnly;
      return {
        ...prev,
        skills: {
          ...prev.skills,
          skillList: newSkillList,
        },
      };
    });
  };
  

  const handleProficiencyChange = (skill, level) => {
    setFormData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        proficiencyLevels: {
          ...prev.skills.proficiencyLevels,
          [skill]: level,
        },
      },
    }));
  };

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          institution: "",
          degree: "",
          fieldOfStudy: "",
          startDate: "",
          endDate: "",
          currentlyStudying: false,
          description: "",
        },
      ],
    }));
  };

  const removeEducation = (index) => {
    if (formData.education.length > 1) {
      setFormData((prev) => {
        const newEducation = [...prev.education];
        newEducation.splice(index, 1);
        return {
          ...prev,
          education: newEducation,
        };
      });
    }
  };

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          company: "",
          position: "",
          location: "",
          startDate: "",
          endDate: "",
          currentlyWorking: false,
          description: "",
        },
      ],
    }));
  };

  const removeExperience = (index) => {
    if (formData.experience.length > 1) {
      setFormData((prev) => {
        const newExperience = [...prev.experience];
        newExperience.splice(index, 1);
        return {
          ...prev,
          experience: newExperience,
        };
      });
    }
  };

  const addSkill = () => {
    setFormData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        skillList: [...prev.skills.skillList, ""],
      },
    }));
  };

  const removeSkill = (index) => {
    if (formData.skills.skillList.length > 1) {
      setFormData((prev) => {
        const newSkillList = [...prev.skills.skillList];
        const removedSkill = newSkillList[index];
        newSkillList.splice(index, 1);

        // Also remove proficiency level if it exists
        const newProficiencyLevels = { ...prev.skills.proficiencyLevels };
        if (removedSkill in newProficiencyLevels) {
          delete newProficiencyLevels[removedSkill];
        }

        return {
          ...prev,
          skills: {
            skillList: newSkillList,
            proficiencyLevels: newProficiencyLevels,
          },
        };
      });
    }
  };

  const handleEnableEdit = () => {
    setIsEditingEmail(true);
    setTimeout(() => {
      emailInputRef.current?.focus();
    }, 50);
  };
  
  // Disable editing on blur or Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setIsEditingEmail(false);
      emailInputRef.current?.blur();
    }
  };
  
  const handleBlur = () => {
    setIsEditingEmail(false);
  };

  const saveDraft = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;
    try {
      setSaving(true);
      const response = await fetch(`${apiUrl}/api/applications/draft`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userId: userId, // Assuming you have a userId available
          jobSlug: jobSlug, // Assuming you have a jobSlug available
          status: "draft",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setDraftSaved(true);
        setTimeout(() => setDraftSaved(false), 3000); // Show success message for 3 seconds
      } else {
        console.error("Failed to save draft:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving draft:", error);
    } finally {
      setSaving(false);
    }
  };

  const submitApplication = async () => {
    if (!formCompleted) {
      alert("Please complete all required sections before submitting");
      return;
    }
    setSubmitting(true);

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      // Prepare the application data as a JSON object
      const applicationData = {
        userId: user.id,
        jobSlug: jobSlug,
        status: jobSlug ? "submitted" : "personal",
        personal: formData.personal,
        education: formData.education,
        experience: formData.experience,
        skills: formData.skills,
        links: formData.links,
      };
      
      // Send the application data as JSON
      await axios.post(`${apiUrl}/api/applications/submit`, applicationData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Set the content type to JSON
        },
      });

      if (!jobSlug) {
        navigate("/career")
        return;
      }

      navigate("/applications/success", {
        state: { jobId, jobTitle: jobDetails?.title },
      });
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center ${
          darkMode ? "bg-light-gray" : "bg-dark-mode"
        } transition-opacity duration-500`}
      >
        <div className="text-center">
          <div
            className="w-16 h-16 border-4 border-t-transparent border-b-transparent rounded-full mx-auto mb-4 animate-spin"
            style={{
              borderColor: darkMode
                ? "#00BC78 transparent #101828 transparent"
                : "#00BC78 transparent white transparent",
            }}
          ></div>
          <h2
            className={`text-xl font-bold ${
              darkMode ? "text-[#101828]" : "text-white"
            }`}
          >
            Loading Content
          </h2>
        </div>
      </div>
    );
  }

  const handleDeleteAccount = async () => {
    setError('');
    setSuccess('');
  
    if (!hasConfirmed) {
      setError('Please confirm that you understand this action cannot be undone');
      return;
    }
  
    try {
      setIsLoading(true);
      const userString = localStorage.getItem("user");
      const user = userString ? JSON.parse(userString) : null;
      const token = localStorage.getItem("authToken");
  
      console.log("Parsed user:", user);
      console.log("Sending userId:", user?.id);
  
      if (!user || !user.id) {
        setError('Invalid user data');
        return;
      }
  
      const response = await axios.post(`${apiUrl}/api/users/delete-account`, {
        userId: user.id,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (response.data.success) {
        setSuccess('Your account has been successfully deleted');
        localStorage.removeItem('user');
        localStorage.removeItem('authToken');
        setTimeout(() => navigate('/'), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div>
      <GoBackButton/>
    <div className="max-w-5xl mx-auto px-4 py-8 font-nizar">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Job Header */}
        <div
          className="bg-gray-100 shadow-lg p-6"
          dir={isArabic ? "rtl" : "ltr"}
        >
          <h1 className="text-2xl">
            <span className="bg-gradient-to-r from-primary-green to-secondary-blue bg-clip-text text-transparent font-semibold">
              {isArabic
                ? jobDetails?.titleAr
                : jobDetails?.titleEn || "Complete your profile"}
            </span>
          </h1>
          <p>
            <span className="bg-gradient-to-r from-primary-green to-secondary-blue bg-clip-text text-transparent font-semibold">
              {jobDetails?.jobType}  {jobDetails?.location}  
            </span>
          </p>
        </div>

        {/* Tabs */}
        <div
          className="border-b border-gray-100"
          dir={isArabic ? "rtl" : "ltr"}
        >
          <nav className="flex overflow-x-auto">
          {jobSlug && (
          <button
            onClick={() => setActiveTab("jobDescription")}
            className={`py-4 px-6 font-medium text-sm whitespace-nowrap ${
              activeTab === "jobDescription"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            } flex items-center space-x-2`}
          >
            <span>{isArabic ? "" : "Job Description"}</span>
          </button>
        )}
            <button
              onClick={() => setActiveTab("personal")}
              className={`py-4 px-6 font-medium text-sm whitespace-nowrap ${
                activeTab === "personal"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              } flex items-center space-x-2`}
            >
              <span>
                {isArabic
                  ? contentAr.personal.personalInformation
                  : "Personal Information"}
              </span>
              {tabCompletion.personal && (
                <span className="text-green-500">✓</span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("education")}
              className={`py-4 px-6 font-medium text-sm whitespace-nowrap ${
                activeTab === "education"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              } flex items-center space-x-2`}
            >
              <span>
                {isArabic ? contentAr.education.education : "Education"}
              </span>
              {tabCompletion.education && (
                <span className="text-green-500">✓</span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("experience")}
              className={`py-4 px-6 font-medium text-sm whitespace-nowrap ${
                activeTab === "experience"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              } flex items-center space-x-2`}
            >
              <span>
                {isArabic ? contentAr.experience.experience : "Experience"}
              </span>
              {tabCompletion.experience && (
                <span className="text-green-500">✓</span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("skills")}
              className={`py-4 px-6 font-medium text-sm whitespace-nowrap ${
                activeTab === "skills"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              } flex items-center space-x-2`}
            >
              <span>{isArabic ? contentAr.skills.skills : "Skills"}</span>
              {tabCompletion.skills && (
                <span className="text-green-500">✓</span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("links")}
              className={`py-4 px-6 font-medium text-sm whitespace-nowrap ${
                activeTab === "links"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              } flex items-center space-x-2`}
            >
              <span>{isArabic ? contentAr.links.links : "Links"}</span>
              {tabCompletion.links && <span className="text-green-500">✓</span>}
            </button>
            <button
              onClick={() => setActiveTab("acknowledgment")}
              className={`py-4 px-6 font-medium text-sm whitespace-nowrap ${
                activeTab === "acknowledgment"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              } flex items-center space-x-2`}
            >
              <span>{isArabic ? contentAr.acknowledgment.acknowledgment : "Acknowledgment"}</span>
              {tabCompletion.acknowledgment && <span className="text-green-500">✓</span>}
            </button>
            {!jobSlug && (
          <button
            onClick={() => setActiveTab("deleteAccount")}
            className={`py-4 px-6 font-medium text-sm whitespace-nowrap ${
              activeTab === "jobDescription"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            } flex items-center space-x-2`}
          >
            <span>{isArabic ? "" : "Delete Account"}</span>
          </button>
        )}
          </nav>
        </div>

        {/* Form Content */}
        <div className="p-6 bg-gray-100 shadow-lg">

          {/* Job Description */}
          {activeTab === "jobDescription" && (
           <div className="py-4 px-6">

             <div className="text-secondary-dark-gray text-justify">
                 <PortableText
                      value={isArabic ? jobDetails.descriptionAr : jobDetails.descriptionEn}
                            components={{block: ({ children }) => <p>{children}</p> }} />
             </div>
             <div className="text-secondary-dark-gray">
                 <PortableText
                      value={isArabic ? jobDetails.requirementsAr : jobDetails.requirementsEn }
                            components={{block: ({ children }) => <p>{children}</p> }} />
             </div>
         </div>
         
          )}
          {/* Personal Information Tab */}
          {activeTab === "personal" && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-dark-gray">
                Personal Information
              </h2>
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                dir={isArabic ? "rtl" : "ltr"}
              >
                <div>
                  <label
                    htmlFor="firstName"
                    className={`block text-sm font-medium text-gray-700 mb-1 ${
                      isArabic ? "text-right" : "text-left"
                    }`}
                  >
                    {isArabic ? contentAr.personal.firstName : "First Name *"}
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.personal.firstName}
                    onChange={(e) =>
                      handleInputChange("personal", "firstName", e.target.value)
                    }
                    className="w-full rounded-lg text-secondary-dark-gray px-3 py-2 bg-gray-100 shadow-[inset_3px_3px_6px_#c8c9cc,inset_-3px_-3px_6px_#ffffff] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {isArabic ? contentAr.personal.lastName : "Last Name *"}
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.personal.lastName}
                    onChange={(e) =>
                      handleInputChange("personal", "lastName", e.target.value)
                    }
                    className="w-full rounded-lg text-secondary-dark-gray px-3 py-2 bg-gray-100 shadow-[inset_3px_3px_6px_#c8c9cc,inset_-3px_-3px_6px_#ffffff] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {isArabic ? contentAr.personal.email : "Email *"}
                  </label>
                  <div className="relative">
              <input
                ref={emailInputRef}
                type="email"
                id="email"
                value={formData.personal.email}
                onChange={(e) =>
                  handleInputChange("personal", "email", e.target.value)
                }
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                className={`w-full rounded-lg px-3 py-2 text-secondary-dark-gray transition-all duration-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  jobSlug || (!jobSlug && !isEditingEmail)
                    ? "bg-gray-300 cursor-not-allowed"
                    : "shadow-[inset_3px_3px_6px_#c8c9cc,inset_-3px_-3px_6px_#ffffff]"
                }`}
                disabled={jobSlug || (!jobSlug && !isEditingEmail)}
                required
              />

              {!jobSlug && !isEditingEmail && (
                <button
                  type="button"
                  onClick={handleEnableEdit}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-500"
                  aria-label="Edit Email"
                >
                  <Pencil size={18} />
                </button>
              )}
            </div>
                </div>
                <div className="custom-phone-wrapper">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {isArabic ? contentAr.personal.phone : "Phone Number *"}
                  </label>
                  <PhoneInput
                    id="phone"
                    defaultCountry="SA"
                    international
                    value={formData.personal.phone}
                    onChange={(value) => handleInputChange("personal", "phone", value)}
                    className="phone-input-no-border w-full rounded-lg text-secondary-dark-gray px-3 py-2 bg-gray-100 shadow-[inset_3px_3px_6px_#c8c9cc,inset_-3px_-3px_6px_#ffffff] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                    style={{ direction: isArabic ? "rtl" : "ltr" }}
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {isArabic ? contentAr.personal.address : "Address"}
                  </label>
                  <input
                    type="text"
                    id="address"
                    value={formData.personal.address}
                    onChange={(e) =>
                      handleInputChange("personal", "address", e.target.value)
                    }
                    className="w-full rounded-lg text-secondary-dark-gray px-3 py-2 bg-gray-100 shadow-[inset_3px_3px_6px_#c8c9cc,inset_-3px_-3px_6px_#ffffff] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                  />
                </div>
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {isArabic ? contentAr.personal.city : "City"}
                  </label>
                  <input
                    type="text"
                    id="city"
                    value={formData.personal.city}
                    onChange={(e) =>
                      handleInputChange("personal", "city", e.target.value)
                    }
                    className="w-full rounded-lg text-secondary-dark-gray px-3 py-2 bg-gray-100 shadow-[inset_3px_3px_6px_#c8c9cc,inset_-3px_-3px_6px_#ffffff] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                  />
                </div>
                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {isArabic ? contentAr.personal.state : "State/Province"}
                  </label>
                  <input
                    type="text"
                    id="state"
                    value={formData.personal.state}
                    onChange={(e) =>
                      handleInputChange("personal", "state", e.target.value)
                    }
                    className="w-full rounded-lg text-secondary-dark-gray px-3 py-2 bg-gray-100 shadow-[inset_3px_3px_6px_#c8c9cc,inset_-3px_-3px_6px_#ffffff] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                  />
                </div>
                <div>
                  <label
                    htmlFor="zipCode"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {isArabic ? contentAr.personal.zipCode : "Zip/Postal Code"}
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    value={formData.personal.zipCode}
                    onChange={(e) =>
                      handleInputChange("personal", "zipCode", e.target.value)
                    }
                    className="w-full rounded-lg text-secondary-dark-gray px-3 py-2 bg-gray-100 shadow-[inset_3px_3px_6px_#c8c9cc,inset_-3px_-3px_6px_#ffffff] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                  />
                </div>
                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {isArabic ? contentAr.personal.country : "Country *"}
                  </label>
                  <input
                    type="text"
                    id="country"
                    value={formData.personal.country}
                    onChange={(e) =>
                      handleInputChange("personal", "country", e.target.value)
                    }
                    className="w-full rounded-lg text-secondary-dark-gray px-3 py-2 bg-gray-100 shadow-[inset_3px_3px_6px_#c8c9cc,inset_-3px_-3px_6px_#ffffff] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                  />
                </div>
                <div className="md:col-span-2">
                  <label
                    htmlFor="coverLetter"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {isArabic
                      ? contentAr.personal.coverLetter
                      : "Cover Letter Preview"}
                  </label>
                  <textarea
                    id="coverLetter"
                    value={formData.personal.coverLetter}
                    onChange={(e) =>
                      handleInputChange(
                        "personal",
                        "coverLetter",
                        e.target.value
                      )
                    }
                    rows="5"
                    className="w-full rounded-lg text-secondary-dark-gray px-3 py-2 bg-gray-100 shadow-[inset_3px_3px_6px_#c8c9cc,inset_-3px_-3px_6px_#ffffff] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                    placeholder="You can write a brief cover letter here"
                  ></textarea>
                </div>
              </div>
            </div>
          )}

          {/* Education Tab */}
          {activeTab === "education" && (
            <div>
              <div
                className="flex justify-between items-center mb-4"
                dir={isArabic ? "rtl" : "ltr"}
              >
                <h2 className="text-xl font-semibold text-dark-gray">
                  {isArabic ? contentAr.education.education : "Education"}
                </h2>
                <button
                  type="button"
                  onClick={addEducation}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {isArabic
                    ? contentAr.education.addEducation
                    : "Add Education"}
                </button>
              </div>

              {formData.education.map((edu, index) => (
                <div
                  key={index}
                  className="mb-8 bg-gray-50 p-4 rounded-lg border border-gray-200"
                  dir={isArabic ? "rtl" : "ltr"}
                >
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium mb-3 text-secondary-dark-gray">
                      {isArabic ? contentAr.education.education : "Education"} #
                      {index + 1}
                    </h3>
                    {formData.education.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEducation(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {isArabic
                          ? contentAr.education.institution
                          : "Institution *"}
                      </label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) =>
                          handleArrayInputChange(
                            "education",
                            index,
                            "institution",
                            e.target.value
                          )
                        }
                        className="w-full rounded-lg text-secondary-dark-gray px-3 py-2 bg-gray-100 shadow-[inset_3px_3px_6px_#c8c9cc,inset_-3px_-3px_6px_#ffffff] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {isArabic ? contentAr.education.degree : "Degree *"}
                      </label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) =>
                          handleArrayInputChange(
                            "education",
                            index,
                            "degree",
                            e.target.value
                          )
                        }
                        className="w-full rounded-lg text-secondary-dark-gray px-3 py-2 bg-gray-100 shadow-[inset_3px_3px_6px_#c8c9cc,inset_-3px_-3px_6px_#ffffff] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {isArabic
                          ? contentAr.education.fieldOfStudy
                          : "Field of Study *"}
                      </label>
                      <input
                        type="text"
                        value={edu.fieldOfStudy}
                        onChange={(e) =>
                          handleArrayInputChange(
                            "education",
                            index,
                            "fieldOfStudy",
                            e.target.value
                          )
                        }
                        className="w-full rounded-lg text-secondary-dark-gray px-3 py-2 bg-gray-100 shadow-[inset_3px_3px_6px_#c8c9cc,inset_-3px_-3px_6px_#ffffff] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {isArabic
                          ? contentAr.education.startDate
                          : "Start Date"}
                      </label>
                      <input
                        type="date"
                        value={edu.startDate}
                        onChange={(e) =>
                          handleArrayInputChange(
                            "education",
                            index,
                            "startDate",
                            e.target.value
                          )
                        }
                        className="w-full rounded-lg text-secondary-dark-gray px-3 py-2 bg-gray-100 shadow-[inset_3px_3px_6px_#c8c9cc,inset_-3px_-3px_6px_#ffffff] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          id={`currentlyStudying-${index}`}
                          checked={edu.currentlyStudying}
                          onChange={(e) =>
                            handleArrayInputChange(
                              "education",
                              index,
                              "currentlyStudying",
                              e.target.checked
                            )
                          }
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 text-dark-gray rounded"
                        />
                        <label
                          htmlFor={`currentlyStudying-${index}`}
                          className="mx-2 block text-sm text-gray-700"
                        >
                          {isArabic
                            ? contentAr.education.currentlyStudying
                            : "Currently Studying"}
                        </label>
                      </div>
                      {!edu.currentlyStudying && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {isArabic
                              ? contentAr.education.endDate
                              : "End Date *"}
                          </label>
                          <input
                            type="date"
                            value={edu.endDate}
                            onChange={(e) =>
                              handleArrayInputChange(
                                "education",
                                index,
                                "endDate",
                                e.target.value
                              )
                            }
                            className="w-full rounded-lg text-secondary-dark-gray px-3 py-2 bg-gray-100 shadow-[inset_3px_3px_6px_#c8c9cc,inset_-3px_-3px_6px_#ffffff] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                            required={!edu.currentlyStudying}
                          />
                        </div>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {isArabic
                          ? contentAr.education.description
                          : "Description"}
                      </label>
                      <textarea
                        value={edu.description}
                        onChange={(e) =>
                          handleArrayInputChange(
                            "education",
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        rows="3"
                        className="w-full rounded-lg text-secondary-dark-gray px-3 py-2 bg-gray-100 shadow-[inset_3px_3px_6px_#c8c9cc,inset_-3px_-3px_6px_#ffffff] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                        placeholder="Describe your studies, achievements, etc."
                      ></textarea>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Experience Tab */}
          {activeTab === "experience" && (
            <div>
              <div
                className="flex justify-between items-center mb-4"
                dir={isArabic ? "rtl" : "ltr"}
              >
                <h2 className="text-xl font-semibold text-dark-gray">
                  {isArabic
                    ? contentAr.experience.experience
                    : "Work Experience"}
                </h2>
                <button
                  type="button"
                  onClick={addExperience}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Experience
                </button>
              </div>

              {formData.experience.map((exp, index) => (
                <div
                  key={index}
                  className="mb-8 bg-gray-50 p-4 rounded-lg border border-gray-200"
                  dir={isArabic ? "rtl" : "ltr"}
                >
                  <div className="flex justify-between">
                    <h3 className="text-secondary-dark-gray text-lg font-medium mb-3">
                      {isArabic
                        ? contentAr.experience.experience
                        : "Experience"}{" "}
                      #{index + 1}
                    </h3>
                    {formData.experience.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeExperience(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {isArabic ? contentAr.experience.company : "Company *"}
                      </label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) =>
                          handleArrayInputChange(
                            "experience",
                            index,
                            "company",
                            e.target.value
                          )
                        }
                        className="w-full rounded-lg text-secondary-dark-gray px-3 py-2 bg-gray-100 shadow-[inset_3px_3px_6px_#c8c9cc,inset_-3px_-3px_6px_#ffffff] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {isArabic
                          ? contentAr.experience.position
                          : "Position *"}
                      </label>
                      <input
                        type="text"
                        value={exp.position}
                        onChange={(e) =>
                          handleArrayInputChange(
                            "experience",
                            index,
                            "position",
                            e.target.value
                          )
                        }
                        className="w-full rounded-lg text-secondary-dark-gray px-3 py-2 bg-gray-100 shadow-[inset_3px_3px_6px_#c8c9cc,inset_-3px_-3px_6px_#ffffff] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {isArabic ? contentAr.experience.location : "Location"}
                      </label>
                      <input
                        type="text"
                        value={exp.location}
                        onChange={(e) =>
                          handleArrayInputChange(
                            "experience",
                            index,
                            "location",
                            e.target.value
                          )
                        }
                        className="w-full rounded-lg text-secondary-dark-gray px-3 py-2 bg-gray-100 shadow-[inset_3px_3px_6px_#c8c9cc,inset_-3px_-3px_6px_#ffffff] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {isArabic
                          ? contentAr.experience.startDate
                          : "Start Date"}
                      </label>
                      <input
                        type="date"
                        value={exp.startDate}
                        onChange={(e) =>
                          handleArrayInputChange(
                            "experience",
                            index,
                            "startDate",
                            e.target.value
                          )
                        }
                        className="w-full rounded-lg text-secondary-dark-gray px-3 py-2 bg-gray-100 shadow-[inset_3px_3px_6px_#c8c9cc,inset_-3px_-3px_6px_#ffffff] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          id={`currentlyWorking-${index}`}
                          checked={exp.currentlyWorking}
                          onChange={(e) =>
                            handleArrayInputChange(
                              "experience",
                              index,
                              "currentlyWorking",
                              e.target.checked
                            )
                          }
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 text-dark-gray rounded"
                        />
                        <label
                          htmlFor={`currentlyWorking-${index}`}
                          className="ml-2 block text-sm text-gray-700"
                        >
                          {isArabic
                            ? contentAr.experience.currentlyWorking
                            : "Currently Working Here"}
                        </label>
                      </div>
                      {!exp.currentlyWorking && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            {isArabic
                              ? contentAr.experience.endDate
                              : "End Date *"}
                          </label>
                          <input
                            type="date"
                            value={exp.endDate}
                            onChange={(e) =>
                              handleArrayInputChange(
                                "experience",
                                index,
                                "endDate",
                                e.target.value
                              )
                            }
                            className="w-full rounded-lg text-secondary-dark-gray px-3 py-2 bg-gray-100 shadow-[inset_3px_3px_6px_#c8c9cc,inset_-3px_-3px_6px_#ffffff] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                            required={!exp.currentlyWorking}
                          />
                        </div>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {isArabic
                          ? contentAr.experience.description
                          : "Description"}
                      </label>
                      <textarea
                        value={exp.description}
                        onChange={(e) =>
                          handleArrayInputChange(
                            "experience",
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        rows="3"
                        className="w-full rounded-lg text-secondary-dark-gray px-3 py-2 bg-gray-100 shadow-[inset_3px_3px_6px_#c8c9cc,inset_-3px_-3px_6px_#ffffff] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                        placeholder="Describe your responsibilities, achievements, etc."
                      ></textarea>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === "skills" && (
            <div>
              <div
                className="flex justify-between items-center mb-4"
                dir={isArabic ? "rtl" : "ltr"}
              >
                <h2 className="text-xl font-semibold text-dark-gray">
                  {isArabic ? contentAr.skills.skills : "Skills"}
                </h2>
                <button
                  type="button"
                  onClick={addSkill}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {isArabic ? "إضافة مهارة" : "Add Skill"}
                </button>
              </div>

              <div className="space-y-4">
                {formData.skills.skillList.map((skill, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row md:items-center gap-4"
                    dir={isArabic ? "rtl" : "ltr"}
                  >
                    <div className="flex-grow">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {isArabic ? contentAr.skills.skills : "Skill"}{" "}
                        {index + 1}
                      </label>
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={skill}
                          onChange={(e) =>
                            handleSkillChange(index, e.target.value)
                          }
                          className="w-full rounded-lg text-secondary-dark-gray px-3 py-2 bg-gray-100 shadow-[inset_3px_3px_6px_#c8c9cc,inset_-3px_-3px_6px_#ffffff] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                          placeholder="e.g., JavaScript, Project Management, etc."
                        />
                        {formData.skills.skillList.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeSkill(index)}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                    {skill.trim() && (
                      <div className="md:w-64">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {isArabic
                            ? contentAr.skills.proficiencyLevels
                            : "Proficiency Level"}
                        </label>
                        <select
                          value={
                            formData.skills.proficiencyLevels[skill] ||
                            "Intermediate"
                          }
                          onChange={(e) =>
                            handleProficiencyChange(skill, e.target.value)
                          }
                          className="w-full rounded-lg text-secondary-dark-gray px-3 py-2 bg-gray-100 shadow-[inset_3px_3px_6px_#c8c9cc,inset_-3px_-3px_6px_#ffffff] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                          <option value="Expert">Expert</option>
                        </select>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Links Tab */}
          {activeTab === "links" && (
            <div>
              <h2
                className="text-xl font-semibold mb-4 text-dark-gray"
                dir={isArabic ? "rtl" : "ltr"}
              >
                {isArabic ? contentAr.links.links : "Links"}
              </h2>
              <div className="space-y-6" dir={isArabic ? "rtl" : "ltr"}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isArabic ? contentAr.links.linkedin : "LinkedIn Profile"}
                  </label>
                  <input
                    type="url"
                    value={formData.links.linkedin}
                    onChange={(e) =>
                      handleInputChange("links", "linkedin", e.target.value)
                    }
                    className="w-full rounded-lg text-secondary-dark-gray px-3 py-2 bg-gray-100 shadow-[inset_3px_3px_6px_#c8c9cc,inset_-3px_-3px_6px_#ffffff] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                    placeholder="https://www.linkedin.com/in/your-profile"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isArabic ? contentAr.links.portfolio : "Portfolio"}
                  </label>
                  <input
                    type="url"
                    value={formData.links.portfolio}
                    onChange={(e) =>
                      handleInputChange("links", "portfolio", e.target.value)
                    }
                    className="w-full rounded-lg text-secondary-dark-gray px-3 py-2 bg-gray-100 shadow-[inset_3px_3px_6px_#c8c9cc,inset_-3px_-3px_6px_#ffffff] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                    placeholder="https://www.yourportfolio.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isArabic ? contentAr.links.github : "GitHub Profile"}
                  </label>
                  <input
                    type="url"
                    value={formData.links.github}
                    onChange={(e) =>
                      handleInputChange("links", "github", e.target.value)
                    }
                    className="w-full rounded-lg text-secondary-dark-gray px-3 py-2 bg-gray-100 shadow-[inset_3px_3px_6px_#c8c9cc,inset_-3px_-3px_6px_#ffffff] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                    placeholder="https://github.com/yourusername"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {isArabic ? contentAr.links.other : "Other"}
                  </label>
                  <input
                    type="url"
                    value={formData.links.other}
                    onChange={(e) =>
                      handleInputChange("links", "other", e.target.value)
                    }
                    className="w-full rounded-lg text-secondary-dark-gray px-3 py-2 bg-gray-100 shadow-[inset_3px_3px_6px_#c8c9cc,inset_-3px_-3px_6px_#ffffff] focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                    placeholder="https://www.otherlink.com"
                  />
                </div>
                {isValid === false && <p style={{ color: "red" }}>Invalid URL!</p>}

              </div>
            </div>
          )}

          {/* Acknowledgment Tab */}
          {activeTab === "acknowledgment" && (
           <div className="py-4 px-6">
           <label className="flex items-center space-x-2">
             <input
               type="checkbox"
               checked={acknowledged}
               onChange={() => setAcknowledged(!acknowledged)}
               className="h-5 w-5 text-blue-600 border-gray-300 rounded"
             />
             <span className="text-secondary-dark-gray">
               {isArabic
                 ? "أقر بأن جميع المعلومات التي قمت بإدخالها صحيحة وللمنشأة الحق في استبعادي من المسابقة الوظيفية في حال كانت المعلومات المدخلة غير صحيحة"
                 : "I declare that all inserted information is correct and the organization has the right to withdraw my application from any competition if the information I inserted is incorrect."}
             </span>
           </label>
         </div>
         
          )}
{activeTab === "deleteAccount" && (
  <form>
 <div className="py-4 px-6">
 <div className="max-w-2xl mx-auto">
   <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
     <h2 className="text-xl font-bold text-red-600 mb-4">Delete Your Account</h2>
     
     {/* Success message */}
     {success && (
       <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
         {success}
       </div>
     )}
     
     {/* Error message */}
     {error && (
       <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
         {error}
       </div>
     )}
     
     <div className="mb-6">
       
       <ul className="list-disc pl-5 space-y-2 text-gray-700">
         <li>Permanently removes all your personal data</li>
         <li>Deletes all your job applications and application history</li>
         <li>Cannot be undone - this action is irreversible</li>
       </ul>
     </div>
     
     <div className="bg-white border border-red-200 rounded-lg p-4 mb-6">
       <div className="flex items-start mb-4">
         <div className="flex-shrink-0">
           <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
             <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
           </svg>
         </div>
         <div className="ml-3">
           <h3 className="text-sm font-medium text-red-800">
             Are you sure you want to proceed?
           </h3>
         </div>
       </div>
       
       <div className="mb-4">
         <div className="flex items-start">
           <div className="flex items-center h-5">
             <input
               id="confirm-delete"
               name="confirm-delete"
               type="checkbox"
               checked={hasConfirmed}
               onChange={(e) => setHasConfirmed(e.target.checked)}
               className="focus:ring-red-500 h-4 w-4 text-red-600 border-gray-300 rounded"
             />
           </div>
           <div className="ml-3 text-sm">
             <label htmlFor="confirm-delete" className="font-medium text-gray-700">
               I understand that this action cannot be undone
             </label>
           </div>
         </div>
       </div>
       
     </div>
     
     <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
       <button
         type="button"
         onClick={handleDeleteAccount}
         className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
         disabled={isLoading}
       >
         {isLoading ? (
           <>
             <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
             </svg>
             Processing...
           </>
         ) : "Delete Account Permanently"}
       </button>
     </div>
   </div>
 </div>
 </div>
 </form>
)}

          {/* Form Controls */}
          <div className="mt-8 flex justify-between border-t pt-6">
            <div>
              <button
                type="button"
                onClick={saveDraft}
                disabled={saving}
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-gray-100 shadow-[3px_3px_6px_#d1d1d1,_-3px_-3px_6px_#ffffff] hover:shadow-[inset_3px_3px_6px_#d1d1d1,_inset_-3px_-3px_6px_#ffffff]"
              >
                {saving ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <span className="bg-gradient-to-r from-primary-green to-secondary-blue bg-clip-text text-transparent font-semibold">
                    {isArabic ? "حفظ المسودة" : "Save Draft"}
                  </span>
                )}
              </button>
              {draftSaved && (
                <span className="ml-3 text-sm text-primary-green">
                  {isArabic
                    ? "تم حفظ المسودة بنجاح"
                    : "Draft saved successfully!"}
                </span>
              )}
            </div>
            <div className="flex gap-4">
              {!isFirstTab && (
                <button
                  type="button"
                  onClick={() => setActiveTab(previousTab)}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-gray-100 shadow-[3px_3px_6px_#d1d1d1,_-3px_-3px_6px_#ffffff] hover:shadow-[inset_3px_3px_6px_#d1d1d1,_inset_-3px_-3px_6px_#ffffff]"
                >
                  <span className="bg-gradient-to-r from-primary-green to-secondary-blue bg-clip-text text-transparent font-semibold">
                    {isArabic ? "عُد" : "Back"}
                  </span>
                </button>
              )}

              {isLastTab ? (
                <button
                  type="button"
                  onClick={submitApplication}
                  disabled={submitting || !formCompleted || isValid === false || acknowledged === false}
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                    formCompleted,isValid,acknowledged
                      ? "bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      : "bg-green-300 cursor-not-allowed"
                  }`}
                >
                  {submitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Submitting...
                    </>
                  ) : isArabic ? (
                    "تقديم الطلب"
                  ) : (
                    !jobSlug ? "Save" : "Submit Application"
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setActiveTab(nextTab)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md bg-gray-100 shadow-[3px_3px_6px_#d1d1d1,_-3px_-3px_6px_#ffffff] hover:shadow-[inset_3px_3px_6px_#d1d1d1,_inset_-3px_-3px_6px_#ffffff]"
                >
                  <span className="bg-gradient-to-r from-primary-green to-secondary-blue bg-clip-text text-transparent font-semibold">
                    Next
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ApplicationForm;
