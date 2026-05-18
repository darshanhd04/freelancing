import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import { AuthContext } from '../../context/AuthContext';
import { FiSun, FiMoon, FiShoppingBag } from 'react-icons/fi';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="fixed w-full z-50 bg-white/60 dark:bg-dark-bg/60 backdrop-blur-2xl border-b border-white/20 dark:border-white/[0.05] transition-colors duration-500 shadow-sm dark:shadow-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 flex items-center gap-3 group">
              <span className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary-500 via-indigo-500 to-primary-600 block shadow-[0_0_15px_rgba(139,92,246,0.5)] group-hover:scale-105 transition-transform duration-300"></span>
              Academic Hub.
            </Link>
          </div>
          <div className="hidden md:flex space-x-10">
            <Link to="/marketplace" className="relative text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-semibold transition-colors group py-2">
              Marketplace
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/about" className="relative text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-semibold transition-colors group py-2">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            {user && user.isAdmin && (
              <Link to="/admin" className="relative text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-bold transition-colors group py-2">
                Admin Panel
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400 transition-colors"
            >
              {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-primary-500">
                  <FiShoppingBag size={18} />
                </Link>
                <button onClick={logout} className="text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors uppercase tracking-wider">Logout</button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors">Log in</Link>
                <Link to="/register" className="px-4 py-2 text-sm font-semibold text-white bg-primary-600 rounded-full hover:bg-primary-700 transition-colors shadow-sm hover:shadow-md">Sign up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
