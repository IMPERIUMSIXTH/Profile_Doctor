import React from 'react';
import { useSidebarStore } from '../lib/store';

const Sidebar = () => {
  const { isOpen } = useSidebarStore();

  return (
    <div
      className={`w-64 bg-gray-800 text-white transition-all duration-300 ease-in-out ${
        isOpen ? 'block' : 'hidden'
      } md:block`}
    >
      <div className="p-4">
        <h2 className="text-2xl font-bold">Menu</h2>
        <ul>
          <li className="p-2">Home</li>
          <li className="p-2">Scan</li>
          <li className="p-2">Repairs</li>
          <li className="p-2">Reports</li>
          <li className="p-2">Settings</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
