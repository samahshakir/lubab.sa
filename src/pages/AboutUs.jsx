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
    <main className="container min-h-screen mx-auto px-4 pt-24 pb-20 relative font-nizar">
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
          className={`mb-8 text-lg ${darkMode ? "text-secondary-dark-gray" : "text-gray-200"} ${isArabic ? "rtl text-right" : "ltr text-left"}`}
        >
          <p className="mb-6 leading-relaxed">
            {isArabic 
              ? "انطلقت لُباب عام 2024 من مدينة خميس مشيط، على يد الشريكين المؤسسين خالد سفر آل شلوان وعبدالوهاب رفدان الشهراني، برؤية ريادية لصياغة مستقبل التقنية عبر حلول مبتكرة تُحدث فرقًا حقيقيًا. تمثل لُباب اليوم كيانًا سعوديًا احترافيًا يدمج بين الإبداع والخبرة، ويُسهم في معالجة التحديات التجارية والشخصية من خلال أدوات تقنية عالية الكفاءة، واضعًا التحول الرقمي الذكي في متناول كل منشأة طموحة وكل فرد يسعى للتطور."
              : "Lubab was launched in 2024 in Khamis Mushait by co-founders Khalid Safar Al-Shalwan and Abdulwahab Rafdan Al-Shahrani, with a pioneering vision to shape the future of technology. Lubab represents a professional Saudi entity dedicated to addressing both business and personal challenges through high-efficiency digital tools. We specialize in developing innovative solutions that empower organizations to adapt to the ever-evolving digital landscape."
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
                  ? "نبحث باستمرار عن حلول جديدة وطرق غير تقليدية لمواجهة التحديات وتحقيق التميز."
                  : "We continuously seek new and unconventional solutions to overcome challenges and achieve excellence."
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
                  ? "نلتزم بأعلى معايير الجودة والدقة في تنفيذ كل مشروع وخدمة باحتراف تقني وسلوكي."
                  : "We adhere to the highest standards of quality and precision in every project, both technically and behaviorally."
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
                  ? "نبني علاقات استراتيجية طويلة الأمد تقوم على الثقة المتبادلة والعمل المشترك لتحقيق الأهداف."
                  : "We build long-term strategic relationships based on mutual trust and collaborative effort to reach common goals."
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
                  ? "نؤمن بأن الوضوح والصدق في التعامل أساس نجاح كل علاقة مهنية."
                  : "We value clear and honest communication in all our interactions with clients and partners."
                }
              </p>
            </div>
            
            {/* Value 5 */}
            <div className="bg-opacity-10 bg-white p-6 rounded-lg backdrop-blur-sm border border-gray-700 border-opacity-20 hover:border-primary-green transition-all duration-300">
              <h4 className="text-xl font-bold mb-2 text-primary-green">
                {isArabic ? "التركيز على الحلول" : "Solution Focus"}
              </h4>
              <p className={`${darkMode ? "text-secondary-dark-gray" : "text-gray-300"}`}>
                {isArabic 
                  ? "نقدم حلولاً واقعية وفعالة، ونقيس نجاحنا بمدى تأثيرها على تحديات العميل."
                  : "We deliver realistic, effective solutions and measure our success by their impact on our clients' challenges."
                }
              </p>
            </div>
            
            {/* Value 6 */}
            <div className="bg-opacity-10 bg-white p-6 rounded-lg backdrop-blur-sm border border-gray-700 border-opacity-20 hover:border-primary-green transition-all duration-300">
              <h4 className="text-xl font-bold mb-2 text-primary-green">
                {isArabic ? "تمكين الإنسان بالتقنية" : "Empowering Through Technology"}
              </h4>
              <p className={`${darkMode ? "text-secondary-dark-gray" : "text-gray-300"}`}>
                {isArabic 
                  ? "نستخدم التكنولوجيا كأداة لتمكين الأفراد والمؤسسات نحو أداء أفضل وحياة أسهل."
                  : "We use technology as a means to empower individuals and organizations, driving better performance and an improved quality of life."
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