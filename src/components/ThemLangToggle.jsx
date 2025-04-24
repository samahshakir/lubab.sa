// components/ThemeLangToggle.js
import React, { useEffect, useRef } from "react";
import { Globe, Moon, Sun } from "lucide-react";
import { gsap } from "gsap";
import { useLanguage } from "../context/LanguageContext";
import { useDarkMode } from "../context/DarkModeContext";

const ThemeLangToggle = ({ className = "" }) => {
  const { isArabic, setIsArabic } = useLanguage();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const themeIconRef = useRef(null);

  useEffect(() => {
    if (themeIconRef.current) {
      gsap.fromTo(
        themeIconRef.current,
        { rotate: 0, scale: 1 },
        { rotate: 360, scale: [0.8, 1.2, 1], duration: 0.3, ease: "power4.out" }
      );
    }
  }, [darkMode]);

  return (
    <div className={`flex items-center gap-4 ${className} font-nizar`}>
      {/* Language Toggle */}
      <button
        onClick={() => setIsArabic(!isArabic)}
        className={`flex items-center gap-2 ${
          darkMode
            ? "text-secondary-dark-gray hover:text-black"
            : "text-gray-400 hover:text-white"
        } transition-colors cursor-pointer`}
        aria-label="Switch Language"
      >
        <span>{isArabic ? "English" : "العربية"}</span>
        <Globe size={24} />
      </button>
      {/* Dark Mode */}
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
    </div>
  );
};

export default ThemeLangToggle;
