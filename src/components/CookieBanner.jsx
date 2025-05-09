import { useState, useEffect } from 'react';
import { useDarkMode } from "../context/DarkModeContext";
import { useLanguage } from "../context/LanguageContext";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const { isArabic } = useLanguage();
  const { darkMode } = useDarkMode();

  useEffect(() => {
    // Check if user has already accepted or declined cookies
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (cookiesAccepted !== 'true') {
      setShowBanner(true);
    }
  }, []);

  const loadMatomoTagManager = () => {
    // Dynamically load Matomo Tag Manager script using the environment variable
    var _mtm = window._mtm = window._mtm || [];
    _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});

    const script = document.createElement('script');
    script.async = true;
    script.src = import.meta.env.VITE_MATOMO_TAG_MANAGER_URL;// Using the environment variable
    document.getElementsByTagName('script')[0].parentNode.insertBefore(script, document.getElementsByTagName('script')[0]);
  };

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setShowBanner(false);
    loadMatomoTagManager(); // Load Matomo Tag Manager after accepting cookies
  };

  const declineCookies = () => {
    localStorage.setItem('cookiesAccepted', 'false');
    setShowBanner(false);
    // Handle declining cookies - you might want to set minimal cookies only
  };

  if (!showBanner) return null;

  return (
    <div className={`fixed bottom-0 left-0 right-0 ${!darkMode ? 'bg-dark-mode' : 'bg-gray-100'} text-black p-4 shadow-lg z-50 border-t border-t-gray-200`} >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0 md:mr-4 text-center md:text-left">
          <h3 className="font-bold text-lg mb-1">{isArabic ? `نحن نقدر خصوصيتك.` : `We value your privacy.`}</h3>
          <p className={`text-sm ${darkMode ? 'text-dark-gray' : 'text-secondary-light-gray'} `}>{isArabic ? `نستخدم ملفات تعريف الارتباط لتحسين تجربة تصفحك أو المحتوى، وتحليل زياراتنا. بالنقر على "قبول الكل"، فإنك توافق على استخدامنا لملفات تعريف الارتباط.`:
            `We use cookies to enhance your browsing experience or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.`}
          </p>
        </div>
        <div className="flex flex-row gap-2">
          <button 
            onClick={declineCookies}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${!darkMode ?  'bg-dark-mode shadow-[5px_5px_10px_#1a1a1a,_-5px_-5px_10px_#3a3a3a] hover:shadow-[inset_5px_5px_10px_#1a1a1a,_inset_-5px_-5px_10px_#3a3a3a]' : 'bg-gray-100 shadow-[5px_5px_10px_#d1d1d1,_-5px_-5px_10px_#ffffff] hover:shadow-[inset_5px_5px_10px_#d1d1d1,_inset_-5px_-5px_10px_#ffffff'}`}>
            <span className="bg-gradient-to-r from-primary-green to-secondary-blue bg-clip-text text-transparent">{ isArabic? 'انخفاض' : 'Decline'}</span>
          </button>
          <button 
            onClick={acceptCookies}
            className={`px-4 py-2 rounded ${!darkMode ?  'bg-dark-mode shadow-[5px_5px_10px_#1a1a1a,_-5px_-5px_10px_#3a3a3a] hover:shadow-[inset_5px_5px_10px_#1a1a1a,_inset_-5px_-5px_10px_#3a3a3a]' : 'bg-gray-100 shadow-[5px_5px_10px_#d1d1d1,_-5px_-5px_10px_#ffffff] hover:shadow-[inset_5px_5px_10px_#d1d1d1,_inset_-5px_-5px_10px_#ffffff'}`}>
            <span className="bg-gradient-to-r from-primary-green to-secondary-blue bg-clip-text text-transparent">{isArabic ? 'قبول الكل' : 'Accept All'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
