import React, { useState } from 'react';
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope, FaPhone } from 'react-icons/fa';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Ganti dengan ID service, template, dan user Anda dari EmailJS
    emailjs.send(
      'service_ffu21dz', // SERVICE ID
      'template_m38l0ok', // TEMPLATE ID
      formData,
      'awPheJV2CasusV7O2' // USER ID
    )
    .then((response) => {
      alert('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    })
    .catch((error) => {
      alert('Failed to send message. Please try again later.');
      console.error('EmailJS Error:', error);
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  return (
    <section id="contact" className="py-20 px-6 bg-gradient-to-br from-purple-900 to-blue-900">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
          Get In Touch
        </h2>
        <p className="text-center text-cyan-100 mb-12 max-w-2xl mx-auto">
          Have a project in mind or want to discuss potential opportunities? Feel free to reach out!
        </p>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-cyan-200 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-cyan-400/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white placeholder-cyan-200/50"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-cyan-200 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-cyan-400/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white placeholder-cyan-200/50"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-cyan-200 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-cyan-400/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white placeholder-cyan-200/50"
                  placeholder="Your message..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-4 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>
          
          <div>
            <div className="bg-white/5 p-8 rounded-xl border border-cyan-400/20 backdrop-blur-sm h-full">
              <h3 className="text-2xl font-semibold mb-6 text-cyan-300">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="p-2 bg-cyan-400/10 rounded-full mr-4">
                    <FaEnvelope className="text-cyan-400" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-cyan-200">Email</h4>
                    <a href="mailto:martsafachri@example.com" className="text-cyan-100 hover:text-white transition">
                      martsafachri@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-2 bg-cyan-400/10 rounded-full mr-4">
                    <FaPhone className="text-cyan-400" size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-cyan-200">Phone</h4>
                    <a href="tel:+6289525428086" className="text-cyan-100 hover:text-white transition">
                      (+62) 8952-5428-086
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h3 className="text-2xl font-semibold mb-6 text-cyan-300">Connect With Me</h3>
                <div className="flex space-x-4">
                  <a 
                    href="https://www.linkedin.com/in/fachri-martsa-126532273/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-cyan-400/10 hover:bg-cyan-400/20 border border-cyan-400/20 hover:border-cyan-400/40 transition-all text-cyan-400 hover:text-white"
                  >
                    <FaLinkedin size={20} />
                  </a>
                  {/* <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-cyan-400/10 hover:bg-cyan-400/20 border border-cyan-400/20 hover:border-cyan-400/40 transition-all text-cyan-400 hover:text-white"
                  >
                    <FaGithub size={20} />
                  </a>
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-cyan-400/10 hover:bg-cyan-400/20 border border-cyan-400/20 hover:border-cyan-400/40 transition-all text-cyan-400 hover:text-white"
                  >
                    <FaTwitter size={20} />
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;