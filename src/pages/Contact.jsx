import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Spline from '@splinetool/react-spline';
import { useDarkMode } from '../context/DarkModeContext';


// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const inputRefs = useRef([]);
  const buttonRef = useRef(null);
  const containerRef = useRef(null);
  const formAnimationRef = useRef(null);
  const { darkMode } = useDarkMode();

  // Set up ScrollTrigger for fade in/out animations
  useEffect(() => {
    // Initial setup - hide all elements
    gsap.set([headingRef.current, textRef.current, formRef.current, ...inputRefs.current, buttonRef.current], { 
      opacity: 0 
    });
    
    // Create ScrollTrigger for controlling animations
    const scrollTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 25%", // Start when the top of the section hits 25% from the top (3/4 down the screen)
      end: "bottom 25%", // End when bottom of the section hits 25% from the top
      onEnter: () => playFormAnimation(),
      onLeave: () => reverseFormAnimation(),
      onEnterBack: () => playFormAnimation(),
      onLeaveBack: () => reverseFormAnimation(),
      markers: false // Set to true for debugging
    });
    
    return () => {
      // Clean up
      if (scrollTrigger) scrollTrigger.kill();
      if (formAnimationRef.current) formAnimationRef.current.kill();
    };
  }, []);
  
  // Create the animation timeline
  const createFormAnimation = () => {
    const tl = gsap.timeline({ paused: true });
    
    tl.to(headingRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    })
    .to(textRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.9")
    .to(formRef.current, {
      x: 0,
      opacity: 1,
      duration: 1.1,
      ease: "power2.out"
    }, "-=0.9")
    .to(inputRefs.current, {
      opacity: 1,
      x: 0,
      stagger: 0.15,
      duration: 0.4,
      ease: "power1.out"
    }, "-=0.8")
    .to(buttonRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: "back.out(1.7)"
    }, "-=0.4");
    
    formAnimationRef.current = tl;
    return tl;
  };
  
  // Play the animation
  const playFormAnimation = () => {
    // Reset positions for new animation
    gsap.set(headingRef.current, { opacity: 0, y: 30 });
    gsap.set(textRef.current, { opacity: 0, y: 30 });
    gsap.set(formRef.current, { opacity: 0, x: -50 });
    gsap.set(inputRefs.current, { opacity: 0, x: -20 });
    gsap.set(buttonRef.current, { opacity: 0, scale: 0.8 });
    
    if (!formAnimationRef.current) {
      formAnimationRef.current = createFormAnimation();
    }
    formAnimationRef.current.play();
  };
  
  // Reverse the animation
  const reverseFormAnimation = () => {
    if (formAnimationRef.current) {
      formAnimationRef.current.reverse();
    }
  };

  // Set up button hover effects
  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.addEventListener('mouseenter', () => {
        gsap.to(buttonRef.current, {
          scale: 1.05,
          duration: 0.2
        });
      });
      
      buttonRef.current.addEventListener('mouseleave', () => {
        gsap.to(buttonRef.current, {
          scale: 1,
          duration: 0.2
        });
      });
    }
    
    return () => {
      if (buttonRef.current) {
        buttonRef.current.removeEventListener('mouseenter', () => {});
        buttonRef.current.removeEventListener('mouseleave', () => {});
      }
    };
  }, []);

  // Function to add input elements to refs array
  const addToInputRefs = (el) => {
    if (el && !inputRefs.current.includes(el)) {
      inputRefs.current.push(el);
    }
  };

  return (
    <div ref={sectionRef} className={`relative min-h-screen ${darkMode ? 'bg-[rgb(230,230,230)]' : 'bg-gray-900'}`}>
      {/* Spline background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Spline scene="https://prod.spline.design/a46aE4kXx5xLK7Xo/scene.splinecode" />
      </div>
      
      {/* Content */}
      <section className="relative z-10 min-h-screen flex items-start justify-start pt-32 pb-20">
        <div ref={containerRef} className="container mx-auto px-6">
          <div className="text-left mb-16 ml-8">
            <h2 
              ref={headingRef} 
              className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r 
              from-blue-500 to-blue-600"
              style={{ opacity: 0, transform: 'translateY(30px)' }}
            >
              Get in Touch
            </h2>
            <p 
              ref={textRef} 
              className={`text-lg md:text-xl ${darkMode ? 'text-gray-800' : 'text-white'} max-w-3xl`}
              style={{ opacity: 0, transform: 'translateY(30px)' }}
            >
              Ready to transform your digital presence? Contact us today to start your journey.
            </p>
          </div>
          
          {/* Contact Form */}
          <div 
            ref={formRef} 
            className="max-w-2xl ml-8 shadow-gray-600"
            style={{ opacity: 0, transform: 'translateX(-50px)' }}
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
                  className={`w-full py-3 px-6 rounded-xl font-medium text-lg transition-all duration-300
                    ${darkMode ? 'text-blue-600 bg-white shadow-md hover:shadow-inner' : 'text-blue-400 bg-[#030b13] dark:shadow-[3px_3px_6px_#16181c,-3px_-3px_6px_#2a2e34]'}`}
                  style={{ opacity: 1, transform: 'scale(1)' }}
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