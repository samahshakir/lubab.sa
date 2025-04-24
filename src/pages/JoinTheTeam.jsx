import { useLanguage } from "../context/LanguageContext";
import backgroundImage from '../assets/Assetbg1.webp';
import { motion } from 'framer-motion';
import { ChevronRight, Briefcase, Award, Users } from 'lucide-react';
import { DarkModeProvider, useDarkMode } from "../context/DarkModeContext";
import { useNavigate } from "react-router-dom";

export default function CareerSection() {
  const { isArabic } = useLanguage();
  const { darkMode } = useDarkMode();
  const navigate = useNavigate()
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className={`relative md:mt-10 min-h-screen pt-15 md:pt-25 pb-16 ${isArabic ? 'font-arabic text-right' : 'text-left'}`}>
      {/* Improved Background with Overlay */}
      <div 
        className="absolute inset-0 bg-cover opacity-5 bg-center z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary-green/30 to-secondary-blue/30 z-0 opacity-65 backdrop-blur-sm" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Container with Enhanced Shadow and Rounded Corners */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className=" rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header Section with Improved Gradient */}
          <div className={` py-5 px-8 relative overflow-hidden flex items-center justify-center text-center ${
                darkMode
                  ? "bg-gradient-to-r from-primary-green to-secondary-blue"
                  : "bg-white/10 backdrop-blur-md shadow xl"
              }`}>
 
          <div className="relative z-10">
            <h2 className={`text-lg md:text-4xl font-bold text-white ${isArabic ? 'text-right' : 'text-center'}`}>
              {isArabic ? "انضم إلى فريق لباب" : "Join the Lubab Team"}
            </h2>
            <p className={`text-white/80 text-sm mt-2 max-w-2xl mx-auto font-nizar-regular ${isArabic ? 'text-right' : 'text-center'}`}>
              {isArabic 
                ? "كن جزءًا من رحلتنا في تشكيل مستقبل التحول الرقمي"
                : "Be part of our journey in shaping the future of digital transformation"}
            </p>
          </div>
        </div>

          
          {/* Content Section with Enhanced Typography and Spacing */}
          <div className="py-5 md:py-10 px-10">
            {/* Title with Accent Border */}
            <div className={`border-l-4 border-primary-green pl-4 ${isArabic ? 'border-r-4 border-l-0 pr-4 pl-0' : ''}`}>
              <h3 className="text-sm md:text-2xl font-semibold text-gray-800">
                {isArabic 
                  ? "فرصة للابتكار والانضمام إلى رحلة التحول الرقمي" 
                  : "An opportunity for innovation and joining the digital transformation journey."}
              </h3>
            </div>
            
            {/* Description with Improved Typography */}
            <p className="text-gray-500 my-2 md:my-8 leading-relaxed text-xs md:text-lg max-w-full font-nizar-regular">
              {isArabic 
                ? "نقدّم بيئة عمل ديناميكية تدعم التطور المهني والإبداع. لدى فريقنا مساحة للنمو ومشاركة الأفكار وتطبيقها. نحن نبحث عن المواهب المتميزة التي تشاركنا شغفنا بالابتكار والتميز. يتم التقديم عبر نموذج بيانات بسيط دون الحاجة لتحميل ملفات." 
                : "We offer a dynamic work environment that fosters professional development and creativity. Our team has room to grow, share ideas, and bring them to life. We're looking for exceptional talent who share our passion for innovation and excellence. Applications are submitted through a simple form with no file uploads."}
            </p>
            
            {/* Apply Button with Animation and Icon */}
            <button // Pass slug or ID
            onClick={()=>navigate('/career')}
                            className={`px-2 md:px-5 py-1 md:py-2 rounded-lg font-medium transition-all duration-200 text-base font-nizar-regular ${
                              !darkMode
                              ? "bg-dark-mode shadow-[1px_1px_1px_#1a1a1a,_-1px_-1px_1px_#3a3a3a] hover:shadow-[inset_1px_1px_3px_#1a1a1a,_inset_-1px_-1px_3px_#3a3a3a]"
                              : "bg-gray-100 shadow-[3px_3px_6px_#d1d1d1,_-3px_-3px_6px_#ffffff] hover:shadow-[inset_3px_3px_6px_#d1d1d1,_inset_-3px_-3px_6px_#ffffff]"
                            } border-none relative overflow-hidden`}
                        >
                          <span className="bg-gradient-to-r from-primary-green to-secondary-blue bg-clip-text text-transparent font-semibold">
                            {isArabic ? 'قدم الآن' : 'Apply Now'}
                          </span>
                        </button>
          </div>
          
          {/* Features Grid with Enhanced Cards */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 py-5 md:py-10 px-10 ${
                darkMode
                  ? "bg-gray-50"
                  : "bg-white/10 backdrop-blur-md shadow xl"
              } `}>
            {/* Feature 1 - Enhanced Card */}
            <motion.div 
              whileHover={{ y: -8 }}
              className={`  ${
                darkMode
                  ? "bg-white"
                  : "bg-white/10 backdrop-blur-md shadow xl"
              } p-3 md:p-8 rounded-xl shadow-lg border-t-4 border-secondary-blue`}
            >
              <div className="flex items-center justify-center h-8 w-8 md:h-12 md:w-12 rounded-full bg-secondary-blue text-white mb-3 md:mb-6">
                <Briefcase className="h-4 w-4 md:h-8 md:w-8" />
              </div>
              <h4 className="text-sm md:text-xl font-semibold mb-1 md:mb-3 text-gray-800">
                {isArabic ? "بيئة عمل ديناميكية" : "Dynamic Work Environment"}
              </h4>
              <p className="text-gray-600 leading-relaxed text-xs md:text-sm font-nizar-regular">
                {isArabic 
                  ? "انضم إلى بيئة عمل تشجع على الابتكار والإبداع وتمكّن الموظفين من تحقيق إمكاناتهم الكاملة" 
                  : "Join a workspace that encourages innovation, creativity, and empowers employees to reach their full potential"}
              </p>
            </motion.div>
            
            {/* Feature 2 - Enhanced Card */}
            <motion.div 
              whileHover={{ y: -8 }}
              className={`  ${
                darkMode
                  ? "bg-white"
                  : "bg-white/10 backdrop-blur-md shadow xl"
              } p-3 md:p-8 rounded-xl shadow-lg border-t-4 border-primary-green`}
            >
              <div className="flex items-center justify-center h-8 w-8 md:h-12 md:w-12 rounded-full bg-primary-green text-white mb-3 md:mb-6">
                <Award className="h-4 w-4 md:h-8 md:w-8" />
              </div>
              <h4 className="text-sm md:text-xl font-semibold mb-1 md:mb-3 text-gray-800">
                {isArabic ? "فرص التطوير المهني" : "Professional Development"}
              </h4>
              <p className="text-gray-600 leading-relaxed text-xs md:text-sm font-nizar-regular">
                {isArabic 
                  ? "نوفر فرصًا متنوعة للتطوير والنمو المهني من خلال التدريب والتوجيه والتعلم المستمر" 
                  : "We provide diverse opportunities for growth and development through training, mentorship, and continuous learning"}
              </p>
            </motion.div>
            
            {/* Feature 3 - Enhanced Card */}
            <motion.div 
              whileHover={{ y: -8 }}
              className={`  ${
                darkMode
                  ? "bg-white"
                  : "bg-white/10 backdrop-blur-md shadow xl"
              } p-3 md:p-8 rounded-xl shadow-lg border-t-4 border-purple-500`}
            >
              <div className="flex items-center justify-center h-8 w-8 md:h-12 md:w-12 rounded-full bg-purple-500 text-white mb-3 md:mb-6">
                <Users className="h-4 w-4 md:h-8 md:w-8" />
              </div>
              <h4 className="text-sm md:text-xl font-semibold mb-3 text-gray-800">
                {isArabic ? "فريق متنوع ومبدع" : "Diverse & Creative Team"}
              </h4>
              <p className="text-gray-600 leading-relaxed text-xs md:text-sm font-nizar-regular">
                {isArabic 
                  ? "انضم إلى فريق من المواهب المتنوعة والمبدعة التي تعمل معًا لتحقيق رؤيتنا المشتركة" 
                  : "Join a team of diverse and creative talents working together to achieve our shared vision"}
              </p>
            </motion.div>
          </div>


        </motion.div>
      </div>
    </div>
  );
}