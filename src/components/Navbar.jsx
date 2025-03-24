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
  const { isArabic, setIsArabic } = useLanguage();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const themeIconRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <nav className={`fixed w-full top-0 z-50 px-6 py-4 transition-colors duration-300 backdrop-blur-md  ${darkMode ? 'bg-[#00BC78CC]' :  `bg-black/30 dark:bg-gray-900/50` }`}>
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div>
          <img 
            src="src/assets/lubab-b.png" 
            alt="LUBAB" 
            className="h-11 w-auto"
          />
        </div>

        <div className="flex items-center gap-6">
          {/* Dark Mode Toggle Icon */}
          <button 
            onClick={toggleDarkMode} 
            className="flex items-center gap-2 text-white hover:text-yellow-400 transition-colors"
            aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <div ref={themeIconRef}>
              {darkMode ? (
                <Sun size={24} className="text-yellow-400" />
              ) : (
                <Moon size={24} />
              )}
            </div>
          </button>

          {/* Language Toggle Icon */}
          <button 
            onClick={() => setIsArabic(!isArabic)} 
            className="flex items-center gap-2 text-white hover:text-blue-500 transition-colors"
            aria-label="Switch Language"
          >
            <span>{isArabic ? "English" : "Arabic"}</span>
            <Globe size={24} />
          </button>

          {/* Menu Button (visual only) */}
          <div 
            ref={menuButtonRef}
            className="z-50 relative cursor-pointer"
            aria-label="Menu button"
            onClick={toggleMenu}
          >
            <div className="flex flex-col justify-center items-end space-y-2 group">
              <span ref={line1Ref} className="block w-8 h-0.5 bg-white origin-center transform transition-all dark:bg-white"></span>
              <span ref={line2Ref} className="block w-6 h-0.5 bg-white origin-center transform transition-all dark:bg-white"></span>
              <span ref={line3Ref} className="block w-8 h-0.5 bg-white origin-center transform transition-all dark:bg-white"></span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div ref={menuRef} className="hidden flex items-center justify-center gap-10 mt-4">
        <a href="/" className="text-white hover:text-blue-500 transition-colors">Home</a>
        <a href="team" className="text-white hover:text-blue-500 transition-colors">Team</a>
        <a href="services" className="text-white hover:text-blue-500 transition-colors">Services</a>
        <a href="about" className="text-white hover:text-blue-500 transition-colors">About us</a>
        <a href="career" className="text-white hover:text-blue-500 transition-colors">Career</a>
        <a href="contact" className="text-white hover:text-blue-500 transition-colors">Contact us</a>
      </div>
    </nav>
  );
};

export default Navbar;