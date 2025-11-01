import React from 'react';
import { useSidebarStore } from '../lib/store';
import { Home, Search, Wrench, FileText, Settings } from 'lucide-react';

const Sidebar = () => {
  const { isOpen } = useSidebarStore();

  const handleNavClick = (e) => {
    e.preventDefault();
    console.log(`Sidebar link clicked: ${e.target.textContent}`);
  };

  return (
    <aside
      className={`bg-surface shadow-lg transition-all duration-300 ease-in-out ${
        isOpen ? 'w-64' : 'w-20'
      } hidden md:block`}
    >
      <nav className="mt-8">
        <ul>
          <li className="mb-4">
            <a href="#" onClick={handleNavClick} className="flex items-center p-4 text-textSecondary hover:bg-background hover:text-primary rounded-lg">
              <Home size={24} />
              <span className={`${isOpen ? 'ml-4' : 'hidden'}`}>Home</span>
            </a>
          </li>
          <li className="mb-4">
            <a href="#" onClick={handleNavClick} className="flex items-center p-4 text-textSecondary hover:bg-background hover:text-primary rounded-lg">
              <Search size={24} />
              <span className={`${isOpen ? 'ml-4' : 'hidden'}`}>Scan</span>
            </a>
          </li>
          <li className="mb-4">
            <a href="#" onClick={handleNavClick} className="flex items-center p-4 text-textSecondary hover:bg-background hover:text-primary rounded-lg">
              <Wrench size={24} />
              <span className={`${isOpen ? 'ml-4' : 'hidden'}`}>Repairs</span>
            </a>
          </li>
          <li className="mb-4">
            <a href="#" onClick={handleNavClick} className="flex items-center p-4 text-textSecondary hover:bg-background hover:text-primary rounded-lg">
              <FileText size={24} />
              <span className={`${isOpen ? 'ml-4' : 'hidden'}`}>Reports</span>
            </a>
          </li>
          <li className="mb-4">
            <a href="#" onClick={handleNavClick} className="flex items-center p-4 text-textSecondary hover:bg-background hover:text-primary rounded-lg">
              <Settings size={24} />
              <span className={`${isOpen ? 'ml-4' : 'hidden'}`}>Settings</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
