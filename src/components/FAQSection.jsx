import { useState, useContext } from 'react';
import { useDarkMode } from '../context/DarkModeContext';
import { useLanguage } from '../context/LanguageContext';
const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const { darkMode } = useDarkMode();
  const { language } = useLanguage();
  
  const isArabic = language === 'ar';

  const faqItems = [
    {
      id: 1,
      questionAr: "ما الذي يميز حلولكم؟",
      answerAr: "نُقّدم حلوًال ذكية مصممة بدقة حول احتياجاتك الفعلية، مع التركيز على سهولة الاستخدام وقابلية التطوير.",
      questionEn: "What makes your solutions unique?",
      answerEn: "We provide intelligent solutions precisely tailored to your actual needs, with a focus on user-friendliness and scalability."
    },
    {
      id: 2,
      questionAr: "كيف تضمنون حماية البيانات؟",
      answerAr: "نتبع أعلى معايير الأمن السيبراني بالتوافق مع أفضل الممارسات المحلية والعالمية، مع تقنيات التشفير والمراقبة الدائمة.",
      questionEn: "How do you ensure data protection?",
      answerEn: "We follow top-tier cybersecurity standards, aligned with local and global best practices, employing encryption and continuous monitoring."
    },
    {
      id: 3,
      questionAr: "هل توفرون نماذج أولية (Prototypes)؟",
      answerAr: "نعم، نرى في النماذج الأولية وسيلة فعالة لتوضيح الرؤية وتجنب أي تعقيدات قبل إطلاق المشروع.",
      questionEn: "Do you provide prototypes?",
      answerEn: "Yes, we view prototypes as an effective means to clarify the vision and avoid complications prior to a project's launch."
    },
    {
      id: 4,
      questionAr: "كيف يتم التعامل مع الشراكات؟",
      answerAr: "الشراكة ليست مجرد عقد؛ بل علاقة تكاملية طويلة الأمد، نحدد فيها الأهداف ونضع خارطة طريق مشتركة.",
      questionEn: "How do you handle partnerships?",
      answerEn: "A partnership isn't just a contract; it's a long-term collaborative relationship where we define objectives and map out a shared roadmap."
    },
    {
      id: 5,
      questionAr: "كيف يمكنني أن أكون مستثمرًا معكم؟",
      answerAr: "نرحب بالاستثمارات التي تدعم نمونا المستقبلي. تواصل معنا عبر البريد أو قسم \"تواصل معنا\" لتحديد لقاء يناقش فرص الاستثمار.",
      questionEn: "How can I invest with you?",
      answerEn: "We welcome investments that support our future growth. Contact us via email or the \"Contact Us\" section to set up a meeting to discuss investment opportunities."
    },
    {
      id: 6,
      questionAr: "كيف يمكنني أن أكون شريك إبداع؟",
      answerAr: "إن كانت لديك فكرة تقنية أو حل مبتكر، شاركنا به لتطويره وتنفيذه ضمن منظومة لُباب.",
      questionEn: "How can I be a creative partner?",
      answerEn: "If you have a tech idea or innovative solution, share it with us to develop and implement within Lubab's ecosystem."
    }
  ];

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={`font-sans py-12 px-4 md:px-8 ${!darkMode ? 'bg-[#322E38]' : 'bg-[#F2FCF6]'}`}>
      <div className="max-w-4xl mx-auto">
        <div className={`flex flex-col ${isArabic ? 'md:flex-row-reverse' : 'md:flex-row'} justify-between items-center mb-10`}>
          {isArabic ? (
            <h2 className="text-[#00BC78] text-3xl font-bold text-right mb-2 md:mb-0">
              أسئلتك، إجاباتنا. ببساطة ووضوح
            </h2>
          ) : (
            <h2 className="text-[#3F73B7] text-3xl font-bold text-left mb-2 md:mb-0">
              Your questions, our answers. Simply and clearly.
            </h2>
          )}
          
          {isArabic ? (
            <h2 className="text-[#3F73B7] text-2xl font-semibold">
              Your questions, our answers. Simply and clearly.
            </h2>
          ) : (
            <h2 className="text-[#00BC78] text-2xl font-semibold text-right">
              أسئلتك، إجاباتنا. ببساطة ووضوح
            </h2>
          )}
        </div>
        
        <div className="space-y-4" dir={isArabic ? 'rtl' : 'ltr'}>
          {faqItems.map((item, index) => (
            <div 
              key={item.id} 
              className={`border ${!darkMode ? 'border-[#2C4B8B]' : 'border-[#EBF8EE]'} rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md`}
            >
              <button
                className={`w-full flex justify-between items-center p-5 ${!darkMode ? 'bg-[#2D3F3B]' : 'bg-white'} focus:outline-none`}
                onClick={() => toggleFaq(index)}
              >
                <div className={`flex flex-col ${isArabic ? 'items-end' : 'items-start'} w-full`}>
                  <span className={`${!darkMode ? 'text-[#F2FCF6]' : 'text-[#2D3F3B]'} font-medium mb-2`}>
                    {isArabic ? item.questionAr : item.questionEn}
                  </span>
                </div>
                <span className={`text-[#00BC78] transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className={`p-5 ${!darkMode ? 'bg-[#2C4B8B] border-t border-[#3F73B7]' : 'bg-[#EBF8EE] border-t border-[#66E0A3]'}`}>
                  <div className="flex flex-col space-y-4">
                    <p className={`${!darkMode ? 'text-[#F2FCF6]' : 'text-[#2D3F3B]'} ${isArabic ? 'text-right' : 'text-left'}`}>
                      {isArabic ? item.answerAr : item.answerEn}
                    </p>
                    {isArabic ? (
                      <p className={`${!darkMode ? 'text-[#8AAEDC]' : 'text-[#444444]'} text-left`}>
                        {item.answerEn}
                      </p>
                    ) : (
                      <p className={`${!darkMode ? 'text-[#8AAEDC]' : 'text-[#444444]'} text-right`}>
                        {item.answerAr}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;