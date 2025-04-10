import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useDarkMode } from '../context/DarkModeContext';
import { scroller } from "react-scroll"

const ArticlePage = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const { isArabic } = useLanguage();
  const { darkMode } = useDarkMode();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const handleClick = () => {
    navigate("/");

    setTimeout(() => {
      scroller.scrollTo("blog", {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
      });
    }, 100); // Small delay to ensure navigation completes
  };
  
  // Define blog content similar to BlogNews component
  const blogContent = {
    en: {
      title: "Tech insights. Digital inspiration. Steps toward the future.",
      description: "We share analytical articles, professional insights, and inspiring content about the future of technology and digital transformation.",
      articles: [
        {
          id: "ai-revolution",
          title: "Innovation Journey: How Artificial Intelligence is Revolutionizing Business",
          excerpt: "In the digital transformation era, AI has become a crucial tool for business development, extending beyond automation to direct decision-making and creating personalized customer experiences.",
          readTime: "5 min read",
          author: "Tech Team",
          date: "April 2, 2025",
          tags: ["AI", "Innovation", "Business"],
          content: `
            The Innovation Journey: How AI Is Revolutionizing Business

            In the era of digital transformation, AI has become one of the most vital tools for business development. Its role is no longer limited to automation; it now directly contributes to decision-making, improving efficiency, and creating personalized customer experiences.

            At "Lubab," we see AI as an enabling factor, integrating it into digital solutions to provide real value reflected in operational and strategic performance. We focus on building intelligent systems that understand the work environment, integrate seamlessly with processes, and deliver measurable results.

            Investing in AI today means building a more flexible and proactive business infrastructure for the future.
          `
        },
        {
          id: "digital-transformation",
          title: "Digital Transformation in Companies: Challenges and Opportunities",
          excerpt: "Digital transformation is more than technology adoption—it's a radical change in work models and thinking. We help companies transform challenges into growth opportunities.",
          readTime: "7 min read",
          author: "Strategy Team",
          date: "March 28, 2025",
          tags: ["Digital Transformation", "Strategy", "Innovation"],
          content: `
            Digital Transformation in Companies: Challenges and Opportunities

            Digital transformation is more than just adopting new technologies—it represents a fundamental shift in how businesses operate and deliver value to customers. This journey involves reimagining business processes, organizational structures, and customer experiences through the strategic application of digital technologies.

            While many organizations recognize the importance of digital transformation, implementation often presents significant challenges. Legacy systems, resistance to change, skill gaps, and unclear digital strategies can hinder progress. However, these challenges also present opportunities for growth and innovation.

            At Lubab, we help organizations navigate their digital transformation journeys by focusing on strategic planning, organizational alignment, and iterative implementation. By addressing cultural and technical aspects simultaneously, companies can achieve sustainable digital transformation that yields tangible business results.
          `
        },
        {
          id: "digital-twin",
          title: "Digital Twin: When Companies Possess a Complete Digital Replica of Their Operations",
          excerpt: "Digital Twin is no longer a future concept but a strategic tool for real-time organizational performance tracking, enabling predictive risk management and operational efficiency.",
          readTime: "6 min read",
          author: "Innovation Team",
          date: "March 15, 2025",
          tags: ["Digital Twin", "Operations", "Technology"],
          content: `
            Digital Twin: When Companies Possess a Complete Digital Replica of Their Operations

            The concept of Digital Twin has evolved from a futuristic idea to a practical strategic tool for modern organizations. A Digital Twin creates a comprehensive virtual representation of physical operations, enabling real-time monitoring, analysis, and optimization of business processes.

            By implementing Digital Twin technology, companies gain unprecedented visibility into their operations, allowing them to identify inefficiencies, predict potential issues before they occur, and test process improvements in a risk-free virtual environment.

            The real power of Digital Twin technology lies in its ability to integrate data from various sources—IoT devices, enterprise systems, and external data—to create a holistic view of operations. This integrated approach enables more informed decision-making and agile responses to changing business conditions.

            As Digital Twin technology continues to mature, organizations that adopt this approach gain a significant competitive advantage through enhanced operational efficiency, reduced risks, and accelerated innovation.
          `
        }
      ]
    },
    ar: {
      title: "رؤى تقنية. إلهام رقمي. خطوات نحو المستقبل.",
      description: "نشارك مقالات تحليلية، رؤى مهنية، ومحتوى ملهم عن مستقبل التقنية والتحول الرقمي.",
      articles: [
        {
          id: "ai-revolution",
          title: "رحلة الابتكار: كيف يُحدث الذكاء الاصطناعي ثورة في الأعمال",
          excerpt: "في عصر التحوّل الرقمي، أصبح الذكاء الاصطناعي من أهم أدوات تطوير الأعمال، متجاوزاً الأتمتة إلى المساهمة المباشرة في اتخاذ القرار وخلق تجارب مخصصة.",
          readTime: "٥ دقائق للقراءة",
          author: "فريق التقنية",
          date: "٢ أبريل ٢٠٢٥",
          tags: ["الذكاء الاصطناعي", "الابتكار", "الأعمال"],
          content: `
            رحلة الابتكار: كيف يُحدث الذكاء الاصطناعي ثورة في الأعمال

            في عصر التحوّل الرقمي، أصبح الذكاء الاصطناعي من أهم أدوات تطوير الأعمال. لم يعد دوره مقتصراً على الأتمتة، بل امتد ليكون مساهماً مباشراً في اتخاذ القرار، وتحسين الكفاءة، وخلق تجارب مخصصة للعملاء.

            في "لُباب"، نرى الذكاء الاصطناعي كعنصر تمكيني، نُدمجه في تصميم الحلول الرقمية لتقديم قيمة فعلية تنعكس على الأداء التشغيلي والاستراتيجي. نُركز على بناء أنظمة ذكية تفهم بيئة العمل، وتتكامل مع العمليات بسلاسة، وتُقدم نتائج قابلة للقياس.

            الاستثمار في الذكاء الاصطناعي اليوم، هو بناء لبنية أعمال أكثر مرونة واستباقية للمستقبل.
          `
        },
        {
          id: "digital-transformation",
          title: "التحول الرقمي في الشركات: التحديات والفرص",
          excerpt: "التحول الرقمي ليس مجرد تبني للتقنية، بل هو تغيير جذري في نماذج العمل وطرق التفكير. نساعد الشركات على تحويل التحديات إلى فرص للنمو.",
          readTime: "٧ دقائق للقراءة",
          author: "فريق الاستراتيجية",
          date: "٢٨ مارس ٢٠٢٥",
          tags: ["التحول الرقمي", "الاستراتيجية", "الابتكار"],
          content: `
            التحول الرقمي في الشركات: التحديات والفرص

            التحول الرقمي هو أكثر من مجرد اعتماد تقنيات جديدة - إنه يمثل تحولًا أساسيًا في كيفية عمل الشركات وتقديم القيمة للعملاء. تتضمن هذه الرحلة إعادة تصور العمليات التجارية، والهياكل التنظيمية، وتجارب العملاء من خلال التطبيق الاستراتيجي للتقنيات الرقمية.

            في حين تدرك العديد من المؤسسات أهمية التحول الرقمي، غالبًا ما يمثل التنفيذ تحديات كبيرة. يمكن للأنظمة القديمة، ومقاومة التغيير، وفجوات المهارات، والاستراتيجيات الرقمية غير الواضحة أن تعيق التقدم. ومع ذلك، تقدم هذه التحديات أيضًا فرصًا للنمو والابتكار.

            في لُباب، نساعد المؤسسات على التنقل في رحلات التحول الرقمي من خلال التركيز على التخطيط الاستراتيجي، والمواءمة التنظيمية، والتنفيذ التكراري. من خلال معالجة الجوانب الثقافية والتقنية في وقت واحد، يمكن للشركات تحقيق تحول رقمي مستدام يؤدي إلى نتائج تجارية ملموسة.
          `
        },
        {
          id: "digital-twin",
          title: "التوأم الرقمي: حين تمتلك الشركات نسخة رقمية كاملة من عملياتها",
          excerpt: "التوأم الرقمي لم يعد مفهوماً مستقبلياً، بل أصبح أداة استراتيجية لمتابعة أداء المؤسسات في الزمن الحقيقي، مما يمكّن من إدارة المخاطر والكفاءة التشغيلية.",
          readTime: "٦ دقائق للقراءة",
          author: "فريق الابتكار",
          date: "١٥ مارس ٢٠٢٥",
          tags: ["التوأم الرقمي", "العمليات", "التكنولوجيا"],
          content: `
            التوأم الرقمي: حين تمتلك الشركات نسخة رقمية كاملة من عملياتها

            تطور مفهوم التوأم الرقمي من فكرة مستقبلية إلى أداة استراتيجية عملية للمؤسسات الحديثة. يقوم التوأم الرقمي بإنشاء تمثيل افتراضي شامل للعمليات المادية، مما يتيح المراقبة والتحليل والتحسين في الوقت الفعلي للعمليات التجارية.

            من خلال تنفيذ تقنية التوأم الرقمي، تكتسب الشركات رؤية غير مسبوقة في عملياتها، مما يتيح لها تحديد أوجه القصور، والتنبؤ بالمشكلات المحتملة قبل حدوثها، واختبار تحسينات العملية في بيئة افتراضية خالية من المخاطر.

            تكمن القوة الحقيقية لتقنية التوأم الرقمي في قدرتها على دمج البيانات من مصادر مختلفة - أجهزة إنترنت الأشياء، وأنظمة المؤسسات، والبيانات الخارجية - لإنشاء رؤية شاملة للعمليات. يتيح هذا النهج المتكامل اتخاذ قرارات أكثر استنارة واستجابات رشيقة لظروف العمل المتغيرة.

            مع استمرار تطور تقنية التوأم الرقمي، تكتسب المؤسسات التي تتبنى هذا النهج ميزة تنافسية كبيرة من خلال تعزيز الكفاءة التشغيلية، وتقليل المخاطر، وتسريع الابتكار.
          `
        }
      ]
    }
  };

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Get current language content
    const currentLanguage = isArabic ? 'ar' : 'en';
    const languageContent = blogContent[currentLanguage];
    
    // Find the selected article based on the URL parameter
    const foundArticle = languageContent.articles.find(art => art.id === articleId);
    
    if (foundArticle) {
      setArticle(foundArticle);
      
      // Set related articles (all articles except the current one)
      const related = languageContent.articles
        .filter(art => art.id !== articleId);
      
      setRelatedArticles(related);
    } else {
      // If article not found, redirect to blog page
      navigate('/blog');
    }
  }, [articleId, isArabic, navigate]);
  
  if (!article) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen ${darkMode ? 'bg-light-gray' : 'bg-dark-mode'} transition-colors duration-300 ${isArabic ? 'rtl' : 'ltr'}`}
    >
      <div className="container mx-auto px-6 py-16 max-w-4xl">
      <button
      onClick={handleClick}
      className={`mb-8 flex items-center gap-2 ${
        darkMode ? "text-dark-gray" : "text-white"
      } hover:opacity-80 transition-opacity`}
    >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          {isArabic ? 'العودة إلى المدونة' : 'Back to Blog'}
        </button>
        
        <div className={`p-8 rounded-2xl shadow-xl ${darkMode ? 'bg-white' : 'bg-dark-gray'}`}>
          <div className="flex justify-between items-center mb-6">
            <span className={`text-sm font-medium ${darkMode ? 'text-primary-green' : 'text-secondary-blue'}`}>
              {article.date} • {article.readTime}
            </span>
            <span className={`text-sm font-medium ${darkMode ? 'text-primary-green' : 'text-secondary-blue'}`}>
              {article.author}
            </span>
          </div>
          
          <h1 className={`text-3xl md:text-4xl font-bold mb-6 ${darkMode ? 'text-dark-gray' : 'text-white'}`}>
            {article.title}
          </h1>
          
          {article.coverImage && (
            <div className="mb-8 rounded-xl overflow-hidden">
              <img 
                src={article.coverImage} 
                alt={article.title} 
                className="w-full h-auto object-cover"
              />
            </div>
          )}
          
          <div className={`article-content ${darkMode ? 'text-dark-gray' : 'text-gray-200'} space-y-6`}>
            {/* Render article content - could be HTML or markdown */}
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-lg leading-relaxed">
                {paragraph.trim()}
              </p>
            ))}
          </div>
          
          {article.tags && (
            <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm ${
                      darkMode 
                        ? 'bg-gray-100 text-gray-700' 
                        : 'bg-gray-700 text-gray-200'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-12">
          <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-dark-gray' : 'text-white'}`}>
            {isArabic ? 'مقالات ذات صلة' : 'Related Articles'}
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedArticles.slice(0, 3).map((relatedArticle, index) => (
              <div 
                key={index}
                className={`p-4 rounded-xl cursor-pointer ${
                  darkMode 
                    ? 'bg-white hover:bg-gray-100 text-dark-gray' 
                    : 'bg-dark-gray hover:bg-gray-800 text-white'
                } transition-colors duration-200`}
                onClick={() => navigate(`/blog/article/${relatedArticle.id}`)}
              >
                <h4 className="font-bold mb-2">{relatedArticle.title}</h4>
                <p className={`text-sm ${darkMode ? 'text-gray-600' : 'text-gray-300'} line-clamp-2`}>
                  {relatedArticle.excerpt}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArticlePage;