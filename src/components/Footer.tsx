import React from 'react';
import { Instagram } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="py-8 bg-white dark:bg-[#151515]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-extrabold tracking-tighter">SCULPT.</h3>
          </div>
          <a
            href="https://www.instagram.com/sculptvisions/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#000000] dark:hover:text-[#FFFFFF] transition-colors"
          >
            <Instagram size={24} />
          </a>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm opacity-75">
          © {new Date().getFullYear()} SCULPT. All rights reserved.
        </div>
      </div>
    </footer>
  );
};