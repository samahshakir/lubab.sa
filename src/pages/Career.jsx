import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useDarkMode } from '../context/DarkModeContext';
import { useLanguage } from '../context/LanguageContext';
import client from "../sanityClient"; 
import { Link } from 'react-router-dom';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);
const Careers = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const { darkMode } = useDarkMode();
  const { isArabic } = useLanguage();
  const [showForm, setShowForm] = useState(false);
  const [careerAreas, setCareerAreas] = useState([]);
  const [whyJoin, setWhyJoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    message: ''
  });
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
      if (response.ok) {
        alert(result.message);
        setFormData({
          name: "",
          email: "",
          phone: "",
          position: "",
          experience: "",
          message: ""
        });
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit application");
    }
  };
  
  
  useEffect(() => {
    // Animate the heading and subheading
    if (headingRef.current && subheadingRef.current) {
      // Animate the heading and subheading
      gsap.set([headingRef.current, subheadingRef.current], {
        opacity: 0,
        y: 30
      });
    }
    
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

    const fetchCareers = async () => {
      setLoading(true); 
      const careers = await client.fetch(`*[_type == "career"]{titleEn, titleAr, descriptionEn, descriptionAr}`);
      const whyJoinData = await client.fetch(`*[_type == "whyJoin"]{titleEn, titleAr, descriptionEn, descriptionAr}`);
      
      setCareerAreas(careers);
      setWhyJoin(whyJoinData);
      setLoading(false);
    };

    fetchCareers();

  }, [isArabic]);

  const LoadingScreen = () => (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${darkMode ? 'bg-light-gray' : 'bg-dark-mode'} transition-opacity duration-500`}>
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-t-transparent border-b-transparent rounded-full mx-auto mb-4 animate-spin" 
             style={{borderColor: darkMode ? '#00BC78 transparent #101828 transparent' : '#00BC78 transparent white transparent'}}></div>
        <h2 className={`text-xl font-bold ${darkMode ? 'text-[#101828]' : 'text-white'}`}>Loading Content</h2>
      </div>
    </div>
  );

   if (loading) {
    return <LoadingScreen />;
  }
  
  return (
    <div ref={sectionRef} className={`relative ${darkMode ? "bg-light-gray" : "bg-dark-mode"} font-nizar min-h-screen py-20 overflow-hidden`}>
      
      <div className="container mx-auto px-6">

      <Link to="/auth" className="absolute top-6 right-6 text-2xl text-gray-600 hover:text-primary-blue transition">
      <img src="./src/assets/user.png" alt="" className="h-6 w-auto mr-1"
              />
      </Link>

        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 ref={headingRef} className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-secondary-blue">
            {isArabic ? "التوظيف – انضم إلى فريق لُباب" : "Careers at Lubab"}
          </h2>
          <p ref={subheadingRef} className="text-lg text-gray-500 max-w-3xl mx-auto">
            {isArabic 
              ? "فرصة للابتكار والانضمام إلى رحلة التحول الرقمي"
              : "A Chance to Innovate and Join the Digital Transformation Journey"
            }
          </p>
        </div>

        {/* Career Introduction & Apply Button */}
        {!showForm ? (
          <>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <p className={`mb-8 text-lg ${darkMode ? "text-gray-700" : "text-gray-300"}`}>
                {isArabic 
                  ? "بيئة ديناميكية، تحفيزية، تدعم النمو والتطور المهني. يتم التقديم عبر نموذج بيانات نصي دون تحميل ملفات."
                  : "Are you passionate about innovation and eager to work in an environment that fosters continuous growth? Applications are submitted via a text-based form (to minimize server storage), ensuring a streamlined process."
                }
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-full font-medium transition-all hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                {isArabic ? "قدّم الآن" : "Apply Now"}
              </button>
            </div>

            {/* Dynamic Career Areas (Fetched from Sanity) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
              {careerAreas.map((area, index) => (
                <div 
                  key={index}
                  className={`p-6 rounded-xl transition-all ${darkMode ? "bg-white shadow-md hover:shadow-xl" : "bg-dark-gray hover:bg-gray-750"} transform hover:-translate-y-2 duration-300`}
                  style={{
                    opacity: 0,
                    animation: `fadeIn 0.5s ease-out forwards ${0.2 + index * 0.1}s`
                  }}
                >
                  <h3 className={`text-xl font-bold mb-3 ${darkMode ? "text-gray-800" : "text-white"}`}>
                    {isArabic ? area.titleAr : area.titleEn}
                  </h3>
                  <p className={`${darkMode ? "text-gray-600" : "text-gray-300"}`}>
                    {isArabic ? area.descriptionAr : area.descriptionEn}
                  </p>
                </div>
              ))}
            </div>

            {/* Why Join Section */}
          {/* Why Join Lubab Section (Dynamic from Sanity) */}
        <div className="mt-16 text-center">
          <h3 className={`text-2xl font-semibold mb-6 ${darkMode ? "text-gray-800" : "text-white"}`}>
            {isArabic ? "لماذا تنضم إلى لُباب؟" : "Why Join Lubab?"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {whyJoin.map((item, index) => (
              <div 
                key={index}
                className={`p-5 rounded-lg transition-all ${darkMode ? "bg-green-50" : "bg-dark-gray"} transform hover:scale-105 duration-300`}
                style={{ opacity: 0, animation: `fadeIn 0.5s ease-out forwards ${0.2 + index * 0.1}s` }}
              >
                <h4 className={`text-lg font-medium mb-2 ${darkMode ? "text-gray-800" : "text-white"}`}>
                  {isArabic ? item.titleAr : item.titleEn}
                </h4>
                <p className={`${darkMode ? "text-gray-600" : "text-gray-300"}`}>
                  {isArabic ? item.descriptionAr : item.descriptionEn}
                </p>
              </div>
            ))}
          </div>
        </div>

          </>
        ) :(
          <div className="max-w-2xl mx-auto">
            <div className={`p-8 rounded-xl ${darkMode ? 'bg-white shadow-lg' : 'bg-secondary-dark-gray'}`}>
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
                      className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'border-gray-300 focus:border-white text-black' : 'border-gray-700 bg-dark-gray text-white focus:border-white'} focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors `}
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
                      className={`w-full px-4 py-2 rounded-lg border  ${darkMode ? 'border-gray-300 focus:border-white text-black' : 'border-gray-700 bg-dark-gray text-white focus:border-white'} focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors`}
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
                      className={`w-full px-4 py-2 rounded-lg border  ${darkMode ? 'border-gray-300 focus:border-white text-black' : 'border-gray-700 bg-dark-gray text-white focus:border-white'} focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors`}
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
                      className={`w-full px-4 py-2 rounded-lg border  ${darkMode ? 'border-gray-300 focus:border-white text-black' : 'border-gray-700 bg-dark-gray text-white focus:border-white'} focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors`}
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
                    className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'border-gray-300 focus:border-white text-black' : 'border-gray-700 bg-dark-gray text-white focus:border-white'} focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors`}>
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
                    className={`w-full px-4 py-2 rounded-lg border  ${darkMode ? 'border-gray-300 focus:border-white text-black' : 'border-gray-700 bg-dark-gray text-white focus:border-white'} focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors`}
                  ></textarea>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 rtl:space-x-reverse">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className={`px-6 py-2 rounded-lg border ${darkMode ? 'border-gray-300 text-gray-700 hover:bg-gray-100' : 'border-gray-600 text-gray-300 hover:bg-dark-gray'} transition-colors`}
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