import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Sun, Moon } from 'lucide-react';
import { useSidebarStore } from '../lib/store';
import { useThemeStore } from '../lib/themeStore';

const Header = () => {
  const { toggle: toggleSidebar } = useSidebarStore();
  const { theme, toggle: toggleTheme } = useThemeStore();

  return (
    <header className="bg-surface sticky top-0 z-10 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="md:hidden mr-4 text-textPrimary hover:text-primary focus:outline-none"
          >
            <Menu size={24} className="stroke-current" />
          </button>
          <div className="text-2xl font-bold text-textPrimary">Profile Doctor</div>
        </div>
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="text-textSecondary hover:text-primary">Dashboard</Link>
          <Link to="/scans" className="text-textSecondary hover:text-primary">Scans</Link>
          <Link to="/reports" className="text-textSecondary hover:text-primary">Reports</Link>
        </nav>
        <div className="flex items-center">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-textSecondary hover:bg-background"
          >
            {theme === 'light' ? <Sun size={20} className="stroke-current" /> : <Moon size={20} className="stroke-current" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
