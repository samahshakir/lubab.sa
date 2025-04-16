import React, { useRef, useState } from "react";
import axios from "axios";
import { useDarkMode } from "../context/DarkModeContext";
import { useLanguage } from "../context/LanguageContext";

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const inputRefs = useRef([]);
  const buttonRef = useRef(null);
  const containerRef = useRef(null);
  const { darkMode } = useDarkMode();
  const { isArabic } = useLanguage();

  const language = isArabic ? "ar" : "en";

  const apiUrl = import.meta.env.VITE_API_URL;

  const content = {
    en: {
      title: "Get in Touch",
      subtitle: "Let's build the future together",
      formLabels: {
        name: "Name",
        email: "Email",
        mobile: "Mobile No (optional)",
        subject: "Subject",
        message: "Message",
      },
      buttonText: "Send Message",
      contactInfo: {
        nationalAddress: "National Address: As per official records",
        linkedin: "LinkedIn: company/lubab",
      },
    },
    ar: {
      title: "تواصل معنا",
      subtitle: "لنبني المستقبل معًا",
      formLabels: {
        name: "الاسم",
        email: "البريد الإلكتروني",
        mobile: "رقم الجوال (اختياري)",
        subject: "الموضوع",
        message: "الرسالة",
      },
      buttonText: "إرسال الرسالة",
      contactInfo: {
        nationalAddress: "العنوان الوطني: حسب السجلات الرسمية",
        linkedin: "لينكد إن: company/lubab/",
      },
    },
  };

  const addToInputRefs = (el) => {
    if (el && !inputRefs.current.includes(el)) {
      inputRefs.current.push(el);
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(`${apiUrl}/send-message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        setSuccess("Your message has been sent successfully!");
        setFormData({
          name: "",
          email: "",
          mobile: "",
          subject: "",
          message: "",
        });
      } else {
        setError(result.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={sectionRef}
      className={`relative min-h-screen ${
        darkMode ? "bg-[rgb(230,230,230)]" : "bg-dark-mode"
      } border-t`}
    >
      <section className="relative z-10 min-h-screen flex items-start justify-start pt-35 pb-20">
        <div ref={containerRef} className="container mx-auto px-6">
          <div
            className={`text-left mb-16 ml-8 ${
              isArabic ? "text-right mr-8" : ""
            }`}
          >
            <h2
              ref={headingRef}
              className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r 
              from-blue-500 to-blue-600"
            >
              {content[language].title}
            </h2>
            <p
              ref={textRef}
              className={`text-lg md:text-xl ${
                darkMode ? "text-gray-800" : "text-white"
              } max-3xl`}
            >
              {content[language].subtitle}
            </p>
          </div>

          <div
            ref={formRef}
            className={`max-w-2xl ${
              isArabic ? "mr-1" : "ml-1"
            } shadow-gray-600`}
          >
            <form
              onSubmit={handleSubmit}
              className={`space-y-8 p-8 rounded-xl 
              ${
                darkMode
                  ? "bg-gray-100 shadow-lg"
                  : "bg-white/10 backdrop-blur-md shadow xl"
              }`}
              dir={isArabic ? "rtl" : "ltr"}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label
                    htmlFor="name"
                    className={`block text-sm font-medium mb-2
                  ${darkMode ? "text-gray-700" : "text-gray-300"} 
                  ${isArabic ? "text-right" : "text-left"}`}
                  >
                    {content[language].formLabels.name}
                  </label>
                  <div
                    className={`relative ${
                      darkMode ? "bg-gray-100" : "bg-white/5"
                    } rounded-lg p-1`}
                  >
                    <input
                      ref={addToInputRefs}
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full py-3 px-4 rounded-lg
                      ${
                        darkMode
                          ? "bg-gray-100 text-gray-800 shadow-[inset_3px_3px_6px_#c8c9cc,inset_-3px_-3px_6px_#ffffff]"
                          : "bg-dark-mode text-gray-200"
                      }
                      focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300`}
                      placeholder={content[language].formLabels.name}
                    />
                  </div>
                </div>
                <div className="group">
                  <label
                    htmlFor="email"
                    className={`block text-sm font-medium 
                    ${darkMode ? "text-gray-700" : "text-gray-300"} mb-2`}
                  >
                    {content[language].formLabels.email}
                  </label>
                  <div
                    className={`relative ${
                      darkMode ? "bg-gray-100" : "bg-white/5"
                    } rounded-lg p-1`}
                  >
                    <input
                      ref={addToInputRefs}
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full py-3 px-4 rounded-lg
                        ${
                          darkMode
                            ? "bg-gray-100 text-gray-800 shadow-[inset_3px_3px_6px_#c8c9cc,inset_-3px_-3px_6px_#ffffff]"
                            : "bg-dark-mode text-gray-200"
                        }
                        focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300`}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
              </div>

              <div className="group">
                <label
                  htmlFor="mobile"
                  className={`block text-sm font-medium 
                    ${darkMode ? "text-gray-700" : "text-gray-300"} mb-2`}
                >
                  {content[language].formLabels.mobile}
                </label>
                <div
                  className={`relative ${
                    darkMode ? "bg-gray-100" : "bg-white/10"
                  } rounded-lg p-1`}
                >
                  <input
                    ref={addToInputRefs}
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className={`w-full py-3 px-4 rounded-lg
                        ${
                          darkMode
                            ? "bg-gray-100 text-gray-800 shadow-[inset_3px_3px_6px_#c8c9cc,inset_-3px_-3px_6px_#ffffff]"
                            : "bg-dark-mode text-gray-200"
                        }
                        focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300`}
                    placeholder="+9664567890"
                  />
                </div>
              </div>

              <div className="group">
                <label
                  htmlFor="subject"
                  className={`block text-sm font-medium 
                    ${darkMode ? "text-gray-700" : "text-gray-300"} mb-2`}
                >
                  {content[language].formLabels.subject}
                </label>
                <div
                  className={`relative ${
                    darkMode ? "bg-gray-100" : "bg-white/10"
                  } rounded-lg p-1`}
                >
                  <input
                    ref={addToInputRefs}
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full py-3 px-4 rounded-lg
                        ${
                          darkMode
                            ? "bg-gray-100 text-gray-800 shadow-[inset_3px_3px_6px_#c8c9cc,inset_-3px_-3px_6px_#ffffff]"
                            : "bg-dark-mode text-gray-200"
                        }
                        focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300`}
                    placeholder={
                      isArabic ? "ما هو موضوع رسالتك؟" : "What's this about?"
                    }
                  />
                </div>
              </div>

              <div className="group">
                <label
                  htmlFor="message"
                  className={`block text-sm font-medium 
                    ${darkMode ? "text-gray-700" : "text-gray-300"} mb-2`}
                >
                  {content[language].formLabels.message}
                </label>
                <div
                  className={`relative ${
                    darkMode ? "bg-gray-100" : "bg-dark-mode"
                  } rounded-lg p-1`}
                >
                  <textarea
                    ref={addToInputRefs}
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className={`w-full py-3 px-4 rounded-lg
                        ${
                          darkMode
                            ? "bg-gray-100 text-gray-800 shadow-[inset_3px_3px_6px_#c8c9cc,inset_-3px_-3px_6px_#ffffff]"
                            : "bg-dark-mode text-gray-200"
                        }
                        focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300`}
                    placeholder={
                      isArabic
                        ? "أخبرنا عن مشروعك..."
                        : "Tell us about your project..."
                    }
                  ></textarea>
                </div>
              </div>

              {error && <p className="text-red-600">{error}</p>}
              {success && <p className="text-green-600">{success}</p>}

              <div>
              <button
              ref={buttonRef}
              type="submit"
              className={`w-full font-medium py-3 px-6 rounded-xl disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 relative overflow-hidden ${
                !darkMode 
                  ? "bg-dark-mode hover:shadow-[inset_2px_2px_8px_#1a1a1a,_inset_-5px_-5px_10px_#3a3a3a]" 
                  : "bg-gray-100 shadow-[5px_5px_10px_#d1d1d1,_-5px_-5px_10px_#ffffff] hover:shadow-[inset_5px_5px_10px_#d1d1d1,_inset_-5px_-5px_10px_#ffffff]"
              }`}
              disabled={loading}
            >
              <span className="bg-gradient-to-r from-primary-green to-secondary-blue bg-clip-text text-transparent">
                {loading ? "Sending..." : content[language].buttonText}
              </span>
            </button>
              </div>
            </form>
          </div>

          <div className={`max-w-2xl ${isArabic ? "mr-1" : "ml-1"} mt-8`}>
            <div
              className={`p-6 rounded-xl ${
                darkMode ? "bg-gray-100" : "bg-white/10"
              }`}
            >
              <p
                className={`${darkMode ? "text-gray-800" : "text-white"} mb-2 ${
                  isArabic ? "text-right" : ""
                }`}
              >
                {content[language].contactInfo.nationalAddress}
              </p>
              <p
                className={`${
                  darkMode ? "text-gray-800" : "text-white"
                } flex items-center gap-2 ${isArabic ? "text-right" : ""}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-blue-600 mb-2"
                >
                  <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM5 8H0v16h5V8zM24 24h-5v-7c0-1.68-.03-3.85-2.34-3.85-2.34 0-2.7 1.83-2.7 3.72V24h-5V8h4.8v2.2h.07c.67-1.26 2.3-2.6 4.73-2.6C23.2 7.6 24 11 24 14.83V24z" />
                </svg>
                <a
                  href="https://www.linkedin.com/company/lubab/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {content[language].contactInfo.linkedin}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
