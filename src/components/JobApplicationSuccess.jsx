import { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

export default function JobApplicationSuccess() {
  const [isAnimating, setIsAnimating] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 font-nizar">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="flex flex-col items-center text-center">
          <div className={`text-green-500 mb-4 ${isAnimating ? 'animate-bounce' : ''}`}>
            <CheckCircle size={80} />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Application Submitted!</h1>
          
          <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6 w-full">
            <p className="text-green-700">
              Your job application has been successfully submitted. We'll review it and get back to you soon.
            </p>
          </div>
          
          <div className="text-gray-600 mb-8">
            <p className="mb-2">Application Reference: <span className="font-medium">JOB-2025-{Math.floor(10000 + Math.random() * 90000)}</span></p>
            <p>A confirmation email has been sent to your registered email address.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <button 
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-md font-medium transition-colors duration-300"
              onClick={() => window.location.href = '/'}
            >
              Back to Home
            </button>
            
            <button 
              className="border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-6 rounded-md font-medium transition-colors duration-300"
              onClick={() => window.location.href = '/dashboard'}
            >
              View Applications
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-8 text-gray-500 text-center text-sm">
        <p>Need help? Contact our support team at <span className="text-indigo-600">support@company.com</span></p>
      </div>
    </div>
  );
}