import React from 'react';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Experience = () => {
  const experiences = [
    {
      type: "HighSchool",
      title: "HighSchool",
      company: "SMAN 13 Jakarta",
      period: "2020 - 2023",
      description: "Completed general education with a focus on mathematics and science fundamentals. Developed foundational problem-solving skills."
    },
    {
      type: "event",
      title: "Coordinated Seroja Cup",
      company: "SMAN 13 Jakarta",
      period: "2022",
      description: "Annual school arts and sports festival (100+ participants). Managed event logistics, team collaboration, and promotional strategies, developing leadership and organizational skills."
    },
    {
      type: "college",
      title: "Information Management",
      company: "Astra Polytechnic",
      period: "2023 - 2026",
      description: "Currently pursuing a degree in Information Management with coursework focusing on web development, database systems, and software engineering principles."
    },
    {
      type: "leadership",
      title: "Vice Chairman of Student Association",
      company: "Astra Polytechnic",
      period: "2024 - 2025",
      description: "Assisted in managing student association activities and events. Helped coordinate between student members and faculty, while supporting daily organizational operations."
    }
  ];

  return (
    <section id="experience" className="py-20 px-6 bg-gradient-to-br from-purple-900 to-blue-900">
      <div className="container mx-auto">
        <motion.h2 
          className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Experience & Education
        </motion.h2>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 h-full w-0.5 bg-cyan-400/30 transform -translate-x-1/2"></div>
          
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ 
                opacity: 0, 
                x: index % 2 === 0 ? 50 : -50 
              }}
              whileInView={{ 
                opacity: 1, 
                x: 0,
                transition: { duration: 0.5, delay: index * 0.1 }
              }}
              viewport={{ once: true }}
              className={`relative mb-12 md:w-1/2 ${index % 2 === 0 ? 'md:mr-auto md:pr-16' : 'md:ml-auto md:pl-16'}`}
            >
              {/* Timeline dot */}
              <div className={`absolute top-6 rounded-full w-6 h-6 flex items-center justify-center z-10
                ${exp.type === 'work' ? 'bg-cyan-400' : 'bg-purple-400'} 
                ${index % 2 === 0 ? 'md:right-0 md:transform md:translate-x-1/2' : 'md:left-0 md:transform md:-translate-x-1/2'}`}
              >
                {exp.type === 'work' ? (
                  <FaBriefcase className="text-white text-xs" />
                ) : (
                  <FaGraduationCap className="text-white text-xs" />
                )}
              </div>
              
              <motion.div 
                whileHover={{ y: -5 }}
                className={`bg-white/5 p-6 rounded-lg border ${exp.type === 'work' ? 'border-cyan-400/30' : 'border-purple-400/30'} hover:shadow-lg hover:shadow-cyan-500/10 transition-all backdrop-blur-sm`}
              >
                <h3 className="text-xl font-semibold mb-1 text-white">{exp.title}</h3>
                <p className="text-cyan-300 font-medium mb-2">{exp.company}</p>
                <p className="text-cyan-200 text-sm mb-3">{exp.period}</p>
                <p className="text-cyan-100">{exp.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;