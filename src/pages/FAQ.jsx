import React, { useEffect, useState } from 'react';
import { useDarkMode } from '../context/DarkModeContext';
import { useLanguage } from '../context/LanguageContext';
import client from '../sanityClient';
import { Plus } from 'lucide-react';
import ThemeLangToggle from '../components/ThemLangToggle';
import GoBackButton from '../components/GoBackButton';
import { motion, AnimatePresence } from 'framer-motion';


const FAQ = () => {
  const { darkMode } = useDarkMode();
  const { isArabic } = useLanguage();
  const [data, setData] = useState(null);
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    client.fetch(`*[_type == "faq"][0]{ title, subtitle, faqItems }`)
      .then(res => setData(res))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [isArabic]);

  const toggle = idx => setOpenIndex(openIndex === idx ? null : idx);
  if (loading) {
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



  if (!data) return null;

  return (
    <section className={`min-h-screen w-full ${!darkMode ? 'bg-dark-mode text-gray-100' : 'bg-white text-gray-900'} py-3 px-3 font-nizar `} dir={isArabic ? 'rtl' : 'ltr'}>
<header className="relative w-full">
  <div className="flex justify-between items-center w-full">
    <GoBackButton />
    <ThemeLangToggle />
  </div>
</header>
      <div className="max-w-3xl mx-auto my-12">
        <h2 className="text-4xl font-bold mb-2 text-center transition-colors duration-300">
          {isArabic ? data.title.ar : data.title.en}
        </h2>
        <p className="text-center text-lg mb-8 opacity-75 font-nizar-regular">
          {isArabic ? data.subtitle.ar : data.subtitle.en}
        </p>

        <ul className="space-y-4">
          {data.faqItems.map((item, idx) => {
            const question = isArabic ? item.question.ar : item.question.en;
            const answer = isArabic ? item.answer.ar : item.answer.en;
            const isOpen = openIndex === idx;

            return (
              <li key={idx} className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>  
                <button
                  className="w-full flex items-center justify-between py-4 focus:outline-none"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                >
                  <span className="text-xl font-medium">{question}</span>
                  <Plus
                    size={24}
                    className={`transition-transform duration-300 ${isOpen ? 'rotate-45' : ''} text-primary-green`}
                  />
                </button>

                <div
                className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${isOpen ? 'max-h-[500px]' : 'max-h-0'}`}
              >
                    <div dangerouslySetInnerHTML={{ __html: answer }} />

                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;
