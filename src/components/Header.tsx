import React from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed w-full top-0 z-50 bg-[#EAEFFF]/80 dark:bg-[#101010]/80 backdrop-blur-sm">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="text-2xl font-extrabold tracking-tighter">SCULPT.</a>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="hover:text-[#000000] dark:hover:text-[#FFFFFF] transition-colors">Services</a>
            <a href="#projects" className="hover:text-[#000000] dark:hover:text-[#FFFFFF] transition-colors">Projects</a>
            <a href="#testimonials" className="hover:text-[#000000] dark:hover:text-[#FFFFFF] transition-colors">Testimonials</a>
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <a href="#services" className="block hover:text-[#000000] dark:hover:text-[#FFFFFF]">Services</a>
            <a href="#projects" className="block hover:text-[#000000] dark:hover:text-[#FFFFFF]">Projects</a>
            <a href="#testimonials" className="block hover:text-[#000000] dark:hover:text-[#FFFFFF]">Testimonials</a>
          </div>
        )}
      </nav>
    </header>
  );
};