import React from 'react';
import { Link } from 'react-router-dom';
import { useSidebarStore } from '../lib/store';
import { Home, Search, Wrench, FileText, Settings } from 'lucide-react';

const Sidebar = () => {
  const { isOpen } = useSidebarStore();

  return (
    <aside
      className={`bg-surface shadow-lg transition-all duration-300 ease-in-out ${
        isOpen ? 'w-64' : 'w-20'
      } hidden md:block`}
    >
      <nav className="mt-8">
        <ul>
          <li className="mb-4">
            <Link to="/" className="flex items-center p-4 text-textSecondary hover:bg-background hover:text-primary rounded-lg">
              <Home size={24} className="stroke-current" />
              <span className={`${isOpen ? 'ml-4' : 'hidden'}`}>Home</span>
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/scans" className="flex items-center p-4 text-textSecondary hover:bg-background hover:text-primary rounded-lg">
              <Search size={24} className="stroke-current" />
              <span className={`${isOpen ? 'ml-4' : 'hidden'}`}>Scan</span>
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/repairs" className="flex items-center p-4 text-textSecondary hover:bg-background hover:text-primary rounded-lg">
              <Wrench size={24} className="stroke-current" />
              <span className={`${isOpen ? 'ml-4' : 'hidden'}`}>Repairs</span>
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/reports" className="flex items-center p-4 text-textSecondary hover:bg-background hover:text-primary rounded-lg">
              <FileText size={24} className="stroke-current" />
              <span className={`${isOpen ? 'ml-4' : 'hidden'}`}>Reports</span>
            </Link>
          </li>
          <li className="mb-4">
            <Link to="/settings" className="flex items-center p-4 text-textSecondary hover:bg-background hover:text-primary rounded-lg">
              <Settings size={24} className="stroke-current" />
              <span className={`${isOpen ? 'ml-4' : 'hidden'}`}>Settings</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
