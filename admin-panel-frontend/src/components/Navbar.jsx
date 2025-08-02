import React from 'react';
import { FaBars, FaAngleLeft } from 'react-icons/fa';

const Navbar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <div className={`fixed top-0 left-0 right-0 z-10 flex items-center justify-between bg-gray-800 text-white h-16 px-4 shadow-md`}>
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="text-xl focus:outline-none">
          {isSidebarOpen ? <FaAngleLeft /> : <FaBars />}
        </button>
        <h1 className="text-xl font-bold">CCTV Abnormal Event Detection Platform</h1>
      </div>
      <div className="mr-4 text-sm">
        <span className="mr-2">Administrator</span>👤
      </div>
    </div>
  );
};

export default Navbar;
