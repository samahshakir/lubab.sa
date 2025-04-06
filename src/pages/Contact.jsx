import React, { useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { useDarkMode } from '../context/DarkModeContext';

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const inputRefs = useRef([]);
  const buttonRef = useRef(null);
  const containerRef = useRef(null);
  const { darkMode } = useDarkMode();

  // Function to add input elements to refs array
  const addToInputRefs = (el) => {
    if (el && !inputRefs.current.includes(el)) {
      inputRefs.current.push(el);
    }
  };

  return (
    <div ref={sectionRef} className={`relative min-h-screen ${darkMode ? 'bg-[rgb(230,230,230)]' : 'bg-gray-900'}`}>
      {/* Spline background */}
      {/* <div className="absolute inset-0 w-full h-full z-0">
        <Spline className="w-full h-full" scene="https://prod.spline.design/a46aE4kXx5xLK7Xo/scene.splinecode" />
      </div> */}
      
      {/* Content */}
      <section className="relative z-10 min-h-screen flex items-start justify-start pt-32 pb-20">
        <div ref={containerRef} className="container mx-auto px-6">
          <div className="text-left mb-16 ml-8">
            <h2 
              ref={headingRef} 
              className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r 
              from-blue-500 to-blue-600"
            >
              Get in Touch
            </h2>
            <p 
              ref={textRef} 
              className={`text-lg md:text-xl ${darkMode ? 'text-gray-800' : 'text-white'} max-3xl`}
            >
              Let’s build the future together
            </p>
          </div>
          
          {/* Contact Form */}
          <div 
            ref={formRef} 
            className="max-w-2xl ml-8 shadow-gray-600"
          >
            <form className={`space-y-8 p-8 rounded-xl 
              ${darkMode ? 'bg-gray-100 shadow-lg' : 'bg-[#0b1622] dark:shadow-[3px_3px_6px_#16181c,-3px_-3px_6px_#2a2e34]'}`}>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <label htmlFor="name" className={`block text-left text-sm font-medium 
                    ${darkMode ? 'text-gray-700' : 'text-gray-300'} mb-2`}>Name</label>
                  <input 
                    ref={addToInputRefs}
                    type="text" 
                    id="name" 
                    className={`w-full py-3 px-4 rounded-lg border border-gray-300 
                      ${darkMode ? 'bg-white text-gray-800' : 'bg-[#030b13] text-gray-200'}
                      focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300`}
                    placeholder="Your name"
                  />
                </div>
                <div className="group">
                  <label htmlFor="email" className={`block text-left text-sm font-medium 
                    ${darkMode ? 'text-gray-700' : 'text-gray-300'} mb-2`}>Email</label>
                  <input 
                    ref={addToInputRefs}
                    type="email" 
                    id="email" 
                    className={`w-full py-3 px-4 rounded-lg border border-gray-300 
                      ${darkMode ? 'bg-white text-gray-800' : 'bg-[#030b13] text-gray-200'}
                      focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300`}
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div className="group">
                <label htmlFor="subject" className={`block text-left text-sm font-medium 
                  ${darkMode ? 'text-gray-700' : 'text-gray-300'} mb-2`}>Subject</label>
                <input 
                  ref={addToInputRefs}
                  type="text" 
                  id="subject" 
                  className={`w-full py-3 px-4 rounded-lg border border-gray-300 
                    ${darkMode ? 'bg-white text-gray-800' : 'bg-[#030b13] text-gray-200'}
                    focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300`}
                  placeholder="What's this about?"
                />
              </div>
              
              <div className="group">
                <label htmlFor="message" className={`block text-left text-sm font-medium 
                  ${darkMode ? 'text-gray-700' : 'text-gray-300'} mb-2`}>Message</label>
                <textarea 
                  ref={addToInputRefs}
                  id="message" 
                  rows="5" 
                  className={`w-full py-3 px-4 rounded-lg border border-gray-300 
                    ${darkMode ? 'bg-white text-gray-800' : 'bg-[#030b13] text-gray-200'}
                    focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300`}
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>
              
              <div>
                <button 
                  ref={buttonRef}
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-500 to-green-600 text-white font-medium py-3 px-6 rounded-md shadow-lg hover:shadow-pink-500/25 transition-all duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;