import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useDarkMode } from '../context/DarkModeContext';
import { useLanguage } from '../context/LanguageContext';
import client from '../sanityClient'; // Import Sanity client

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const { darkMode } = useDarkMode();
  const { isArabic } = useLanguage();
  const headingRef = useRef(null);
  const contentRef = useRef(null);
  const valuesRef = useRef(null);

  // State for About Us data
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    // Fetch data from Sanity
    client
      .fetch(
        `*[_type == "aboutUs"][0]{
          title, subtitle, content, values
        }`
      )
      .then((data) => setAboutData(data))
      .catch((error) => console.error("Sanity fetch error:", error));
  }, []);

  useEffect(() => {
    if (headingRef.current && contentRef.current && valuesRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );

      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: 'power3.out' }
      );

      const valueItems = Array.from(valuesRef.current.children);
      if (valueItems.length > 0) {
        gsap.fromTo(
          valueItems,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            delay: 0.6,
            ease: 'power2.out',
          }
        );
      }
    }

    return () => {
      gsap.killTweensOf([
        headingRef.current,
        contentRef.current,
        ...(valuesRef.current ? Array.from(valuesRef.current.children) : []),
      ]);
    };
  }, [isArabic, aboutData]);

  if (!aboutData) {
    return <p className="text-center text-gray-400">Loading...</p>;
  }

  return (
    <main className="container min-h-screen mx-auto px-4 py-24 relative font-nizar">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary-green opacity-5 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-secondary-blue opacity-5 blur-3xl"></div>
      </div>
  
      {/* Title Section with elegant divider */}
      <div ref={headingRef} className={`mb-16 ${isArabic ? 'rtl' : 'ltr'}`}>
        <div className="text-center">
          <h1 className={`text-4xl md:text-6xl font-bold mb-4 ${darkMode ? 'text-dark-gray' : 'text-white'} tracking-tight`}>
            {isArabic ? aboutData.title.ar : aboutData.title.en}
          </h1>
          <h2 className="text-2xl md:text-3xl text-secondary-blue font-light italic">
            {isArabic ? aboutData.subtitle.ar : aboutData.subtitle.en}
          </h2>
        </div>
        <div className="flex items-center justify-center mt-8 mb-12">
          <div className="h-px w-16 bg-gray-700"></div>
          <div className="h-1 w-16 mx-2 bg-primary-green rounded-full"></div>
          <div className="h-px w-16 bg-gray-700"></div>
        </div>
      </div>
  
      {/* Main Content with stylized quote marks */}
      <div className="max-w-3xl mx-auto mb-16 relative">
        {!isArabic && (
          <span className="absolute -top-10 -left-4 text-8xl text-primary-green opacity-20">"</span>
        )}
        <div ref={contentRef} className={`relative z-10 mb-5 text-lg ${darkMode ? 'text-secondary-dark-gray' : 'text-gray-200'} ${isArabic ? 'rtl text-right' : 'ltr text-left'}`}>
          <p className="mb-6 leading-relaxed tracking-wide">
            {isArabic ? aboutData.content.ar : aboutData.content.en}
          </p>
        </div>
        {!isArabic && (
          <span className="absolute -bottom-16 -right-4 text-8xl text-primary-green opacity-20">"</span>
        )}
      </div>
  
      {/* Values Section with elegant cards */}
      <div className={`max-w-5xl mx-auto ${isArabic ? 'rtl text-right' : 'ltr text-left'}`}>
        <div className="flex items-center mb-12">
          <h3 className={`text-2xl font-bold ${darkMode ? 'text-dark-gray' : 'text-white'}`}>
            {isArabic ? 'قيمنا:' : 'Our Values'}
          </h3>
          <div className="h-px flex-grow ml-6 bg-gray-700"></div>
        </div>
        
        <div ref={valuesRef} className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {aboutData.values.map((value, index) => (
            <div 
              key={index} 
              className={`relative backdrop-blur-sm rounded-lg overflow-hidden group transition-all duration-500 ease-in-out`}
            >
              {/* Card background with gradient overlay */}
              <div className="absolute inset-0 bg-white opacity-1 0"></div>
              <div className="absolute inset-0 border border-gray-700 rounded-lg group-hover:border-primary-green transition-colors duration-300"></div>
              
              {/* Accent corner */}
              <div className="absolute top-0 left-0 w-12 h-12 overflow-hidden">
                <div className="absolute transform rotate-45 bg-primary-green -top-8 -left-8 w-16 h-16 group-hover:bg-secondary-blue transition-colors duration-300"></div>
              </div>
              
              {/* Content */}
              <div className="relative p-8 z-10">
                <h4 className="text-xl font-bold mb-4 text-primary-green group-hover:text-secondary-blue transition-colors duration-300">
                  {isArabic ? value.title.ar : value.title.en}
                </h4>
                <p className={`${darkMode ? 'text-secondary-dark-gray' : 'text-gray-300'} line-clamp-3 group-hover:line-clamp-none transition-all duration-300`}>
                  {isArabic ? value.description.ar : value.description.en}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default AboutUs;
