import React, { useState } from 'react';
import Sidebar from '../../Components/Sidebar';
import Navbar from '../../Components/Navbar';

const Dashboard = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="flex flex-1">
          {isSidebarOpen && (
            <div>
              <Sidebar />
            </div>
          )}
          <main className="flex-1 p-4 overflow-auto">
            <h1 className="text-3xl font-semibold p-4 text-gray-700">
              Welcome to Admin Panel!
            </h1>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
