import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-surface shadow-inner">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <p className="text-textSecondary text-sm">
          © 2025 Profile Doctor. All Rights Reserved.
        </p>
        <div className="flex space-x-4">
          <a href="/privacy" className="text-textSecondary hover:text-primary text-sm">
            Privacy Policy
          </a>
          <a href="/terms" className="text-textSecondary hover:text-primary text-sm">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
