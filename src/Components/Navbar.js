import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const userName = localStorage.getItem('userName'); // Fetch user's name from localStorage

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName'); // Clear user's name
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="p-4 bg-white flex items-center justify-between">
      <button className="text-blue-500" onClick={toggleSidebar}>
        <FaBars size={24} />
      </button>
      <ul className="flex space-x-4 items-center text-black">
        {isLoggedIn ? (
          <>
            <li>
              <span className="text-gray-700 font-medium">
                Welcome, {userName}!
              </span>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Login
              </button>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
