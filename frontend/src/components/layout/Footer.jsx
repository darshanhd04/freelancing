import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-[#0a0a0a] border-t border-gray-100 dark:border-white/[0.05] py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0 text-center md:text-left flex flex-col items-center md:items-start">
          <span className="text-xl font-extrabold text-gray-900 dark:text-white flex items-center gap-2 mb-2 tracking-tight">
            <span className="h-4 w-4 rounded-full bg-gradient-to-br from-primary-500 to-indigo-600 block"></span>
            Academic Hub.
          </span>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-light">Premium architectures and digital solutions.</p>
        </div>
        <div className="flex space-x-8 text-sm font-medium text-gray-500 dark:text-gray-400">
          <a href="#" className="hover:text-primary-600 dark:hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-primary-600 dark:hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-primary-600 dark:hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
