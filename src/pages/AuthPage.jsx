import React, { useEffect, useState } from 'react';
import { useNavigate,useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;;

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        username,
        password
      });
  
      // Store token and user info
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
  
      const fromPath = location.state?.from || sessionStorage.getItem("redirectAfterLogin") || '/career';
      console.log(fromPath)
  
      if (response.data.user.isAdmin) {
        navigate('/applications');
      } else if (fromPath && fromPath.startsWith('/apply/')) {
        navigate(fromPath); // Just use the full path
      } else {
        navigate('/career'); // Fallback for non-admins
      }
  
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Authentication failed. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Allow any user to sign up
      const response = await axios.post(`${API_URL}/auth/register`, {
        username,
        email,
        password
      });
      
      setSuccess('Account created successfully! You can now log in.');
      setActiveTab('login');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("AuthPage location state:", location.state);
  }, [location]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-nizar">
      <div className="w-full max-w-md bg-gray-100 rounded-2xl shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] p-8">
        <div className="flex mb-6">
          <button
            className={`flex-1 py-3 rounded-lg font-medium text-gray-700 transition mr-4 ${
              activeTab === 'login'
                ? 'bg-white shadow-[inset_2px_2px_10px_#bebebe,inset_-3px_-3px_8px_#ffffff] text-primary-green'
                : 'bg-gray-100 shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff]'
            }`}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button
            className={`flex-1 py-3 rounded-lg font-medium text-gray-700 transition ${
              activeTab === 'signup'
                ? 'bg-white shadow-[inset_2px_2px_8px_#bebebe,inset_-3px_-3px_8px_#ffffff] text-secondary-blue'
                : 'bg-gray-100 shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff]'
            }`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg shadow-[inset_3px_3px_6px_#bebebe,inset_-3px_-3px_6px_#ffffff]">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-lg shadow-[inset_3px_3px_6px_#bebebe,inset_-3px_-3px_6px_#ffffff]">
            {success}
          </div>
        )}

        {activeTab === 'login' ? (
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 bg-gray-100 text-dark-gray rounded-lg shadow-[inset_5px_2px_8px_#bebebe,inset_-5px_-5px_10px_#ffffff] focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-gray-100 text-dark-gray rounded-lg shadow-[inset_2px_2px_8px_#bebebe,inset_-5px_-5px_10px_#ffffff] focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                required
              />
            </div>
            <div className="flex justify-center items-center">
            <button 
                type="submit" 
                disabled={isLoading}
                className="w-[30%] text-primary-green hover:text-secondary-blue font-medium py-2 px-4 rounded-xl bg-gray-100 shadow-[5px_5px_10px_#d1d1d1,_-5px_-5px_10px_#ffffff] hover:shadow-[inset_2px_2px_8px_#d1d1d1,_inset_-5px_-5px_10px_#ffffff] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 relative overflow-hidden"
              >
                <span className='bg-gradient-to-r from-primary-green to-secondary-blue bg-clip-text text-transparent'>
                  {isLoading ? 'Logging in...' : 'Login'}
                </span>
              </button>
          </div>
          </form>
        ) : (
          <form onSubmit={handleSignup}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="signup-username">
                Username
              </label>
              <input
                id="signup-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 bg-gray-100 text-dark-gray rounded-lg shadow-[inset_2px_2px_8px_#bebebe,inset_-5px_-5px_10px_#ffffff] focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Choose a username"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="signup-email">
                Email
              </label>
              <input
                id="signup-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-gray-100 text-dark-gray rounded-lg shadow-[inset_2px_2px_8px_#bebebe,inset_-5px_-5px_10px_#ffffff] focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="signup-password">
                Password
              </label>
              <input
                id="signup-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-gray-100 text-dark-gray rounded-lg shadow-[inset_2px_2px_8px_#bebebe,inset_-5px_-5px_10px_#ffffff] focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                required
              />
            </div>
            <div className="flex justify-center items-center">
            <button 
                type="submit" 
                disabled={isLoading}
                className="w-[30%] text-primary-green hover:text-secondary-blue font-medium py-2 px-4 rounded-xl bg-gray-100 shadow-[5px_5px_10px_#d1d1d1,_-5px_-5px_10px_#ffffff] hover:shadow-[inset_2px_2px_8px_#d1d1d1,_inset_-5px_-5px_10px_#ffffff] disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 relative overflow-hidden"
              >
                <span className='bg-gradient-to-r from-primary-green to-secondary-blue bg-clip-text text-transparent'>
                  {isLoading ? 'Signing up...' : 'Sign up'}
                </span>
              </button>
              </div>
          </form>
        )}
        
        <div className="mt-6 text-center">
          <Link
            to="/forgot-password"
            className="text-gray-600 hover:text-secondary-blue cursor-pointer"
          >
            {activeTab === 'login' 
              ? 'Forgot password' 
              : "Already have an account? Switch to Login."}
          </Link>
          <p className="text-gray-600">
            {activeTab === 'login' 
              ? "Don't have an account? Switch to Sign Up." : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;