// components/FAQ.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useDarkMode } from '../context/DarkModeContext';
import { useLanguage } from '../context/LanguageContext';
import client from '../sanityClient';
import { ChevronDown } from 'lucide-react'; // Using Lucide React for icons

const FAQ = () => {
  const { darkMode } = useDarkMode();
  const { isArabic } = useLanguage();
  const [faqData, setFaqData] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const accordionRefs = useRef({});

  useEffect(() => {
    // Fetch data from Sanity
    setIsLoading(true);
    client
      .fetch(
        `*[_type == "faq"][0]{
          title, subtitle, faqItems
        }`
      )
      .then((data) => {
        setFaqData(data);
        
        // Extract unique categories
        if (data && data.faqItems) {
          const uniqueCategories = ['all'];
          data.faqItems.forEach(item => {
            const category = isArabic ? item.category.ar : item.category.en;
            if (category && !uniqueCategories.includes(category)) {
              uniqueCategories.push(category);
            }
          });
          setCategories(uniqueCategories);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Sanity fetch error:", error);
        setIsLoading(false);
      });
  }, [isArabic]);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleAccordion(index);
    }
  };

  const filterByCategory = (category) => {
    setActiveCategory(category);
    setActiveIndex(null);
  };

  // Loading skeleton UI
  if (isLoading) {
    return (
      <div className="container min-h-screen mx-auto px-4 pt-24 pb-20 relative font-nizar mt-10">
        <div className="flex flex-col items-center space-y-8">
          <div className="w-3/4 h-8 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="w-1/2 h-6 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="w-full max-w-3xl space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-full h-16 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!faqData) {
    return (
      <div className="container min-h-screen mx-auto px-4 pt-24 pb-20 relative">
        <p className="text-center text-gray-400">No FAQ data available</p>
      </div>
    );
  }

  // Filter FAQ items by category if needed
  const filteredFaqItems = activeCategory === 'all' 
    ? faqData.faqItems 
    : faqData.faqItems.filter(item => {
        const itemCategory = isArabic ? item.category.ar : item.category.en;
        return itemCategory === activeCategory;
      });

  const directionClass = isArabic ? 'rtl' : 'ltr';
  const textAlignClass = isArabic ? 'text-right' : 'text-left';

  return (
    <main className={`container min-h-screen mx-auto px-4 md:px-6 pt-16 md:pt-24 pb-20 font-nizar ${directionClass}`}>
      {/* Title Section with gradual fade-in animation */}
      <div className="text-center mb-12 md:mb-16 animate-fade-in">
        <h1 className={`text-3xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-dark-gray' : 'text-white'} transition-colors duration-300`}>
          {isArabic ? faqData.title.ar : faqData.title.en}
        </h1>
        <h2 className="text-xl md:text-3xl text-secondary-blue font-semibold transition-colors duration-300">
          {isArabic ? faqData.subtitle.ar : faqData.subtitle.en}
        </h2>
      </div>
      
      {/* Category Filters with horizontal scroll on mobile */}
      <div className="mb-10 overflow-x-auto pb-2">
        <div className={`flex gap-3 justify-center ${isArabic ? 'rtl' : 'ltr'} min-w-max mx-auto`}>
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => filterByCategory(category)}
              className={`px-4 py-2 rounded-full text-sm md:text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-green/50 ${
                activeCategory === category
                  ? 'bg-primary-green text-white font-medium'
                  : darkMode
                  ? 'bg-secondary-dark-gray text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
              }`}
              aria-pressed={activeCategory === category}
              aria-label={`Filter by ${category} category`}
            >
              {category === 'all' ? (isArabic ? 'الكل' : 'All') : category}
            </button>
          ))}
        </div>
      </div>
      
      {/* FAQ Items with improved accessibility and animations */}
      <div className="space-y-6 max-w-3xl mx-auto" role="list" aria-label="Frequently Asked Questions">
        {filteredFaqItems.map((item, index) => {
          const isActive = activeIndex === index;
          
          return (
            <div 
              key={index} 
              className={`border rounded-lg overflow-hidden transition-all duration-300 ${
                isActive 
                  ? 'shadow-lg shadow-primary-green/20 border-primary-green' 
                  : darkMode
                  ? 'border-gray-700 hover:border-gray-500'
                  : 'border-gray-500 hover:border-gray-400'
              }`}
              role="listitem"
            >
              <button
                onClick={() => toggleAccordion(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                aria-expanded={isActive}
                aria-controls={`faq-content-${index}`}
                className={`w-full px-5 py-4 flex items-center justify-between text-left transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-green/60 ${
                  darkMode 
                    ? 'bg-white hover:bg-gray-750 text-dark-gray' 
                    : 'bg-gray-700 hover:bg-gray-650 text-white'
                } ${textAlignClass}`}
              >
                <h3 className="text-lg font-semibold flex-1 pr-4">
                  {isArabic ? item.question.ar : item.question.en}
                </h3>
                <ChevronDown 
                  className={`text-primary-green flex-shrink-0 transition-transform duration-300 ${
                    isActive ? 'transform rotate-180' : ''
                  }`}
                  size={20}
                  aria-hidden="true"
                />
              </button>
              <div 
                id={`faq-content-${index}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  darkMode ? 'bg-light-gray' : 'bg-gray-750'
                }`}
                style={{ 
                  maxHeight: isActive ? '1000px' : '0',
                  opacity: isActive ? 1 : 0
                }}
                role="region"
                aria-labelledby={`faq-question-${index}`}
              >
                <div 
                  className={`p-5 md:p-6 ${darkMode ? 'text-dark-gray' : 'text-gray-200'} ${textAlignClass} prose prose-sm md:prose max-w-none`}
                  dangerouslySetInnerHTML={{ 
                    __html: isArabic ? item.answer.ar : item.answer.en 
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      
      {/* No results message with animation */}
      {filteredFaqItems.length === 0 && (
        <div className={`text-center mt-10 py-12 border-2 border-dashed rounded-lg ${darkMode ? 'text-gray-400 border-gray-700' : 'text-gray-300 border-gray-600'}`}>
          <p className="text-xl animate-pulse">
            {isArabic 
              ? 'لا توجد أسئلة في هذه الفئة' 
              : 'No questions in this category'}
          </p>
          <button
            onClick={() => filterByCategory('all')}
            className="mt-4 text-primary-green hover:underline focus:outline-none focus:ring-2 focus:ring-primary-green/50 rounded px-2"
          >
            {isArabic ? 'العودة إلى الكل' : 'Return to all questions'}
          </button>
        </div>
      )}
    </main>
  );
};

// Add custom animation CSS
const AnimatedFAQ = () => {
  return (
    <>
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
      <FAQ />
    </>
  );
};

export default AnimatedFAQ;