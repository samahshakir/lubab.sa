// src/components/Navbar.jsx
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Globe, Moon, Sun } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useDarkMode } from "../context/DarkModeContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const menuOverlayRef = useRef(null);
  const menuItemsRef = useRef(null);
  const { isArabic, setIsArabic } = useLanguage();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const themeIconRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Animation for theme toggle
  useEffect(() => {
    if (themeIconRef.current) {
      gsap.fromTo(
        themeIconRef.current,
        { rotate: 0, scale: 1 },
        { rotate: 360, scale: [0.8, 1.2, 1], duration: 0.5, ease: "back.out" }
      );
    }
  }, [darkMode]);

  useEffect(() => {
    if (menuOpen) {
      // Animate hamburger to X
      gsap.to(line1Ref.current, {
        rotate: 45,
        y: 8,
        duration: 0.4,
        ease: "power2.out"
      });
      gsap.to(line2Ref.current, {
        opacity: 0,
        x: -10,
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(line3Ref.current, {
        rotate: -45,
        y: -8,
        duration: 0.4,
        ease: "power2.out"
      });

      // Animate menu overlay
      gsap.to(menuOverlayRef.current, {
        clipPath: "circle(150% at top right)",
        duration: 0.8,
        ease: "power3.inOut"
      });

      // Animate menu items
      gsap.fromTo(
        menuItemsRef.current.children,
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.1, 
          duration: 0.6,
          delay: 0.3,
          ease: "power2.out"
        }
      );
    } else {
      // Animate X back to hamburger
      gsap.to(line1Ref.current, {
        rotate: 0,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      });
      gsap.to(line2Ref.current, {
        opacity: 1,
        x: 0,
        duration: 0.4,
        ease: "power2.out"
      });
      gsap.to(line3Ref.current, {
        rotate: 0,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      });

      // Animate menu overlay
      gsap.to(menuOverlayRef.current, {
        clipPath: "circle(0% at top right)",
        duration: 0.6,
        ease: "power3.inOut"
      });

      // Fade out menu items
      gsap.to(menuItemsRef.current.children, {
        y: -20,
        opacity: 0,
        stagger: 0.05,
        duration: 0.3,
        ease: "power2.in"
      });
    }
  }, [menuOpen]);

  return (
    <nav className="fixed w-full top-0 z-50 px-6 py-6 transition-colors duration-300 dark:bg-gray-900">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div>
          <img 
            src="src/assets/lubab-b.png" 
            alt="LUBAB" 
            className="h-12 w-auto"
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

          {/* Menu Button */}
          <button 
            ref={menuButtonRef} 
            onClickref={menuButtonRef} 
            onClick={toggleMenu} 
            className="z-50 relative"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col justify-center items-end space-y-2 group">
              <span ref={line1Ref} className="block w-8 h-0.5 bg-white origin-center transform transition-all dark:bg-white"></span>
              <span ref={line2Ref} className="block w-6 h-0.5 bg-white origin-center transform transition-all dark:bg-white"></span>
              <span ref={line3Ref} className="block w-8 h-0.5 bg-white origin-center transform transition-all dark:bg-white"></span>
            </div>
          </button>
        </div>
      </div>

      {/* Menu Overlay */}
      <div 
        ref={menuOverlayRef}
        className="fixed inset-0 bg-black bg-opacity-95 z-40 dark:bg-gray-900 dark:bg-opacity-95"
        style={{ clipPath: "circle(0% at top right)" }}
      >
        <div className="h-full flex items-center justify-center">
          <ul ref={menuItemsRef} className="text-center space-y-8">
            <li className="overflow-hidden">
              <a href="#" className="text-white text-4xl md:text-6xl font-bold hover:text-purple-500 transition-colors">
                {isArabic ? "الرئيسية" : "Home"}
              </a>
            </li>
            <li className="overflow-hidden">
              <a href="#" className="text-white text-4xl md:text-6xl font-bold hover:text-purple-500 transition-colors">
                {isArabic ? "الأعمال" : "Work"}
              </a>
            </li>
            <li className="overflow-hidden">
              <a href="#" className="text-white text-4xl md:text-6xl font-bold hover:text-purple-500 transition-colors">
                {isArabic ? "حول" : "About"}
              </a>
            </li>
            <li className="overflow-hidden">
              <a href="#" className="text-white text-4xl md:text-6xl font-bold hover:text-purple-500 transition-colors">
                {isArabic ? "اتصل بنا" : "Contact"}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;