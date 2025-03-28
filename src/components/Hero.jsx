import React from 'react';
import profile from '../assets/images/profile.jpeg';

const Hero = () => {
  return (
    <section id="home" className="pt-40 pb-28 px-6 bg-gradient-to-br from-purple-900 to-blue-900 min-h-screen flex items-center">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Hi, I'm <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">Fachri Martsa</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-cyan-200">
            Junior Fullstack Developer
          </h2>
          <p className="text-lg mb-8 text-cyan-100 max-w-lg">
            Creating functional web applications using modern frameworks. 
            Focused on writing efficient code and improving through hands-on experience.
          </p> 
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <a 
              href="#contact" 
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-full transition-all shadow-lg hover:shadow-cyan-500/30"
            >
              Contact Me
            </a>
            <a 
              href="#projects" 
              className="border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 px-8 py-3 rounded-full transition-all"
            >
              View Work
            </a>
          </div>
        </div>

        {/* Avatar */}
        <div className="md:w-1/2 flex justify-center relative">
          <div className="relative">
            <div className="w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-cyan-400/20 shadow-2xl">
              {/* Ganti span dengan tag img */}
              <img 
                src={profile} 
                alt="Fachri Martsa"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating tech icons tetap sama */}
            <div className="absolute -top-6 -left-6 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-cyan-400/20">
              <span className="text-2xl">🚀</span>
            </div>
            <div className="absolute -bottom-4 -right-4 w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-purple-400/20">
              <span className="text-xl">💻</span>
            </div>
            <div className="absolute -top-6 -right-16 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-cyan-400/20">
              <span className="text-2xl">🚀</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute bottom-20 left-1/4 w-4 h-4 rounded-full bg-cyan-400/70 blur-sm"></div>
      <div className="absolute top-1/3 right-1/4 w-6 h-6 rounded-full bg-purple-400/50 blur-sm"></div>
    </section>
  );
};

export default Hero;