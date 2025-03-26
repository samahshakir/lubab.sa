import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useDarkMode } from '../context/DarkModeContext';
import { useLanguage } from '../context/LanguageContext';


// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {

  const {darkMode} = useDarkMode();
  const {isArabic} = useLanguage();
  const headingRef = useRef(null);
  const contentRef = useRef(null);
  const valuesRef = useRef(null);
  
  useEffect(() => {

    
    // Make sure refs are available before animating
    if (headingRef.current && contentRef.current && valuesRef.current) {
      // Animation for heading
      gsap.fromTo(headingRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
      
      // Animation for content
      gsap.fromTo(contentRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" }
      );
      
      // Animation for values - use Array.from to ensure we have a proper array
      const valueItems = Array.from(valuesRef.current.children);
      if (valueItems.length > 0) {
        gsap.fromTo(valueItems, 
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.8, 
            stagger: 0.15, 
            delay: 0.6, 
            ease: "power2.out" 
          }
        );
      }
    }
    
    // Cleanup function to prevent memory leaks
    return () => {
      gsap.killTweensOf([
        headingRef.current, 
        contentRef.current,
        ...(valuesRef.current ? Array.from(valuesRef.current.children) : [])
      ]);
    };
  }, [isArabic]); // Re-run when language changes

  return (
    <main className="container min-h-screen mx-auto px-4 pt-24 pb-20 relative font-nizar mt-10">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
        style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="white" fill-opacity="1" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="1"/%3E%3Ccircle cx="13" cy="13" r="1"/%3E%3C/g%3E%3C/svg%3E")',
               backgroundSize: '20px 20px'}}></div>
      
      {/* Gradient Backgrounds */}
      <div className={`absolute top-40 right-10 w-96 h-96 ${darkMode ? "bg-green-500" : "bg-green-600"} rounded-full opacity-20 blur-3xl transition-colors duration-300`}></div>
      <div className={`absolute top-60 left-10 w-72 h-72 ${darkMode ? "bg-blue-400" : "bg-blue-500"} rounded-full opacity-15 blur-3xl transition-colors duration-300`}></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Title Section */}
        <div 
          ref={headingRef}
          className={`text-center mb-10 ${isArabic ? "rtl" : "ltr"}`}
        >
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? "text-dark-gray" : "text-white"}`}>
            {isArabic ? "من نحن" : "About Us"}
          </h1>
          <h2 className="text-2xl md:text-3xl text-secondary-blue font-semibold">
            {isArabic ? "من شغف الابتكار إلى قيادة التحول الرقمي" : "From a Passion for Innovation to Leading Digital Transformation"}
          </h2>
        </div>
        
        {/* Main Content */}
        <div 
          ref={contentRef}
          className={`mb-5 text-lg ${darkMode ? "text-secondary-dark-gray" : "text-gray-200"} ${isArabic ? "rtl text-right" : "ltr text-left"}`}
        >
          <p className="mb-6 leading-relaxed">
            {isArabic ? `انطلقت شركة لُباب لالتصاالت وتقنية المعلومات المحدودة عام
          2024 في مدينة خميس مشيط، بقيادة المؤسسين خالد سفر آل
          شلوان وعبدالوهاب رفدان الشهراني. هدفنا هو تطوير حلول
          ا حقيقيًا في قطاع األعمال وحياة األفراد.
          تقنية مبتكرة تحدث فرقً
          اليوم نمثل كيانًا سعوديًا احترافيًا يوظف اإلبداع والخبرة
          لمعالجة التحديات الرقمية بشكل فعّال`
              : "Lubab CIT Ltd. was founded in 2024 in Khamis Mushait by Khalid Safer Al-Shalwan and Abdulwahab Rafdan Al-Shahrani with the aim of delivering innovative tech solutions that make a tangible impact on businesses and everyday life. Today, we stand as a professional Saudi entity combining creativity and expertise to address digital challenges effectively"
            }
          </p>
        </div>
        
        {/* Values Section */}
        <div className={`${isArabic ? "rtl text-right" : "ltr text-left"}`}>
          <h3 className={`text-2xl font-bold mb-8 ${darkMode ? "text-dark-gray" : "text-white"}`}>
            {isArabic ? "قيمنا:" : "Our Values:"}
          </h3>
          
          <div ref={valuesRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {/* Value 1 */}
          <div className="bg-opacity-10 bg-white p-6 rounded-lg backdrop-blur-sm border border-gray-700 border-opacity-20 hover:border-primary-green transition-all duration-300">
            <h4 className="text-xl font-bold mb-2 text-primary-green">
              {isArabic ? "الابتكار" : "Innovation"}
            </h4>
            <p className={`${darkMode ? "text-secondary-dark-gray" : "text-gray-300"}`}>
              {isArabic 
                ? "نسعى دائماً لاكتشاف فرص جديدة وابتكار حلول خارجة عن المألوف."
                : "We constantly seek new opportunities and unique solutions."
              }
            </p>
          </div>

          {/* Value 2 */}
          <div className="bg-opacity-10 bg-white p-6 rounded-lg backdrop-blur-sm border border-gray-700 border-opacity-20 hover:border-primary-green transition-all duration-300">
            <h4 className="text-xl font-bold mb-2 text-primary-green">
              {isArabic ? "الاحترافية" : "Professionalism"}
            </h4>
            <p className={`${darkMode ? "text-secondary-dark-gray" : "text-gray-300"}`}>
              {isArabic 
                ? "نلتزم بأعلى معايير الجودة والدقة في جميع مشاريعنا."
                : "We adhere to the highest standards of quality and precision in all our projects."
              }
            </p>
          </div>

          {/* Value 3 */}
          <div className="bg-opacity-10 bg-white p-6 rounded-lg backdrop-blur-sm border border-gray-700 border-opacity-20 hover:border-primary-green transition-all duration-300">
            <h4 className="text-xl font-bold mb-2 text-primary-green">
              {isArabic ? "الشراكة" : "Partnership"}
            </h4>
            <p className={`${darkMode ? "text-secondary-dark-gray" : "text-gray-300"}`}>
              {isArabic 
                ? "نبني علاقات استراتيجية طويلة الأمد ترتكز على الثقة والهدف المشترك."
                : "We build long-term, strategic relationships grounded in trust and shared objectives."
              }
            </p>
          </div>

          {/* Value 4 */}
          <div className="bg-opacity-10 bg-white p-6 rounded-lg backdrop-blur-sm border border-gray-700 border-opacity-20 hover:border-primary-green transition-all duration-300">
            <h4 className="text-xl font-bold mb-2 text-primary-green">
              {isArabic ? "الشفافية" : "Transparency"}
            </h4>
            <p className={`${darkMode ? "text-secondary-dark-gray" : "text-gray-300"}`}>
              {isArabic 
                ? "نصارح عملاءنا بكل التفاصيل، فالمصداقية أساس نجاحنا."
                : "We maintain honesty with our clients, as credibility is the foundation of our success."
              }
            </p>
          </div>

          {/* Value 5 */}
          <div className="bg-opacity-10 bg-white p-6 rounded-lg backdrop-blur-sm border border-gray-700 border-opacity-20 hover:border-primary-green transition-all duration-300">
            <h4 className="text-xl font-bold mb-2 text-primary-green">
              {isArabic ? "التركيز على الحلول" : "Solutions-Driven"}
            </h4>
            <p className={`${darkMode ? "text-secondary-dark-gray" : "text-gray-300"}`}>
              {isArabic 
                ? "نقيس نجاحنا بمقدار ما تحققه حلولنا من نتائج حقيقية."
                : "We measure our success by how effectively our solutions produce real, measurable outcomes."
              }
            </p>
          </div>

          {/* Value 6 */}
          <div className="bg-opacity-10 bg-white p-6 rounded-lg backdrop-blur-sm border border-gray-700 border-opacity-20 hover:border-primary-green transition-all duration-300">
            <h4 className="text-xl font-bold mb-2 text-primary-green">
              {isArabic ? "تمكين الإنسان بالتقنية" : "Empowering People through Tech"}
            </h4>
            <p className={`${darkMode ? "text-secondary-dark-gray" : "text-gray-300"}`}>
              {isArabic 
                ? "نؤمن بأن التكنولوجيا رافدٌ لتمكين الأفراد والمؤسسات نحو آفاق أوسع."
                : "We believe technology serves as a powerful enabler for individuals and organizations to reach broader horizons."
              }
            </p>
          </div>
          </div>
        </div>
        
      </div>
    </main>
  );
};

export default AboutUs;