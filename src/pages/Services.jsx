import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useDarkMode } from '../context/DarkModeContext';


// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Service card component
const ServiceCard = ({ icon, title, description, index }) => {
  const cardRef = useRef(null);
  
  useEffect(() => {
    gsap.set(cardRef.current, {
      opacity: 0,
      y: 50
    });
    
    ScrollTrigger.create({
      trigger: cardRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.to(cardRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.15,
          ease: "power3.out"
        });
      },
      onLeaveBack: () => {
        gsap.to(cardRef.current, {
          opacity: 0,
          y: 50,
          duration: 0.6,
          ease: "power2.in"
        });
      }
    });
  }, [index]);
  
  return (
    <div 
      ref={cardRef}
      className="bg-white/10 backdrop-filter backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/10 transition-all duration-300 hover:bg-white/15 hover:shadow-blue-500/10 hover:border-green-500/20 hover:transform hover:scale-[1.02]"
    >
      <div className="flex flex-col h-full">
        <div className="mb-6 text-4xl text-gradient bg-gradient-to-r from-blue-400 to-green-400">
          {icon}
        </div>
        <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
        <p className="text-gray-300 mb-6 flex-grow">{description}</p>
        <button className="self-start text-blue-400 font-medium flex items-center hover:text-green-300 transition-colors duration-300">
          Learn more
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const Services = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const { darkMode } = useDarkMode(); 
  
  // Sample services data
  const services = [
    {
      icon: <i className="fas fa-paint-brush"></i>,
      title: "Web Design",
      description: "Modern, responsive websites that captivate your audience. We create visually stunning sites optimized for all devices and screen sizes."
    },
    {
      icon: <i className="fas fa-code"></i>,
      title: "Web Development",
      description: "Custom web applications and robust back-end solutions. We build fast, scalable systems that grow with your business needs."
    },
    {
      icon: <i className="fas fa-bullhorn"></i>,
      title: "Digital Marketing",
      description: "Comprehensive strategies to boost your online presence. From SEO to social media campaigns, we help you reach and engage your target audience."
    },
    {
      icon: <i className="fas fa-chart-line"></i>,
      title: "Growth Strategy",
      description: "Data-driven approaches to scale your business. We analyze market trends and customer behaviors to develop effective growth plans."
    },
    {
      icon: <i className="fas fa-mobile-alt"></i>,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications. We deliver seamless user experiences across iOS and Android platforms."
    },
    {
      icon: <i className="fas fa-server"></i>,
      title: "Cloud Solutions",
      description: "Secure, scalable cloud infrastructure services. We help you migrate, manage, and optimize your business operations in the cloud."
    }
  ];
  
  useEffect(() => {
    // Animate the heading and subheading
    gsap.set([headingRef.current, subheadingRef.current], {
      opacity: 0,
      y: 30
    });
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        onEnter: () => tl.play(),
        onLeaveBack: () => tl.reverse()
      }
    });
    
    tl.to(headingRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    }).to(subheadingRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.7");
    
    // Add a slight parallax effect to the background
    gsap.to(".services-bg-gradient", {
      backgroundPosition: "0% 100%",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  }, []);
  
  return (
    <div ref={sectionRef} className={`relative ${darkMode ? 'bg-[#00BC78CC]' : 'bg-gray-900'} min-h-screen py-20 overflow-hidden`}>
      {/* Background gradient effect */}
      {/* <div className="services-bg-gradient absolute inset-0 bg-gradient-to-b from-blue-900/10 to-green-900/10 bg-[length:100%_200%] bg-no-repeat"></div> */}
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              opacity: Math.random() * 0.5 + 0.1
            }}
          ></div>
        ))}
      </div>
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 
            ref={headingRef} 
            className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500"
          >
            Our Services
          </h2>
          <p 
            ref={subheadingRef} 
            className="text-lg text-gray-300 max-w-3xl mx-auto"
          >
            We provide comprehensive digital solutions tailored to help your business thrive in today's competitive landscape.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              index={index}
            />
          ))}
        </div>
      </div>
      
      {/* Add some decorative elements */}
      <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-blue-600/10 rounded-full filter blur-3xl"></div>
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-green-500/10 rounded-full filter blur-3xl"></div>
      
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(0) translateX(20px); }
          75% { transform: translateY(20px) translateX(10px); }
          100% { transform: translateY(0) translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default Services;