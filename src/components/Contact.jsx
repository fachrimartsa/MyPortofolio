import React, { useState, useEffect, useRef } from 'react';
import { FaLinkedin, FaGithub, FaTwitter, FaEnvelope, FaPhone } from 'react-icons/fa';
import emailjs from 'emailjs-com';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';
import Fuse from 'fuse.js'; // Impor Fuse.js

const GEMINI_API_KEY = 'AIzaSyA3LCa7YPUvrf3j-R79lWKCyzyGYBifG7A'; // Ganti dengan API Key Anda yang VALID

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const [userQuestion, setUserQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]); 
  const [isAskingAI, setIsAskingAI] = useState(false);

  const generativeModelRef = useRef(null);
  const fuseRef = useRef(null); 

  useEffect(() => {
    if (!generativeModelRef.current) {
      const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      generativeModelRef.current = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' }); 
    }

    const loadAskData = async () => {
      try {
        const response = await fetch('MyPortofolio/ask.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        const fuseOptions = {
          keys: ['question'], 
          threshold: 0.1,    
          includeScore: true 
        };
        fuseRef.current = new Fuse(data, fuseOptions); 
      } catch (error) {
        console.error('Gagal memuat ask.json atau menginisialisasi Fuse:', error);
      }
    };

    loadAskData();
  }, [])

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

    emailjs.send(
      'service_ffu21dz',
      'template_m38l0ok',
      formData,
      'awPheJV2CasusV7O2'
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

  const handleAskAI = async (e) => {
    e.preventDefault();
    if (!userQuestion.trim()) return;

    setIsAskingAI(true);
    const question = userQuestion.toLowerCase();
    const newUserMessage = { role: 'user', parts: [{ text: question }] };
    
    setChatHistory(prev => [...prev, newUserMessage]);
    setUserQuestion('');

    try {
      let aiResponseContent = '';

      if (fuseRef.current) {
        const results = fuseRef.current.search(newUserMessage.parts[0].text);
        if (results.length > 0 && results[0].score < 0.4) { 
          aiResponseContent = results[0].item.answer;
        }
      }

      if (!aiResponseContent) {
        const model = generativeModelRef.current;
        if (!model) {
          throw new Error('Model AI belum diinisialisasi.');
        }

        const chat = model.startChat({
          history: chatHistory.map(msg => ({
            role: msg.role,
            parts: msg.parts
          })),
          safetySettings: [
            {
              category: HarmCategory.HARM_CATEGORY_HARASSMENT,
              threshold: HarmBlockThreshold.BLOCK_NONE,
            },
            {
              category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
              threshold: HarmBlockThreshold.BLOCK_NONE,
            },
            {
              category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
              threshold: HarmBlockThreshold.BLOCK_NONE,
            },
            {
              category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
              threshold: HarmBlockThreshold.BLOCK_NONE,
            },
          ],
        });

        const result = await chat.sendMessage(userQuestion);
        const response = result.response;
        aiResponseContent = response.text(); 
        console.log('Respons dari Gemini AI:', aiResponseContent);
      }

      // 3. Tampilkan respons (dari ask.json atau Gemini)
      if (aiResponseContent) {
        setChatHistory(prev => [...prev, { role: 'model', parts: [{ text: aiResponseContent }] }]); 
      } else {
        console.warn('AI tidak dapat memberikan respons yang valid.');
        setChatHistory(prev => [...prev, { role: 'model', parts: [{ text: 'Maaf, saya tidak mengerti pertanyaan Anda atau tidak ada informasi yang cocok.' }] }]);
      }
    } catch (error) {
      console.error('Final Error Catch:', error);
      setChatHistory(prev => [...prev, { role: 'model', parts: [{ text: 'Terjadi kesalahan saat berkomunikasi dengan AI. Coba lagi nanti.' }] }]);
    } finally {
      setIsAskingAI(false);
    }
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
        
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="bg-white/5 p-8 rounded-xl border border-cyan-400/20 backdrop-blur-sm h-full flex flex-col">
            <h3 className="text-2xl font-semibold mb-6 text-cyan-300">Ask AI About Me</h3>
            <div className="flex-grow flex flex-col">
              <div className="flex-grow overflow-y-auto max-h-80 pr-2 custom-scrollbar">
                {chatHistory.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`mb-3 p-3 rounded-lg ${
                      msg.role === 'user' 
                        ? 'bg-blue-600/70 text-white self-end ml-auto' 
                        : 'bg-gray-700/70 text-gray-100 self-start mr-auto'
                    }`}
                    style={{ maxWidth: '85%' }}
                  >
                    {msg.parts[0]?.text} 
                  </div>
                ))}
              </div>
              
              <form onSubmit={handleAskAI} className="mt-6 flex gap-2">
                <input
                  type="text"
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  placeholder="Ask me anything about this portfolio..."
                  className="flex-grow px-4 py-3 bg-white/5 border border-cyan-400/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white placeholder-cyan-200/50"
                  disabled={isAskingAI}
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isAskingAI}
                >
                  {isAskingAI ? 'Asking...' : 'Ask'}
                </button>
              </form>
            </div>
          </div>

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
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-4 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
          
          <div className="bg-white/5 p-8 rounded-xl border border-cyan-400/20 backdrop-blur-sm h-full flex flex-col">
            <h3 className="text-2xl font-semibold mb-6 text-cyan-300">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="p-2 bg-cyan-400/10 rounded-full mr-4">
                  <FaEnvelope className="text-cyan-400" size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-cyan-200">Email</h4>
                  <a href="mailto:martsafachri@gmail.com" className="text-cyan-100 hover:text-white transition">
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
            
            <div className="mt-12 flex-grow">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;