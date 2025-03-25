import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Globe, Moon, Sun } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useDarkMode } from "../context/DarkModeContext";

const Navbar = () => {
  const menuButtonRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const menuRef = useRef(null);
  const navRef = useRef(null);
  const { isArabic, setIsArabic } = useLanguage();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const themeIconRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setHasScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation for theme toggle
  useEffect(() => {
    if (themeIconRef.current) {
      gsap.fromTo(
        themeIconRef.current,
        { rotate: 0, scale: 1 },
        { rotate: 360, scale: [0.8, 1.2, 1], duration: 0.3, ease: "power4.out" }
      );
    }
  }, [darkMode]);

  // Animation for menu toggle
  useEffect(() => {
    if (menuRef.current) {
      if (isMenuOpen) {
        gsap.to(menuRef.current, { opacity: 1, display: 'flex', duration: 0.3, ease: "power4.out" });
        gsap.fromTo(menuRef.current.children, { opacity: 0, x: 20 }, { opacity: 1, x: 0, stagger: 0.05, duration: 0.3, ease: "power4.out" });
      } else {
        gsap.to(menuRef.current, { opacity: 0, onComplete: () => gsap.set(menuRef.current, { display: 'none' }), duration: 0.3, ease: "power4.out" });
        gsap.to(menuRef.current.children, { opacity: 0, x: -20, stagger: 0.05, duration: 0.3, ease: "power4.out" });
      }
    }
  }, [isMenuOpen]);

  // Toggle menu and animate lines
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);

    if (line1Ref.current && line2Ref.current && line3Ref.current) {
      if (isMenuOpen) {
        gsap.to(line1Ref.current, { rotate: 0, y: 0, duration: 0.3, ease: "power4.out" });
        gsap.to(line2Ref.current, { opacity: 1, duration: 0.3, ease: "power4.out" });
        gsap.to(line3Ref.current, { rotate: 0, y: 0, duration: 0.3, ease: "power4.out" });
      } else {
        gsap.to(line1Ref.current, { rotate: 45, y: 5, duration: 0.3, ease: "power4.out" });
        gsap.to(line2Ref.current, { opacity: 0, duration: 0.3, ease: "power4.out" });
        gsap.to(line3Ref.current, { rotate: -45, y: -5, duration: 0.3, ease: "power4.out" });
      }
    }
  };

  return (
    <nav 
      ref={navRef}
      dir={isArabic ? "rtl" : "ltr"}
      className={`font-nizar fixed w-full top-0 z-50 px-6 py-4 transition-all duration-300 
        ${hasScrolled 
          ? darkMode 
            ? 'bg-[#E5E7EB]/30' 
            : 'bg-[#111c32]/30' 
          : 'bg-transparent'}`}
    >
      <div className={`flex justify-between items-center ${isArabic ? "flex-row-reverse" : ""}`}>

        {/* Logo */}
        <div className={isArabic ? "order-last" : "order-first"}>
          <img 
            src="src/assets/lubab-b.png" 
            alt="LUBAB" 
            className="h-11 w-auto"
          />
        </div>

        <div className={`flex items-center gap-6 ${isArabic ? "order-first" : "order-last"}`}>
          {/* Desktop Menu (only visible on large screens) */}
          <div className="hidden lg:flex items-center gap-8">
            <a href="/" className={`${darkMode ? 'text-secondary-dark-gray hover:text-black' : 'text-gray-400 hover:text-white'}  transition-colors`}>{isArabic ? "الرئيسية" : "HOME"}</a>
            <a href="team" className={`${darkMode ? 'text-secondary-dark-gray hover:text-black' : 'text-gray-400 hover:text-white'} transition-colors`}>{isArabic ? "فريق العمل" : "TEAM"}</a>
            <a href="services" className={`${darkMode ? 'text-secondary-dark-gray hover:text-black' : 'text-gray-400 hover:text-white'} transition-colors`}>{isArabic ? "خدماتنا" : "SERVICES"}</a>
            <a href="about" className={`${darkMode ? 'text-secondary-dark-gray hover:text-black' : 'text-gray-400 hover:text-white'} transition-colors`}>{isArabic ? "من نحن" : "ABOUT US"}</a>
            <a href="career" className={`${darkMode ? 'text-secondary-dark-gray hover:text-black' : 'text-gray-400 hover:text-white'} transition-colors`}>{isArabic ? "انضم إلى فريق لباب" : "CAREER"}</a>
            <a href="contact" className={`${darkMode ? 'text-secondary-dark-gray hover:text-black' : 'text-gray-400 hover:text-white'} transition-colors`}>{isArabic ? "تواصل معنا" : "CONTACT US"}</a>
          </div>
          
          {/* Dark Mode Toggle Icon */}
          <button 
            onClick={toggleDarkMode} 
            className="flex items-center gap-2 text-white hover:text-yellow-400 transition-colors"
            aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <div ref={themeIconRef}>
              {darkMode ? (
                <Sun size={24} className="text-black" />
              ) : (
                <Moon size={24} />
              )}
            </div>
          </button>

          {/* Language Toggle Icon */}
          <button 
            onClick={() => setIsArabic(!isArabic)} 
              className={`flex items-center gap-2 ${darkMode?  'text-secondary-dark-gray hover:text-black' : 'text-gray-400 hover:text-white'} transition-colors`}
            aria-label="Switch Language"
          >
            <span>{isArabic ? "English" : "العربية"}</span>
            <Globe size={24} />
          </button>

          {/* Menu Button (only visible on mobile) */}
          <div 
            ref={menuButtonRef}
            className="z-50 relative cursor-pointer lg:hidden"
            aria-label="Menu button"
            onClick={toggleMenu}
          >
            <div className="flex flex-col justify-center items-end space-y-2 group">
              <span ref={line1Ref} className={`block w-8 h-0.5 ${darkMode ? 'bg-[#101828]' : 'bg-white'} origin-center transform transition-all dark:bg-white`}></span>
              <span ref={line2Ref} className={`block w-8 h-0.5 ${darkMode ? 'bg-[#101828]' : 'bg-white'} origin-center transform transition-all dark:bg-white`}></span>
              <span ref={line3Ref} className={`block w-8 h-0.5 ${darkMode ? 'bg-[#101828]' : 'bg-white'} origin-center transform transition-all dark:bg-white`}></span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu (only visible on small screens) */}
      <div 
        ref={menuRef} 
        className={`lg:hidden ${isMenuOpen ? 'flex' : 'hidden'} flex-col items-center gap-4 mt-4 ${hasScrolled ? 'backdrop-blur-md' : ''}`}
      >
        <a href="/" className={`${darkMode ? 'text-secondary-dark-gray hover:text-black' : 'text-gray-400 hover:text-white'}  transition-colors`}>{isArabic ? "الرئيسية" : "HOME"}</a>
            <a href="team" className={`${darkMode ? 'text-secondary-dark-gray hover:text-black' : 'text-gray-400 hover:text-white'} transition-colors`}>{isArabic ? "الفريق" : "TEAM"}</a>
            <a href="services" className={`${darkMode ? 'text-secondary-dark-gray hover:text-black' : 'text-gray-400 hover:text-white'} transition-colors`}>{isArabic ? "الخدمات" : "SERVICES"}</a>
            <a href="about" className={`${darkMode ? 'text-secondary-dark-gray hover:text-black' : 'text-gray-400 hover:text-white'} transition-colors`}>{isArabic ? "من نحن" : "ABOUT US"}</a>
            <a href="career" className={`${darkMode ? 'text-secondary-dark-gray hover:text-black' : 'text-gray-400 hover:text-white'} transition-colors`}>{isArabic ? "وظائف" : "CAREER"}</a>
            <a href="contact" className={`${darkMode ? 'text-secondary-dark-gray hover:text-black' : 'text-gray-400 hover:text-white'} transition-colors`}>{isArabic ? "اتصل بنا" : "CONTACT US"}</a>
      </div>
    </nav>
  );
};

export default Navbar;