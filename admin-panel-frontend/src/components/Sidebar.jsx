import React from 'react';
import { FaChartBar, FaCamera, FaUserTie, FaFileAlt, FaShoppingCart, FaCog, FaSignOutAlt } from 'react-icons/fa';

const menuItems = [
  { name: 'User Dashboard', icon: <FaChartBar /> },
  { name: 'Products', icon: <FaCamera /> },
  { name: 'Product Orders', icon: <FaShoppingCart /> },
  { name: 'Reports', icon: <FaFileAlt /> },
  { name: 'Administration', icon: <FaUserTie /> },
  { name: 'Settings', icon: <FaCog /> },
  { name: 'Logout', icon: <FaSignOutAlt /> },
];

const Sidebar = ({ isOpen }) => {
  return (
    <div className={`bg-gray-900 text-white h-screen p-4 transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'} overflow-hidden`}>
      <ul className="space-y-6 mt-20">
        {menuItems.map((item, idx) => (
          <li key={idx} className="flex items-center gap-4 hover:text-blue-400 cursor-pointer">
            <span className="text-lg">{item.icon}</span>
            {isOpen && <span className="whitespace-nowrap">{item.name}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
