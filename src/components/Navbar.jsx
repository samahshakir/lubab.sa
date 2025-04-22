import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Globe, Moon, Sun } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useDarkMode } from "../context/DarkModeContext";
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

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

  const navLinks = [
    { name: isArabic ? "الرئيسية" : "HOME", to: "#", isExternal: false },
    { name: isArabic ? "من نحن" : "ABOUT US", to: "about", isExternal: false },
    { name: isArabic ? "خدماتنا" : "SERVICES", to: "services", isExternal: false },
    { name: isArabic ? "المدونة" : "BLOG", to: "blog", isExternal: false },
    { name: isArabic ? "فريق العمل" : "TEAM", to: "team", isExternal: false },
    { name: isArabic ? "تواصل معنا" : "CONTACT US", to: "contact", isExternal: false },
    { name: isArabic ? "انضم إلى فريق لباب" : "CAREER", to: "/career", isExternal: true },
  ];

  return (
    <nav 
      ref={navRef}
      dir={isArabic ? "rtl" : "ltr"}
      className={`font-nizar fixed w-full z-50 px-6 py-4 transition-all duration-300 
        ${hasScrolled 
          ? darkMode 
            ? 'bg-[#E5E7EB]/30' 
            : 'bg-dark-mode/30' 
          : 'bg-transparent'}`}
    >
      <div className={`flex justify-between items-center ${isArabic ? "flex-row-reverse" : ""}`}>

        {/* Logo */}
        <div className={isArabic ? "order-last" : "order-first"}>
          <div className="h-11">
            <img 
              src="/lubab-b.png" 
              alt="LUBAB" 
              className="h-full w-auto"
            />
          </div>
        </div>

        <div className={`flex items-center gap-6 ${isArabic ? "order-first" : "order-last"}`}>
          {/* Desktop Menu (only visible on large screens) */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <React.Fragment key={link.name}>
                {link.isExternal ? (
                  <RouterLink
                    to={link.to}
                    className={`${darkMode ? 'text-secondary-dark-gray hover:text-black' : 'text-gray-400 hover:text-white'} transition-colors cursor-pointer`}
                    aria-label={link.name}
                  >
                    {link.name}
                  </RouterLink>
                ) : (
                  <ScrollLink
                    to={link.to}
                    smooth={true}
                    duration={500}
                    className={`${darkMode ? 'text-secondary-dark-gray hover:text-black' : 'text-gray-400 hover:text-white'} transition-colors cursor-pointer`}
                    aria-label={link.name}
                  >
                    {link.name}
                  </ScrollLink>
                )}
              </React.Fragment>
            ))}
          </div>
          
          {/* Dark Mode Toggle Icon */}
          <button 
            onClick={toggleDarkMode} 
            className="flex items-center gap-2 text-white hover:text-yellow-400 transition-colors cursor-pointer"
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
            className={`flex items-center gap-2 ${darkMode ? 'text-secondary-dark-gray hover:text-black' : 'text-gray-400 hover:text-white'} transition-colors cursor-pointer`}
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
        className={`lg:hidden ${isMenuOpen ? 'flex' : 'hidden'} flex-col items-center gap-4 mt-4 backdrop-blur-md`}
      >
        {navLinks.map((link) => (
          <React.Fragment key={link.name}>
            {link.isExternal ? (
              <RouterLink
                to={link.to}
                className={`${darkMode ? 'text-secondary-dark-gray hover:text-black' : 'text-gray-400 hover:text-white'} transition-colors cursor-pointer`}
                aria-label={link.name}
              >
                {link.name}
              </RouterLink>
            ) : (
              <ScrollLink
                to={link.to}
                smooth={true}
                duration={500}
                className={`${darkMode ? 'text-secondary-dark-gray hover:text-black' : 'text-gray-400 hover:text-white'} transition-colors cursor-pointer`}
                aria-label={link.name}
              >
                {link.name}
              </ScrollLink>
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;