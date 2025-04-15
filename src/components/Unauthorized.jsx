import { useState } from 'react';

export default function NotAuthorized() {
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  const handleGoHome = () => {
    setIsRedirecting(true);
    window.location.href = '/'
    setTimeout(() => {
      alert('In a real app, this would redirect to the home page');
      setIsRedirecting(false);
    }, 1000);
  };

  const handleLogin = () => {
    setIsRedirecting(true);
    window.location.href = '/auth'
    setTimeout(() => {
      alert('In a real app, this would redirect to the login page');
      setIsRedirecting(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 font-nizar">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <div className="mx-auto bg-red-100 rounded-full p-3 w-16 h-16 flex items-center justify-center">
            <svg 
              className="w-8 h-8 text-red-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M12 15v2m0 0v2m0-2h2m-2 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Access Denied
        </h1>
        
        <p className="text-gray-600 mb-6">
          You are not authorized to view this page. Please log in with an account that has the required permissions, or contact your administrator for assistance.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleGoHome}
            disabled={isRedirecting}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-800 font-medium transition-colors disabled:opacity-50"
          >
            Go to Home
          </button>
          <button
            onClick={handleLogin}
            disabled={isRedirecting}
            className="px-4 py-2 bg-secondary-blue hover:bg-blue-700 rounded text-white font-medium transition-colors disabled:opacity-50"
          >
            {isRedirecting ? 'Redirecting...' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
}