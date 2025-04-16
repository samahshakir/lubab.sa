import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_URL;

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  // Step 1: Request OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await axios.post(`${apiUrl}/api/send-otp`, { email });
      setSuccess('OTP has been sent to your email.');
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    const otpString = otp.join('');
    
    try {
      await axios.post(`${apiUrl}/api/verify-otp`, { email, otp: otpString });
      setSuccess('OTP verified successfully.');
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid or expired OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Update Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    
    setLoading(true);
    
    try {
      await axios.post(`${apiUrl}/api/reset-password`, { 
        email, 
        otp: otp.join(''), 
        newPassword: password 
      });
      setSuccess('Password has been reset successfully!');
      setTimeout(() => {
        navigate('/auth');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP input changes
  const handleOtpChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  // Handle backspace in OTP inputs
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  return (
    <div className="min-h-screen sm:min-h-0 bg-gray-100 flex items-center justify-center p-4 font-nizar">
    <div className="w-full max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded-2xl shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff]">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        {step === 1 && 'Forgot Password'}
        {step === 2 && 'Verify OTP'}
        {step === 3 && 'Reset Password'}
      </h2>
      
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
      {success && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{success}</div>}
      
      {step === 1 && (
        <form onSubmit={handleSendOtp}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              className="w-full px-3 py-2 bg-gray-100 text-dark-gray rounded-lg shadow-[inset_5px_2px_8px_#bebebe,inset_-5px_-5px_10px_#ffffff] focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="text-center mt-4">
          <button
            type="submit"
            className="w-[40%] py-2 px-4 rounded bg-gray-100 shadow-[5px_5px_10px_#d1d1d1,_-5px_-5px_10px_#ffffff] hover:shadow-[inset_2px_2px_8px_#d1d1d1,_inset_-5px_-5px_10px_#ffffff]"
            disabled={loading}
          >
            <span className='bg-gradient-to-r from-primary-green to-secondary-blue bg-clip-text text-transparent'>{loading ? 'Sending...' : 'Send OTP'}</span>
          </button>
          </div>
          <div className="text-center mt-4">
            <button 
              type="button"
              className="text-secondary-blue hover:underline "
              onClick={() => navigate('/auth')}
            >
              Back to Login
            </button>
          </div>
        </form>
      )}
      
      {step === 2 && (
        <form onSubmit={handleVerifyOtp}>
          <p className="mb-4 text-gray-600">
            We've sent a 6-digit code to {email}. Please enter it below.
          </p>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Enter OTP</label>
            <div className="flex space-x-2 justify-between">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  className="w-10 h-10 text-center text-xl border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  required
                />
              ))}
            </div>
          </div>
          <div className="text-center mt-4">
          <button
            type="submit"
            className="w-[40%] py-2 px-4 rounded bg-gray-100 shadow-[5px_5px_10px_#d1d1d1,_-5px_-5px_10px_#ffffff] hover:shadow-[inset_2px_2px_8px_#d1d1d1,_inset_-5px_-5px_10px_#ffffff]"
            disabled={loading || otp.some(digit => !digit)}
          >
            <span className='bg-gradient-to-r from-primary-green to-secondary-blue bg-clip-text text-transparent'>{loading ? 'Verifying...' : 'Verify OTP'}</span>
          </button>
          </div>
          <div className="text-center mt-4">
            <button 
              type="button"
              className="text-blue-500 hover:underline"
              onClick={() => setStep(1)}
            >
              Back
            </button>
          </div>
        </form>
      )}
      
      {step === 3 && (
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">New Password</label>
            <input
              id="password"
              type="password"
              className="w-full px-3 py-2 bg-gray-100 text-dark-gray rounded-lg shadow-[inset_5px_2px_8px_#bebebe,inset_-5px_-5px_10px_#ffffff] focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter new password"
              minLength={8}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full px-3 py-2 bg-gray-100 text-dark-gray rounded-lg shadow-[inset_5px_2px_8px_#bebebe,inset_-5px_-5px_10px_#ffffff] focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm new password"
            />
          </div>
          <div className='text-center'>
          <button
            type="submit"
            className="w-[40%] py-2 px-4 rounded bg-gray-100 shadow-[5px_5px_10px_#d1d1d1,_-5px_-5px_10px_#ffffff] hover:shadow-[inset_2px_2px_8px_#d1d1d1,_inset_-5px_-5px_10px_#ffffff]"
            disabled={loading}
          >
            <span className='bg-gradient-to-r from-primary-green to-secondary-blue bg-clip-text text-transparent'>{loading ? 'Updating...' : 'Reset Password'}</span>
          </button>
          </div>
        </form>
      )}
    </div>
    </div>
  );
};

export default ForgotPassword;