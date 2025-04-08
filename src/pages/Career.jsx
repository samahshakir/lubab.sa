import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useDarkMode } from '../context/DarkModeContext';
import { useLanguage } from '../context/LanguageContext';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);
const Careers = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const { darkMode } = useDarkMode();
  const { isArabic } = useLanguage();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    message: ''
  });
  
  const careerAreas = [
    {
      icon: <i className="fas fa-laptop-code"></i>,
      title: isArabic ? "تطوير البرمجيات" : "Software Development",
      description: isArabic 
        ? "انضم إلى فريق المطورين لدينا لبناء حلول SaaS مبتكرة وتطبيقات متطورة."
        : "Join our development team to build innovative SaaS solutions and cutting-edge applications."
    },
    {
      icon: <i className="fas fa-shield-alt"></i>,
      title: isArabic ? "الاستشارات التقنية والأمنية" : "Technical Consulting",
      description: isArabic 
        ? "قدم خبرتك في مجال الاستشارات التقنية وأمن المعلومات لمساعدة عملائنا."
        : "Provide your expertise in technical consulting and information security to help our clients."
    },
    {
      icon: <i className="fas fa-chart-line"></i>,
      title: isArabic ? "تحليل البيانات" : "Data Analysis",
      description: isArabic 
        ? "استخدم مهاراتك التحليلية لاستخراج رؤى قيمة من البيانات وتحسين عمليات الأعمال."
        : "Use your analytical skills to extract valuable insights from data and improve business operations."
    },
    {
      icon: <i className="fas fa-tasks"></i>,
      title: isArabic ? "إدارة المشاريع" : "Project Management",
      description: isArabic 
        ? "قم بتنسيق وإدارة مشاريع التحول الرقمي وضمان تسليمها بنجاح."
        : "Coordinate and manage digital transformation projects and ensure their successful delivery."
    }
  ];
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    // Reset form and show success message
    setFormData({
      name: '',
      email: '',
      phone: '',
      position: '',
      experience: '',
      message: ''
    });
    alert(isArabic ? 'تم إرسال طلبك بنجاح!' : 'Your application has been submitted successfully!');
    setShowForm(false);
  };
  
  useEffect(() => {
    // Animate the heading and subheading
    gsap.set([headingRef.current, subheadingRef.current], {
      opacity: 0,
      y: 30
    });
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        onEnter: () => tl.play(),
        onLeaveBack: () => tl.reverse()
      }
    });
    
    tl.to(headingRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    }).to(subheadingRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.7");
    
    // Add a slight parallax effect to the background
    gsap.to(".careers-bg-gradient", {
      backgroundPosition: "0% 100%",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  }, [isArabic]);
  
  return (
    <div ref={sectionRef} className={`relative ${darkMode ? 'bg-light-gray' : 'bg-dark-mode'} font-nizar min-h-screen py-20 overflow-hidden`}>
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 
            ref={headingRef} 
            className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-secondary-blue"
          >
            {isArabic ? "التوظيف – انضم إلى فريق لُباب" : "Careers at Lubab"}
          </h2>
          <p 
            ref={subheadingRef} 
            className="text-lg text-gray-500 max-w-3xl mx-auto"
          >
            {isArabic 
              ? "فرصة للابتكار والانضمام إلى رحلة التحول الرقمي"
              : "A Chance to Innovate and Join the Digital Transformation Journey"
            }
          </p>
        </div>
        
        {!showForm ? (
          <>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <p className={`mb-8 text-lg ${darkMode ? 'text-gray-700' : 'text-gray-300'}`}>
                {isArabic 
                  ? "بيئة ديناميكية، تحفيزية، تدعم النمو والتطور المهني. يتم التقديم عبر نموذج بيانات نصي دون تحميل ملفات."
                  : "Are you passionate about innovation and eager to work in an environment that fosters continuous growth? At Lubab, we offer diverse career opportunities in software development, technical consulting, project management, data analysis, and more. Applications are submitted via a text-based form (to minimize server storage), ensuring a streamlined process."
                }
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-full font-medium transition-all hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                {isArabic ? "قدّم الآن" : "Apply Now"}
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
              {careerAreas.map((area, index) => (
                <div 
                  key={index}
                  className={`p-6 rounded-xl transition-all ${darkMode ? 'bg-white shadow-md hover:shadow-xl' : 'bg-dark-gray hover:bg-gray-750'} transform hover:-translate-y-2 duration-300`}
                  style={{
                    opacity: 0,
                    animation: `fadeIn 0.5s ease-out forwards ${0.2 + index * 0.1}s`
                  }}
                >
                  <div className={`text-4xl mb-4 ${darkMode ? 'text-purple-500' : 'text-purple-400'}`}>
                    {area.icon}
                  </div>
                  <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-gray-800' : 'text-white'}`}>
                    {area.title}
                  </h3>
                  <p className={`${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>
                    {area.description}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-16 text-center">
              <h3 className={`text-2xl font-semibold mb-6 ${darkMode ? 'text-gray-800' : 'text-white'}`}>
                {isArabic ? "لماذا تنضم إلى لُباب؟" : " Join Lubab?"}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className={`p-5 rounded-lg ${darkMode ? 'bg-green-50' : 'bg-dark-gray'}`}>
                  <div className="text-3xl text-purple-500 mb-3">
                    <i className="fas fa-rocket"></i>
                  </div>
                  <h4 className={`text-lg font-medium mb-2 ${darkMode ? 'text-gray-800' : 'text-white'}`}>
                    {isArabic ? "ابتكار وإبداع" : "Innovation & Creativity"}
                  </h4>
                  <p className={`${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>
                    {isArabic ? "فرصة للعمل على تقنيات متطورة وحلول مبتكرة" : "Opportunity to work on cutting-edge technologies and innovative solutions"}
                  </p>
                </div>
                
                <div className={`p-5 rounded-lg ${darkMode ? 'bg-blue-50' : 'bg-dark-gray'}`}>
                  <div className="text-3xl text-blue-500 mb-3">
                    <i className="fas fa-users"></i>
                  </div>
                  <h4 className={`text-lg font-medium mb-2 ${darkMode ? 'text-gray-800' : 'text-white'}`}>
                    {isArabic ? "ثقافة داعمة" : "Supportive Culture"}
                  </h4>
                  <p className={`${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>
                    {isArabic ? "بيئة عمل إيجابية تدعم التعلم المستمر والتطور المهني" : "Positive work environment that supports continuous learning and professional growth"}
                  </p>
                </div>
                
                <div className={`p-5 rounded-lg ${darkMode ? 'bg-yellow-50' : 'bg-dark-gray'}`}>
                  <div className="text-3xl text-indigo-500 mb-3">
                    <i className="fas fa-lightbulb"></i>
                  </div>
                  <h4 className={`text-lg font-medium mb-2 ${darkMode ? 'text-gray-800' : 'text-white'}`}>
                    {isArabic ? "تأثير حقيقي" : "Meaningful Impact"}
                  </h4>
                  <p className={`${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>
                    {isArabic ? "المساهمة في حلول تحدث فرقًا حقيقيًا في مجال الأعمال" : "Contribute to solutions that make a real difference in the business landscape"}
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className={`p-8 rounded-xl ${darkMode ? 'bg-white shadow-lg' : 'bg-gray-800'}`}>
              <h3 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-gray-800' : 'text-white'} text-center`}>
                {isArabic ? "استمارة التقديم" : "Application Form"}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className={`block mb-2 font-medium ${darkMode ? 'text-gray-700' : 'text-gray-200'}`}>
                      {isArabic ? "الاسم الكامل" : "Full Name"}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'border-gray-300 focus:border-purple-500' : 'border-gray-700 bg-gray-700 focus:border-purple-400'} focus:outline-none focus:ring-2 focus:ring-purple-200 transition-colors`}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className={`block mb-2 font-medium ${darkMode ? 'text-gray-700' : 'text-gray-200'}`}>
                      {isArabic ? "البريد الإلكتروني" : "Email Address"}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'border-gray-300 focus:border-purple-500' : 'border-gray-700 bg-gray-700 focus:border-purple-400'} focus:outline-none focus:ring-2 focus:ring-purple-200 transition-colors`}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className={`block mb-2 font-medium ${darkMode ? 'text-gray-700' : 'text-gray-200'}`}>
                      {isArabic ? "رقم الهاتف" : "Phone Number"}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'border-gray-300 focus:border-purple-500' : 'border-gray-700 bg-gray-700 focus:border-purple-400'} focus:outline-none focus:ring-2 focus:ring-purple-200 transition-colors`}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="position" className={`block mb-2 font-medium ${darkMode ? 'text-gray-700' : 'text-gray-200'}`}>
                      {isArabic ? "المنصب المرغوب" : "Desired Position"}
                    </label>
                    <select
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'border-gray-300 focus:border-purple-500' : 'border-gray-700 bg-gray-700 focus:border-purple-400'} focus:outline-none focus:ring-2 focus:ring-purple-200 transition-colors`}
                    >
                      <option value="">{isArabic ? "اختر المنصب" : "Select Position"}</option>
                      <option value="developer">{isArabic ? "مطور برمجيات" : "Software Developer"}</option>
                      <option value="consultant">{isArabic ? "مستشار تقني" : "Technical Consultant"}</option>
                      <option value="analyst">{isArabic ? "محلل بيانات" : "Data Analyst"}</option>
                      <option value="pm">{isArabic ? "مدير مشاريع" : "Project Manager"}</option>
                      <option value="other">{isArabic ? "منصب آخر" : "Other Position"}</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="experience" className={`block mb-2 font-medium ${darkMode ? 'text-gray-700' : 'text-gray-200'}`}>
                    {isArabic ? "سنوات الخبرة" : "Years of Experience"}
                  </label>
                  <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'border-gray-300 focus:border-purple-500' : 'border-gray-700 bg-gray-700 focus:border-purple-400'} focus:outline-none focus:ring-2 focus:ring-purple-200 transition-colors`}
                  >
                    <option value="">{isArabic ? "اختر سنوات الخبرة" : "Select Experience"}</option>
                    <option value="entry">{isArabic ? "أقل من سنتين" : "Less than 2 years"}</option>
                    <option value="mid">{isArabic ? "2-5 سنوات" : "2-5 years"}</option>
                    <option value="senior">{isArabic ? "6-10 سنوات" : "6-10 years"}</option>
                    <option value="expert">{isArabic ? "أكثر من 10 سنوات" : "More than 10 years"}</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className={`block mb-2 font-medium ${darkMode ? 'text-gray-700' : 'text-gray-200'}`}>
                    {isArabic ? "نبذة مختصرة عنك ومهاراتك" : "Brief About Yourself and Your Skills"}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="5"
                    required
                    className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'border-gray-300 focus:border-purple-500' : 'border-gray-700 bg-gray-700 focus:border-purple-400'} focus:outline-none focus:ring-2 focus:ring-purple-200 transition-colors`}
                  ></textarea>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 rtl:space-x-reverse">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className={`px-6 py-2 rounded-lg border ${darkMode ? 'border-gray-300 text-gray-700 hover:bg-gray-100' : 'border-gray-600 text-gray-300 hover:bg-gray-700'} transition-colors`}
                  >
                    {isArabic ? "إلغاء" : "Cancel"}
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg font-medium transition-all hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                  >
                    {isArabic ? "إرسال الطلب" : "Submit Application"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Add a CareerCard component similar to ServiceCard for animations
const CareerCard = ({ icon, title, description, index }) => {
  const cardRef = useRef(null);
  const { darkMode } = useDarkMode();
  
  useEffect(() => {
    gsap.set(cardRef.current, {
      opacity: 0,
      y: 50
    });
    
    gsap.to(cardRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.2 + index * 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 80%"
      }
    });
  }, [index]);
  
  return (
    <div 
      ref={cardRef}
      className={`p-6 rounded-xl transition-all ${darkMode ? 'bg-white shadow-md hover:shadow-xl' : 'bg-gray-800 hover:bg-gray-750'} transform hover:-translate-y-2 duration-300`}
    >
      <div className={`text-4xl mb-4 ${darkMode ? 'text-purple-500' : 'text-purple-400'}`}>
        {icon}
      </div>
      <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-gray-800' : 'text-white'}`}>
        {title}
      </h3>
      <p className={`${darkMode ? 'text-gray-600' : 'text-gray-300'}`}>
        {description}
      </p>
    </div>
  );
};

export default Careers;