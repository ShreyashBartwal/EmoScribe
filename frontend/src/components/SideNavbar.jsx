import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SideNavbar = ({ onLogout }) => {
  const location = useLocation(); // Get the current location

  // Function to check if the link is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg-gray-800 text-white w-64 h-screen p-4 flex flex-col">
      <h2 className="text-xl font-semibold mb-6">Navigation</h2>
      <nav className="flex flex-col space-y-4">
        <Link
          to="/"
          className={`p-2 rounded transition ${isActive('/') ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
        >
          Home
        </Link>
        <Link 
          to="/profile" 
          className={`p-2 rounded transition ${isActive('/profile') ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
        >
          Profile
        </Link>
        <Link
          to="/entries"
          className={`p-2 rounded transition ${isActive('/entries') ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
        >
          Entry List
        </Link>
        <Link
          to="/new-entry"
          className={`p-2 rounded transition ${isActive('/new-entry') ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
        >
          New Entry
        </Link>
        <Link
          to="/chart"
          className={`p-2 rounded transition ${isActive('/chart') ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
        >
          Sentiment Chart
        </Link>
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-700 p-2 rounded transition mt-auto"
        >
          Logout
        </button>
      </nav>
    </div>
  );
};

export default SideNavbar;
