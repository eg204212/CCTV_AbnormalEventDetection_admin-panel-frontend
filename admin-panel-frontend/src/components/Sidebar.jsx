<<<<<<< HEAD
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  FaChartBar,
  FaCamera,
  FaUserTie,
  FaFileAlt,
  FaShoppingCart,
  FaCog,
  FaSignOutAlt,
  FaChevronDown,
} from 'react-icons/fa';

const menuItems = [
  {
    name: 'User Dashboard',
    icon: <FaChartBar />,
    route: '/dashboard',
  },
  {
    name: 'Products',
    icon: <FaCamera />,
    submenu: [
      { label: 'Overview/Add Products', route: '/products/overview' },
      { label: 'Product Attributes', route: '/products/attributes' },
      { label: 'User Defined Products Attributes', route: '/products/user-attributes' },
    ],
  },
  {
    name: 'Product Orders',
    icon: <FaShoppingCart />,
    submenu: [
      { label: 'Pending Orders', route: '/orders/pending' },
      { label: 'Completed Orders', route: '/orders/completed' },
      { label: 'Payment Info', route: '/orders/payments' },
    ],
  },
  {
    name: 'Reports',
    icon: <FaFileAlt />,
    submenu: [
      { label: 'User Reports', route: '/reports/users' },
      { label: 'Orders Report', route: '/reports/orders' },
      { label: 'Event Detection Report', route: '/reports/events' },
    ],
  },
  {
    name: 'Administration',
    icon: <FaUserTie />,
    submenu: [
       { label: 'Subscriptions', route: '/admin/subscriptions' },
      { label: 'Promotions', route: '/admin/promotions' },
      { label: 'Vouchers', route: '/admin/vouchers' },
      { label: 'Permissions', route: '/admin/permissions' },
    ],
  },
  {
    name: 'Settings',
    icon: <FaCog />,
    submenu: [
      { label: 'Manage Users', route: '/settings/users' },
      { label: 'Customer Activity Status', route: '/settings/customers' },
      { label: 'User Access Settings', route: '/settings/access' },
      { label: 'System Settings', route: '/settings/system' },
    ],
  },
  {
    name: 'Logout',
    icon: <FaSignOutAlt />,
    route: '/logout',
  },
];

const Sidebar = ({ isOpen }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = (menuName) => {
    setOpenMenu((prev) => (prev === menuName ? null : menuName));
  };

  const handleMenuClick = (item) => {
    if (item.submenu) {
      toggleMenu(item.name);
    } else if (item.route) {
      navigate(item.route);
    }
  };

  const handleSubmenuClick = (route) => {
    navigate(route);
  };

  return (
    <div
      className={`bg-gray-900 text-white h-screen p-4 transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-16'
      } overflow-y-auto`}
    >
      <ul className="space-y-6 mt-20">
        {menuItems.map((item, idx) => (
          <li key={idx}>
            <div
              className="flex items-center justify-between hover:text-blue-400 cursor-pointer"
              onClick={() => handleMenuClick(item)}
            >
              <div className="flex items-center gap-4">
                <span className="text-lg">{item.icon}</span>
                {isOpen && <span>{item.name}</span>}
              </div>
              {isOpen && item.submenu && (
                <FaChevronDown
                  className={`transition-transform duration-200 text-sm ${
                    openMenu === item.name ? 'rotate-180' : ''
                  }`}
                />
              )}
            </div>

            {/* Submenu */}
            {isOpen && item.submenu && openMenu === item.name && (
              <ul className="ml-6 mt-3 space-y-2 bg-gray-800 p-3 rounded-md text-sm text-gray-200">
                {item.submenu.map((subItem, subIdx) => (
                  <li
                    key={subIdx}
                    className="hover:text-blue-300 cursor-pointer"
                    onClick={() => handleSubmenuClick(subItem.route)}
                  >
                    {subItem.label}
                  </li>
                ))}
              </ul>
            )}
=======
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
>>>>>>> f8c4a87f52c3fe8a95a2f15d4fd4c223c415ec39
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
