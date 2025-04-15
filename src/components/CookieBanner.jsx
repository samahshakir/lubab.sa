import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (cookiesAccepted !== 'true') {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setShowBanner(false);
  };

  const declineCookies = () => {
    // Handle declining cookies - you might want to set minimal cookies only
    localStorage.setItem('cookiesAccepted', 'false');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-100 text-black p-4 shadow-lg z-50 border-t border-t-gray-200">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="mb-4 md:mb-0 md:mr-4 text-center md:text-left">
          <h3 className="font-bold text-lg mb-1">We value your privacy</h3>
          <p className="text-sm text-dark-gray">
            We use cookies to enhance your browsing experience or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
          </p>
        </div>
        <div className="flex flex-row gap-2">
          <button 
            onClick={declineCookies}
            className="px-4 py-2 rounded text-sm font-medium transition-colors bg-gray-100 shadow-[5px_5px_10px_#d1d1d1,_-5px_-5px_10px_#ffffff] hover:shadow-[inset_5px_5px_10px_#d1d1d1,_inset_-5px_-5px_10px_#ffffff]"
          >
             <span className="bg-gradient-to-r from-primary-green to-secondary-blue bg-clip-text text-transparent">Decline</span>
          </button>
          <button 
            onClick={acceptCookies}
            className="px-4 py-2 bg-gray-100 shadow-[5px_5px_10px_#d1d1d1,_-5px_-5px_10px_#ffffff] hover:shadow-[inset_5px_5px_10px_#d1d1d1,_inset_-5px_-5px_10px_#ffffff] rounded text-sm font-medium transition-colors"
          >
             <span className="bg-gradient-to-r from-primary-green to-secondary-blue bg-clip-text text-transparent">Accept All</span>
          </button>
        </div>
      </div>
    </div>
  );
}