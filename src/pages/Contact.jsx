import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Contact = () => {
  const formRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Set initial opacity to 0 for all animated elements
    gsap.set([headingRef.current, textRef.current, formRef.current], { 
      opacity: 0,
      y: 50 
    });
    
    // Create animation timeline
    const tl = gsap.timeline({
      delay: 0.2 // Small delay to ensure everything is ready
    });
    
    tl.to(headingRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out"
    })
    .to(textRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.4")
    .to(formRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out"
    }, "-=0.6");
    
  }, []);

  return (
    <div>
      <section className="bg-black text-white min-h-screen flex items-center justify-center py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 ref={headingRef} className="text-4xl md:text-5xl font-bold mb-4">
              Get in Touch
            </h2>
            <p ref={textRef} className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              Ready to transform your digital presence? Contact us today to start your journey.
            </p>
          </div>
          
          <div ref={formRef} className="max-w-2xl mx-auto bg-gray-900 p-8 rounded-lg shadow-xl">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-left text-sm font-medium text-gray-300 mb-1">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full bg-gray-800 border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-left text-sm font-medium text-gray-300 mb-1">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full bg-gray-800 border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-left text-sm font-medium text-gray-300 mb-1">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="w-full bg-gray-800 border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="What's this about?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-left text-sm font-medium text-gray-300 mb-1">Message</label>
                <textarea 
                  id="message" 
                  rows="5" 
                  className="w-full bg-gray-800 border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>
              
              <div>
                <button 
                  type="submit" 
                  className="w-full bg-purple-600 hover:bg-purple-700 transition-colors duration-300 text-white font-medium py-3 px-6 rounded-md"
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