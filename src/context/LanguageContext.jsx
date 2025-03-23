import { createContext, useState, useContext } from "react";

// Create Context
const LanguageContext = createContext();

// Provider Component
export const LanguageProvider = ({ children }) => {
  const [isArabic, setIsArabic] = useState(false);

  return (
    <LanguageContext.Provider value={{ isArabic, setIsArabic }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom Hook for easy access
export const useLanguage = () => useContext(LanguageContext);
