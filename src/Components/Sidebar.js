import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 min-h-full bg-gray-700 text-white flex flex-col p-4">
      <ul className="space-y-2">
        <li>
          <Link 
            to="/author" 
            className="block p-2 rounded hover:bg-gray-800 transition duration-200"
          >
            Author
          </Link>
        </li>
        <li>
          <Link 
            to="/category" 
            className="block p-2 rounded hover:bg-gray-800 transition duration-200"
          >
            Category
          </Link>
        </li>
        <li>
          <Link 
            to="/book" 
            className="block p-2 rounded hover:bg-gray-800 transition duration-200"
          >
            Book
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
