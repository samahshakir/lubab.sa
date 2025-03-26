import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';
import { useDarkMode } from '../context/DarkModeContext';

gsap.registerPlugin(ScrollTrigger);

function BlogNews() {
  const { isArabic } = useLanguage();
  const { darkMode } = useDarkMode();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  // Add this to force re-render when language changes
  const [currentLanguage, setCurrentLanguage] = useState(isArabic ? 'ar' : 'en');

  // Update current language when isArabic changes
  useEffect(() => {
    setCurrentLanguage(isArabic ? 'ar' : 'en');
  }, [isArabic]);

  const blogContent = {
    en: {
      title: "Digital Insights. Innovative Visions. Steps Toward the Future.",
      description: "Our blog offers analytical articles, professional insights, and inspiring content on the future of technology and digital transformation.",
      articles: [
        {
          title: "Innovation Journey: How Artificial Intelligence is Revolutionizing Business",
          excerpt: "In the digital transformation era, AI has become a crucial tool for business development, extending beyond automation to direct decision-making and creating personalized customer experiences.",
          readTime: "5 min read"
        },
        {
          title: "Digital Transformation in Companies: Challenges and Opportunities",
          excerpt: "Digital transformation is more than technology adoption—it's a radical change in work models and thinking. We help companies transform challenges into growth opportunities.",
          readTime: "7 min read"
        },
        {
          title: "Digital Twin: When Companies Possess a Complete Digital Replica of Their Operations",
          excerpt: "Digital Twin is no longer a future concept but a strategic tool for real-time organizational performance tracking, enabling predictive risk management and operational efficiency.",
          readTime: "6 min read"
        }
      ]
    },
    ar: {
      title: "رؤى تقنية. إلهام رقمي. خطوات نحو المستقبل.",
      description: "نشارك مقالات تحليلية، رؤى مهنية، ومحتوى ملهم عن مستقبل التقنية والتحول الرقمي.",
      articles: [
        {
          title: "رحلة الابتكار: كيف يُحدث الذكاء الاصطناعي ثورة في الأعمال",
          excerpt: "في عصر التحوّل الرقمي، أصبح الذكاء الاصطناعي من أهم أدوات تطوير الأعمال، متجاوزاً الأتمتة إلى المساهمة المباشرة في اتخاذ القرار وخلق تجارب مخصصة.",
          readTime: "٥ دقائق للقراءة"
        },
        {
          title: "التحول الرقمي في الشركات: التحديات والفرص",
          excerpt: "التحول الرقمي ليس مجرد تبني للتقنية، بل هو تغيير جذري في نماذج العمل وطرق التفكير. نساعد الشركات على تحويل التحديات إلى فرص للنمو.",
          readTime: "٧ دقائق للقراءة"
        },
        {
          title: "التوأم الرقمي: حين تمتلك الشركات نسخة رقمية كاملة من عملياتها",
          excerpt: "التوأم الرقمي لم يعد مفهوماً مستقبلياً، بل أصبح أداة استراتيجية لمتابعة أداء المؤسسات في الزمن الحقيقي، مما يمكّن من إدارة المخاطر والكفاءة التشغيلية.",
          readTime: "٦ دقائق للقراءة"
        }
      ]
    }
  };

  useEffect(() => {
    // Reset and reinitialize animations when language changes
    let ctx;
    
    // Small delay to ensure DOM is updated after language change
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        // Title animation
        gsap.fromTo(titleRef.current, 
          { 
            autoAlpha: 0, 
            y: 50,
            scale: 0.9 
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1
            }
          }
        );

        // Card animations
        const cards = gsap.utils.toArray('.blog-card');
        cards.forEach((card, index) => {
          gsap.fromTo(card, 
            { 
              autoAlpha: 0, 
              y: 50,
              scale: 0.9 
            },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.4,
              delay: index * 0.1,
              ease: "back.out(1)",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
              }
            }
          );
        });
      }, sectionRef);
    }, 100);

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
    };
  }, [currentLanguage]); 

  const content = blogContent[currentLanguage];

  // Instead of conditional rendering, render the full component with the current language content
  return (
    <section 
      ref={sectionRef}
      className={`container min-h-screen mx-auto px-6 pt-36 pb-20 relative ${darkMode ? 'bg-light-gray' : 'bg-gray-900'} transition-colors duration-300 ${isArabic ? 'rtl' : 'ltr'}`}
      key={`blog-section-${currentLanguage}`} // Force re-render when language changes
    >
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
        style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="white" fill-opacity="1" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="1"/%3E%3Ccircle cx="13" cy="13" r="1"/%3E%3C/g%3E%3C/svg%3E")',
               backgroundSize: '20px 20px'}}></div>
      
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 
          ref={titleRef}
          className={`text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight ${darkMode ? 'text-dark-gray' : 'text-white'}`}
        >
          {content.title.split('.').map((part, index) => (
            <React.Fragment key={index}>
              {part}
              {index < content.title.split('.').length - 1 && <span className="text-secondary-blue">.</span>}
            </React.Fragment>
          ))}
        </h2>
        <p 
          className={`text-xl ${darkMode ? 'text-secondary-dark-gray' : 'text-gray-200'} mb-12`}
        >
          {content.description}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {content.articles.map((article, index) => (
          <div 
            key={`${currentLanguage}-article-${index}`}
            className={`blog-card p-6 rounded-xl shadow-lg transition-all duration-300 
              ${darkMode 
                ? 'bg-white hover:bg-gray-100 text-dark-gray' 
                : 'bg-gray-800 hover:bg-gray-700 text-white'}
            `}
          >
            <div className="mb-4 flex items-center justify-between">
              <span 
                className={`text-sm font-medium ${darkMode ? 'text-primary-green' : 'text-secondary-blue'}`}
              >
                {article.readTime}
              </span>
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center 
                  ${darkMode 
                    ? 'bg-primary-green/10 text-primary-green' 
                    : 'bg-secondary-blue/10 text-secondary-blue'
                  }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
                  <polyline points="13 2 13 9 20 9"/>
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3">{article.title}</h3>
            <p className={`text-sm ${darkMode ? 'text-secondary-dark-gray' : 'text-gray-300'}`}>
              {article.excerpt}
            </p>
            <button 
              className={`mt-4 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 
                ${darkMode 
                  ? 'bg-primary-green text-white hover:bg-blue-700' 
                  : 'bg-secondary-blue text-white hover:bg-blue-600'
                }`}
            >
              {isArabic ? 'اقرأ المزيد' : 'Read More'}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BlogNews;