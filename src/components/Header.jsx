import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full bg-gradient-to-r from-purple-900 to-blue-900 z-50 border-b border-cyan-400/20">
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          {/* Logo with gradient text */}
          <a 
            href="#"
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 hover:from-cyan-300 hover:to-purple-300 transition-colors"
          >
            <span className="text-white">My</span>
            <span className="text-cyan-300">Portofolio</span>
          </a>
          
          {/* Desktop Navigation - Color transition only */}
          <nav className="hidden md:flex space-x-6">
            {['Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-200 hover:text-cyan-300 transition-colors font-medium px-3 py-1 rounded-lg hover:bg-white/10"
              >
                {item}
              </a>
            ))}
          </nav>
          
          {/* Mobile menu button - Simplified */}
          <button 
            className="md:hidden p-2 rounded-full text-cyan-300 hover:bg-white/10 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
        
        {/* Mobile Navigation - Basic dropdown */}
        {isOpen && (
          <nav className="md:hidden pt-4 pb-6 space-y-3">
            {['Skills', 'Projects', 'Experience', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className="block text-gray-200 hover:text-cyan-300 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;