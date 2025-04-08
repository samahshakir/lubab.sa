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
    <main className="container min-h-screen mx-auto px-4 pt-24 pb-20 relative font-nizar mt-10">
      {/* Title Section */}
      <div ref={headingRef} className={`text-center mb-10 ${isArabic ? 'rtl' : 'ltr'}`}>
        <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-dark-gray' : 'text-white'}`}>
          {isArabic ? aboutData.title.ar : aboutData.title.en}
        </h1>
        <h2 className="text-2xl md:text-3xl text-secondary-blue font-semibold">
          {isArabic ? aboutData.subtitle.ar : aboutData.subtitle.en}
        </h2>
      </div>

      {/* Main Content */}
      <div ref={contentRef} className={`mb-5 text-lg ${darkMode ? 'text-secondary-dark-gray' : 'text-gray-200'} ${isArabic ? 'rtl text-right' : 'ltr text-left'}`}>
        <p className="mb-6 leading-relaxed">
          {isArabic ? aboutData.content.ar : aboutData.content.en}
        </p>
      </div>

      {/* Values Section */}
      <div className={`${isArabic ? 'rtl text-right' : 'ltr text-left'}`}>
        <h3 className={`text-2xl font-bold mb-8 ${darkMode ? 'text-dark-gray' : 'text-white'}`}>
          {isArabic ? 'قيمنا:' : 'Our Values:'}
        </h3>
        <div ref={valuesRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {aboutData.values.map((value, index) => (
            <div key={index} className={`bg-opacity-10 ${darkMode ? 'bg-white' : 'bg-dark-gray'} p-6 rounded-lg backdrop-blur-sm border border-gray-700 border-opacity-20 hover:border-primary-green transition-all duration-300`}>
              <h4 className="text-xl font-bold mb-2 text-primary-green">
                {isArabic ? value.title.ar : value.title.en}
              </h4>
              <p className={`${darkMode ? 'text-secondary-dark-gray' : 'text-gray-300'}`}>
                {isArabic ? value.description.ar : value.description.en}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default AboutUs;
