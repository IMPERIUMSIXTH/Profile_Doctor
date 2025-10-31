import React from 'react';
import { useSidebarStore } from '../lib/store';

const Header = () => {
  const { toggle } = useSidebarStore();

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Profile Doctor</h1>
        <div className="md:hidden">
          <button
            onClick={toggle}
            className="text-gray-900 hover:text-gray-700 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
