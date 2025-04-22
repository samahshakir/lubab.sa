
import { useLanguage } from "../context/LanguageContext";


export default function CareerSection() {
  const {isArabic} = useLanguage()
  // Toggle language function for demo purposes
  
  return (
    <div className={`min-h-screen bg-gray-100 py-12 ${isArabic ? 'font-arabic text-right' : 'text-left'}`}>
      <div className="max-w-6xl mx-auto">
    
        {/* Career Section Container */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mx-4">
          {/* Header Section with Gradient Background */}
          <div className="bg-gradient-to-r bg-primary-green p-8">
            <h2 className={`text-3xl font-bold text-white ${isArabic ? 'text-right' : 'text-left'}`}>
              {isArabic ? "انضم إلى فريق لباب" : "Join the Lubab Team"}
            </h2>
          </div>
          
          {/* Content Section */}
          <div className="p-8">
            {/* Title */}
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {isArabic 
                ? "فرصة للابتكار والانضمام إلى رحلة التحول الرقمي" 
                : "An opportunity for innovation and joining the digital transformation journey."}
            </h3>
            
            {/* Description */}
            <p className="text-gray-600 mb-8 leading-relaxed">
              {isArabic 
                ? "نقدّم بيئة عمل ديناميكية تدعم التطور المهني والإبداع. لدى فريقنا مساحة للنمو ومشاركة الأفكار وتطبيقها. يتم التقديم عبر نموذج بيانات بسيط دون الحاجة لتحميل ملفات." 
                : "We offer a dynamic work environment that fosters professional development and creativity. Our team has room to grow, share ideas, and bring them to life. Applications are submitted through a simple form with no file uploads."}
            </p>
            
            {/* Apply Button */}
            <div className={`flex ${isArabic ? 'justify-end' : 'justify-start'}`}>
              <button className="bg-secondary-blue hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                {isArabic ? "قدّم الآن" : "Apply Now"}
              </button>
            </div>
          </div>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 bg-gray-50">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-secondary-blue text-white mb-4">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2">
                {isArabic ? "بيئة عمل ديناميكية" : "Dynamic Work Environment"}
              </h4>
              <p className="text-gray-600">
                {isArabic 
                  ? "انضم إلى بيئة عمل تشجع على الابتكار والإبداع" 
                  : "Join a workspace that encourages innovation and creativity"}
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-secondary-blue text-white mb-4">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2">
                {isArabic ? "فرص التطوير المهني" : "Professional Development"}
              </h4>
              <p className="text-gray-600">
                {isArabic 
                  ? "نوفر فرصًا متنوعة للتطوير والنمو المهني" 
                  : "We provide diverse opportunities for growth and development"}
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-secondary-blue text-white mb-4">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2">
                {isArabic ? "فريق متنوع ومبدع" : "Diverse & Creative Team"}
              </h4>
              <p className="text-gray-600">
                {isArabic 
                  ? "انضم إلى فريق من المواهب المتنوعة والمبدعة" 
                  : "Join a team of diverse and creative talents"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}