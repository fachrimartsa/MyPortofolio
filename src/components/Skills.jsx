import React, { useRef } from 'react';
import { FaPhp, FaJava, FaReact, FaLaravel } from 'react-icons/fa';
import { SiC, SiSharp, SiJavascript, SiSpring, SiDotnet, SiCodeigniter, SiBootstrap, SiTailwindcss } from 'react-icons/si';
import { motion, useInView } from 'framer-motion';

const Skills = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.5 });

  const languages = [
    { name: 'C Programming', icon: <SiC className="text-cyan-400" size={40} /> },
    { name: 'Java', icon: <FaJava className="text-purple-400" size={40} /> },
    { name: 'C#', icon: <SiSharp className="text-blue-400" size={40} /> },
    { name: 'PHP', icon: <FaPhp className="text-indigo-400" size={40} /> },
    { name: 'JavaScript', icon: <SiJavascript className="text-yellow-300" size={40} /> }
  ];

  const frameworks = [
    { name: 'React.js', icon: <FaReact className="text-cyan-400" size={40} /> },
    { name: 'Spring Boot', icon: <SiSpring className="text-green-400" size={40} /> },
    { name: 'ASP.NET', icon: <SiDotnet className="text-purple-500" size={40} /> },
    { name: 'Laravel', icon: <FaLaravel className="text-red-400" size={40} /> },
    { name: 'CodeIgniter', icon: <SiCodeigniter className="text-orange-400" size={40} /> },
    { name: 'Bootstrap', icon: <SiBootstrap className="text-violet-500" size={40} /> },
    { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-cyan-400" size={40} /> },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="py-20 px-6 bg-gradient-to-br from-purple-900 to-blue-900"
    >
      <div className="container mx-auto">
        <motion.h2 
          className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          Technical Skills
        </motion.h2>
        
        <motion.div 
          className="grid md:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={containerVariants}>
            <motion.h3 
              className="text-2xl font-semibold mb-6 text-cyan-300"
              variants={itemVariants}
            >
              Programming Languages
            </motion.h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {languages.map((lang, index) => (
                <motion.div 
                  key={index} 
                  className="bg-white/5 p-6 rounded-xl border border-cyan-400/20 hover:border-cyan-400/40 shadow-lg hover:shadow-cyan-500/30 transition-all cursor-default backdrop-blur-sm"
                  variants={itemVariants}
                  whileHover={{ 
                    y: -5, 
                    backgroundColor: 'rgba(34, 211, 238, 0.05)',
                    borderColor: 'rgba(34, 211, 238, 0.4)'
                  }}
                >
                  <div className="flex justify-center mb-3">{lang.icon}</div>
                  <h4 className="font-medium text-center text-gray-100">{lang.name}</h4>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div variants={containerVariants}>
            <motion.h3 
              className="text-2xl font-semibold mb-6 text-cyan-300"
              variants={itemVariants}
            >
              Frameworks & Libraries
            </motion.h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {frameworks.map((framework, index) => (
                <motion.div 
                  key={index} 
                  className="bg-white/5 p-6 rounded-xl border border-cyan-400/20 hover:border-cyan-400/40 shadow-lg hover:shadow-cyan-500/30 transition-all cursor-default backdrop-blur-sm"
                  variants={itemVariants}
                  whileHover={{ 
                    y: -5,
                    backgroundColor: 'rgba(34, 211, 238, 0.05)',
                    borderColor: 'rgba(34, 211, 238, 0.4)'
                  }}
                >
                  <div className="flex justify-center mb-3">{framework.icon}</div>
                  <h4 className="font-medium text-center text-gray-100">{framework.name}</h4>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;