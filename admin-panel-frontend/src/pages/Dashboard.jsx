import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import DashboardCards from '../components/DashboardCards';
import EventsTable from '../components/EventsTable';
import OrdersTable from '../components/OrdersTable';

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} />
      
      {/* Main content area */}
      <div className="flex flex-col flex-1 bg-gray-100 min-h-screen">
        <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Dashboard content */}
        <div className="p-6 pt-28 overflow-auto">
          <DashboardCards />
          <EventsTable />
          <OrdersTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
