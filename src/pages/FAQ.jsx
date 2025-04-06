// components/FAQ.jsx
import React, { useEffect, useState } from 'react';
import { useDarkMode } from '../context/DarkModeContext';
import { useLanguage } from '../context/LanguageContext';
import client from '../sanityClient';

const FAQ = () => {
  const { darkMode } = useDarkMode();
  const { isArabic } = useLanguage();
  const [faqData, setFaqData] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    // Fetch data from Sanity
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
      })
      .catch((error) => console.error("Sanity fetch error:", error));
  }, [isArabic]);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const filterByCategory = (category) => {
    setActiveCategory(category);
    setActiveIndex(null);
  };

  if (!faqData) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  // Filter FAQ items by category if needed
  const filteredFaqItems = activeCategory === 'all' 
    ? faqData.faqItems 
    : faqData.faqItems.filter(item => {
        const itemCategory = isArabic ? item.category.ar : item.category.en;
        return itemCategory === activeCategory;
      });

  return (
    <main className="container min-h-screen mx-auto px-4 pt-24 pb-20 relative font-nizar mt-10">
      {/* Title Section */}
      <div className={`text-center mb-16 ${isArabic ? 'rtl' : 'ltr'}`}>
        <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-dark-gray' : 'text-white'}`}>
          {isArabic ? faqData.title.ar : faqData.title.en}
        </h1>
        <h2 className="text-2xl md:text-3xl text-secondary-blue font-semibold">
          {isArabic ? faqData.subtitle.ar : faqData.subtitle.en}
        </h2>
      </div>
      
      {/* Category Filters */}
      <div className={`flex flex-wrap gap-4 mb-10 justify-center ${isArabic ? 'rtl' : 'ltr'}`}>
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => filterByCategory(category)}
            className={`px-4 py-1 rounded-full transition-all duration-300 ${
              activeCategory === category
                ? 'bg-primary-green text-white'
                : darkMode
                ? 'bg-secondary-dark-gray text-gray-300 hover:bg-gray-600'
                : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
            }`}
          >
            {category === 'all' ? (isArabic ? 'الكل' : 'All') : category}
          </button>
        ))}
      </div>
      
      {/* FAQ Items */}
      <div className="space-y-6 max-w-3xl mx-auto">
        {filteredFaqItems.map((item, index) => (
          <div 
            key={index} 
            className={`border rounded-lg overflow-hidden transition-all duration-300 ${
              activeIndex === index 
                ? 'shadow-lg shadow-primary-green/20 border-primary-green' 
                : darkMode
                ? 'border-gray-700 hover:border-gray-500'
                : 'border-gray-500 hover:border-gray-400'
            }`}
          >
            <button
              onClick={() => toggleAccordion(index)}
              className={`w-full px-3 py-2 flex items-center justify-between text-left transition-colors duration-300 ${
                darkMode 
                  ? 'bg-dark-gray hover:bg-gray-750 text-gray-200' 
                  : 'bg-gray-700 hover:bg-gray-650 text-white'
              } ${isArabic ? 'rtl' : 'ltr'}`}
            >
              <h3 className="text-md font-semibold">
                {isArabic ? item.question.ar : item.question.en}
              </h3>
              <span className={`text-primary-green text-2xl transform transition-transform duration-300 ${
                activeIndex === index ? 'rotate-180' : ''
              }`}>
                {isArabic ? '▲' : '▼'}
              </span>
            </button>
            <div 
              className={`overflow-hidden transition-all duration-300 ${
                darkMode ? 'bg-light-gray' : 'bg-gray-750'
              } ${isArabic ? 'rtl text-right' : 'ltr text-left'}`}
              style={{ 
                maxHeight: activeIndex === index ? '500px' : '0',
                opacity: activeIndex === index ? 1 : 0
              }}
            >
              <div className={`p-5 ${darkMode ? 'text-dark-gray' : 'text-gray-200'}`}>
                {isArabic ? item.answer.ar : item.answer.en}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* No results message */}
      {filteredFaqItems.length === 0 && (
        <div className={`text-center mt-10 ${darkMode ? 'text-gray-400' : 'text-gray-300'}`}>
          <p className="text-xl">
            {isArabic 
              ? 'لا توجد أسئلة في هذه الفئة' 
              : 'No questions in this category'}
          </p>
        </div>
      )}
    </main>
  );
};

export default FAQ;