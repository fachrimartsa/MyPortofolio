import React, { useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import pms from '../assets/images/pms.png';
import mjl from '../assets/images/MJL.png';

const Projects = () => {
  const allProjects = [
    {
      title: "Payroll Management System",
      description: "Sistem penggajian karyawan dengan fitur lengkap",
      technologies: ["C# Windows Form", "Java FX", "SQL Server"],
      githubLink: "#",
      liveLink: "#",
      image: pms
    },
    {
      title: "Battery Monitoring System",
      description: "Monitoring baterai real-time dengan .NET Core",
      technologies: ["ReactJs","ASP.NET Core", "Laravel", "SQL Server", "MySQL"],
      githubLink: "#",
      liveLink: "#",
      image: pms
    },
    {
      title: "Car AC Service System",
      description: "Manajemen servis AC mobil bengkel",
      technologies: ["ReactJs", "PHP", "Sql Server"],
      githubLink: "#",
      liveLink: "#",
      image: mjl
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const projectsPerPage = 3;

  const visibleProjects = allProjects.slice(currentIndex, currentIndex + projectsPerPage);

  const nextProjects = () => {
    if (currentIndex + projectsPerPage < allProjects.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevProjects = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <section id="projects" className="py-20 px-6 bg-gradient-to-br from-purple-900 to-blue-900">
      <div className="container mx-auto">
        <motion.h2 
          className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Featured Projects
        </motion.h2>
        
        <motion.p 
          className="text-center text-cyan-100 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
        >
          Here are some of my recent projects showcasing my fullstack development capabilities.
        </motion.p>

        <div className="relative">
          {/* Navigation arrows */}
          <button 
            onClick={prevProjects}
            disabled={currentIndex === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full text-cyan-400 hover:text-white transition-all ${currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-100'}`}
          >
            <FaChevronLeft size={24} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-12">
            {visibleProjects.map((project, index) => (
              <motion.div 
                key={`${project.title}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 rounded-xl border border-cyan-400/20 hover:border-cyan-400/40 shadow-lg hover:shadow-cyan-500/20 transition-all backdrop-blur-sm"
              >
                <div className="h-60 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
                  <p className="text-cyan-100 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span 
                        key={i} 
                        className="bg-cyan-400/10 text-cyan-300 text-xs px-3 py-1 rounded-full border border-cyan-400/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <button 
            onClick={nextProjects}
            disabled={currentIndex + projectsPerPage >= allProjects.length}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full text-cyan-400 hover:text-white transition-all ${currentIndex + projectsPerPage >= allProjects.length ? 'opacity-30 cursor-not-allowed' : 'opacity-100'}`}
          >
            <FaChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;