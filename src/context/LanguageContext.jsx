import { createContext, useState, useContext, useEffect } from "react";

// Create Context
const LanguageContext = createContext();

// Provider Component
export const LanguageProvider = ({ children }) => {
  // Get initial language preference from localStorage, default to true (Arabic) if not set
  const storedLanguage = localStorage.getItem("isArabic");
  const initialLanguage = storedLanguage ? JSON.parse(storedLanguage) : true;

  const [isArabic, setIsArabic] = useState(initialLanguage);

  // Update localStorage whenever the language preference changes
  useEffect(() => {
    localStorage.setItem("isArabic", JSON.stringify(isArabic));
  }, [isArabic]);

  return (
    <LanguageContext.Provider value={{ isArabic, setIsArabic }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom Hook for easy access
export const useLanguage = () => useContext(LanguageContext);
