import React, { useRef } from 'react';
import Spline from '@splinetool/react-spline';
import { useDarkMode } from '../context/DarkModeContext';
import { useLanguage } from '../context/LanguageContext'; // Assuming this context exists

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const inputRefs = useRef([]);
  const buttonRef = useRef(null);
  const containerRef = useRef(null);
  const { darkMode } = useDarkMode();
  const { isArabic } = useLanguage(); // Using isArabic from context

  // Determine current language
  const language = isArabic ? 'ar' : 'en';

  // Multilanguage content
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
        linkedin: "LinkedIn: https://www.linkedin.com/company/lubab/"
      }
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
        linkedin: "لينكد إن: https://www.linkedin.com/company/lubab/"
      }
    }
  };

  // Function to add input elements to refs array
  const addToInputRefs = (el) => {
    if (el && !inputRefs.current.includes(el)) {
      inputRefs.current.push(el);
    }
  };

  return (
    <div ref={sectionRef} className={`relative min-h-screen ${darkMode ? 'bg-[rgb(230,230,230)]' : 'bg-dark-mode'} border-t`}>
      {/* Content */}
      <section className="relative z-10 min-h-screen flex items-start justify-start pt-15 pb-20">
        <div ref={containerRef} className="container mx-auto px-6">
          <div className={`text-left mb-16 ml-8 ${isArabic ? 'text-right mr-8' : ''}`}>
            <h2 
              ref={headingRef} 
              className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r 
              from-blue-500 to-blue-600"
            >
              {content[language].title}
            </h2>
            <p 
              ref={textRef} 
              className={`text-lg md:text-xl ${darkMode ? 'text-gray-800' : 'text-white'} max-3xl`}
            >
              {content[language].subtitle}
            </p>
          </div>
          
          {/* Contact Form */}
          <div 
            ref={formRef} 
            className={`max-w-2xl ${isArabic ? 'mr-8' : 'ml-8'} shadow-gray-600`}
          >
            <form className={`space-y-8 p-8 rounded-xl 
              ${darkMode ? 'bg-gray-100 shadow-lg' : 'bg-secondary-dark-gray dark:shadow-[3px_3px_6px_#16181c,-3px_-3px_6px_#2a2e34]'}`}
              dir={isArabic ? 'rtl' : 'ltr'}>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label htmlFor="name" className={`block text-sm font-medium 
                    ${darkMode ? 'text-gray-700' : 'text-gray-300'} mb-2 
                    ${isArabic ? 'text-right' : 'text-left'}`}>
                    {content[language].formLabels.name}
                  </label>
                  <input 
                    ref={addToInputRefs}
                    type="text" 
                    id="name" 
                    className={`w-full py-3 px-4 rounded-lg border border-gray-300 
                      ${darkMode ? 'bg-white text-gray-800' : 'bg-dark-gray text-gray-200'}
                      focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300`}
                    placeholder={content[language].formLabels.name}
                  />
                </div>
                <div className="group">
                  <label htmlFor="email" className={`block text-sm font-medium 
                    ${darkMode ? 'text-gray-700' : 'text-gray-300'} mb-2`}>
                    {content[language].formLabels.email}
                  </label>
                  <input 
                    ref={addToInputRefs}
                    type="email" 
                    id="email" 
                    className={`w-full py-3 px-4 rounded-lg border border-gray-300 
                      ${darkMode ? 'bg-white text-gray-800' : 'bg-dark-gray text-gray-200'}
                      focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300`}
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              {/* Mobile Number Field (Optional) */}
              <div className="group">
                <label htmlFor="mobile" className={`block text-sm font-medium 
                  ${darkMode ? 'text-gray-700' : 'text-gray-300'} mb-2`}>
                  {content[language].formLabels.mobile}
                </label>
                <input 
                  ref={addToInputRefs}
                  type="tel" 
                  id="mobile" 
                  className={`w-full py-3 px-4 rounded-lg border border-gray-300 
                    ${darkMode ? 'bg-white text-gray-800' : 'bg-dark-gray text-gray-200'}
                    focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300`}
                  placeholder="+1234567890"
                />
              </div>
              
              <div className="group">
                <label htmlFor="subject" className={`block text-sm font-medium 
                  ${darkMode ? 'text-gray-700' : 'text-gray-300'} mb-2`}>
                  {content[language].formLabels.subject}
                </label>
                <input 
                  ref={addToInputRefs}
                  type="text" 
                  id="subject" 
                  className={`w-full py-3 px-4 rounded-lg border border-gray-300 
                    ${darkMode ? 'bg-white text-gray-800' : 'bg-dark-gray text-gray-200'}
                    focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300`}
                  placeholder={isArabic ? "ما هو موضوع رسالتك؟" : "What's this about?"}
                />
              </div>
              
              <div className="group">
                <label htmlFor="message" className={`block text-sm font-medium 
                  ${darkMode ? 'text-gray-700' : 'text-gray-300'} mb-2`}>
                  {content[language].formLabels.message}
                </label>
                <textarea 
                  ref={addToInputRefs}
                  id="message" 
                  rows="5" 
                  className={`w-full py-3 px-4 rounded-lg border border-gray-300 
                    ${darkMode ? 'bg-white text-gray-800' : 'bg-dark-gray text-gray-200'}
                    focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300`}
                  placeholder={isArabic ? "أخبرنا عن مشروعك..." : "Tell us about your project..."}
                ></textarea>
              </div>
              
              <div>
                <button 
                  ref={buttonRef}
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-500 to-green-600 text-white font-medium py-3 px-6 rounded-md shadow-lg hover:shadow-pink-500/25 transition-all duration-300"
                >
                  {content[language].buttonText}
                </button>
              </div>
            </form>
          </div>
          
          {/* Contact Info */}
          <div className={`max-w-2xl ${isArabic ? 'mr-8' : 'ml-8'} mt-8`}>
            <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-100' : 'bg-dark-gray'}`}>
              <p className={`${darkMode ? 'text-gray-800' : 'text-white'} mb-2 ${isArabic ? 'text-right' : ''}`}>
                {content[language].contactInfo.nationalAddress}
              </p>
              <p className={`${darkMode ? 'text-gray-800' : 'text-white'} ${isArabic ? 'text-right' : ''}`}>
                {content[language].contactInfo.linkedin}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;