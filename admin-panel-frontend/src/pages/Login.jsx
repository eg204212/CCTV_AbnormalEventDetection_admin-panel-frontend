import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminEmails } from '../config/adminEmails';
import axios from '../config/axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      // Save authentication state
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userEmail', 'admin@system.com');
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleSendOtp = async () => {
    if (!adminEmails.includes(email)) {
      setOtpError('Email not allowed');
      return;
    }
    setOtpError('');
    try {
      await axios.post('/api/auth/send-otp', { email });
      setOtpSent(true);
      alert('OTP has been sent to your email');
    } catch (error) {
      setOtpError(error.response?.data?.message || 'Failed to send OTP');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post('/api/auth/verify-otp', { email, otp });
      if (response.data.status === 'success') {
        // Save authentication state
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', email);
        
        // Close modal and reset states
        setShowForgotModal(false);
        setOtpSent(false);
        
        // Navigate to dashboard
        navigate('/dashboard');
      }
    } catch (error) {
      setOtpError(error.response?.data?.message || 'Invalid OTP');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 px-4 py-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-2 px-4 py-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-4">
          Login
        </button>
        <p 
          className="text-center text-sm text-blue-600 cursor-pointer" 
          onClick={() => setShowForgotModal(true)}
        >
          Forgot Password?
        </p>
      </form>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white p-8 rounded-lg shadow-md w-96">
            {!otpSent ? (
              <>
                <h2 className="text-xl font-bold mb-4 text-center">Forgot Password</h2>
                <input
                  type="email"
                  placeholder="Enter your admin email"
                  className="w-full mb-4 px-4 py-2 border rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {otpError && <p className="text-red-500 text-sm mb-2">{otpError}</p>}
                <button
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-4"
                  onClick={handleSendOtp}
                  type="button"
                >
                  Send OTP
                </button>
                <p 
                  className="text-center text-sm text-gray-600 cursor-pointer" 
                  onClick={() => setShowForgotModal(false)}
                >
                  Cancel
                </p>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-4 text-center">Enter OTP</h2>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className="w-full mb-4 px-4 py-2 border rounded"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                {otpError && <p className="text-red-500 text-sm mb-2">{otpError}</p>}
                <button
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mb-4"
                  onClick={handleVerifyOtp}
                  type="button"
                >
                  Verify OTP
                </button>
                <p 
                  className="text-center text-sm text-gray-600 cursor-pointer" 
                  onClick={() => setShowForgotModal(false)}
                >
                  Cancel
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
