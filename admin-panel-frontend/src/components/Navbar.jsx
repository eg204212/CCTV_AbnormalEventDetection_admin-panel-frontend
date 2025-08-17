import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaAngleLeft, FaSignOutAlt } from 'react-icons/fa';

const Navbar = ({ isSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail');

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  return (
    <div className={`fixed top-0 left-0 right-0 z-10 flex items-center justify-between bg-gray-800 text-white h-16 px-4 shadow-md`}>
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="text-xl focus:outline-none">
          {isSidebarOpen ? <FaAngleLeft /> : <FaBars />}
        </button>
        <h1 className="text-xl font-bold">CCTV Abnormal Event Detection Platform</h1>
      </div>
      <div className="flex items-center gap-4 mr-4">
        <span className="text-sm">{userEmail}</span>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-red-600 rounded hover:bg-red-700 transition-colors"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
