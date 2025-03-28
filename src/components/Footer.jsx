import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-purple-900 to-blue-900 py-12 px-6 border-t border-cyan-400/20">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">
              Fachri Martsa
            </h3>
            <p className="text-cyan-200">Junior Fullstack Developer</p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <p className="text-cyan-200 mb-4 text-center md:text-right">
              &copy; {new Date().getFullYear()} All Rights Reserved
            </p>
            <p className="text-cyan-400/70 text-sm">
              Built with <span className="text-cyan-300">React.js</span> and <span className="text-cyan-300">Tailwind CSS</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;