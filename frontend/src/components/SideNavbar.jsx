import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavItem = ({ to, children, isActive, isOpen }) => (
  <Link
    to={to}
    className={`
      p-3 rounded-lg transition-all duration-300 flex items-center
      ${isActive ? 'bg-purple-500/30 text-purple-300' : 'hover:bg-purple-500/20 text-gray-300 hover:text-purple-300'}
      ${isOpen ? 'justify-start' : 'justify-center'}
    `}
  >
    <span className={`text-xl ${!isOpen && 'transform scale-125'}`}>
      {isOpen ? children.icon : children.shortIcon}
    </span>
    <span className={`ml-3 font-medium ${!isOpen && 'hidden'}`}>
      {children.text}
    </span>
  </Link>
);

const SideNavbar = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/', icon: '🏠', shortIcon: '🏠', text: 'Home' },
    { path: '/profile', icon: '👤', shortIcon: '👤', text: 'Profile' },
    { path: '/entries', icon: '📖', shortIcon: '📖', text: 'Entry List' },
    { path: '/new-entry', icon: '✏️', shortIcon: '✏️', text: 'New Entry' },
    { path: '/chart', icon: '📊', shortIcon: '📊', text: 'Sentiment Chart' },
  ];

  return (
    <div 
      className={`
        bg-gradient-to-b from-gray-900 to-purple-900
        transition-all duration-300 ease-in-out
        ${isOpen ? 'w-64' : 'w-20'} 
        h-screen flex flex-col
        border-r border-purple-500/20
        overflow-hidden
      `}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="p-4 flex flex-col flex-grow overflow-hidden">
        <h2 className={`
          text-2xl font-bold mb-6 transition-all duration-300
          bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300
          ${isOpen ? 'text-left' : 'text-center'}
        `}>
          {isOpen ? 'EmoScribe' : 'E'}
        </h2>
        
        <nav className="flex flex-col flex-grow overflow-hidden">
          {navItems.map((item) => (
            <NavItem 
              key={item.path} 
              to={item.path} 
              isActive={isActive(item.path)}
              isOpen={isOpen}
            >
              {{
                icon: item.icon,
                shortIcon: item.shortIcon,
                text: item.text
              }}
            </NavItem>
          ))}
        </nav>
      </div>

      <button
        onClick={onLogout}
        className={`
          mt-auto mx-4 mb-4 p-3 rounded-lg
          bg-gradient-to-r from-red-500 to-red-600
          hover:from-red-600 hover:to-red-700
          text-white transition-all duration-300
          flex items-center ${isOpen ? 'justify-start' : 'justify-center'}
        `}
      >
        <span className={`text-xl ${!isOpen && 'transform scale-125'}`}>
          {isOpen ? '🚪' : '🚪'}
        </span>
        <span className={`ml-3 font-medium ${!isOpen && 'hidden'}`}>
          Logout
        </span>
      </button>
    </div>
  );
};

export default SideNavbar;
