import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useDarkMode } from '../context/DarkModeContext';
import { useLanguage } from '../context/LanguageContext';


// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Service card component
const ServiceCard = ({ icon, title, description, index }) => {
  const cardRef = useRef(null);
  const { darkMode } = useDarkMode();
  
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
          duration: 0.6,
          delay: index * 0.15,
          ease: "power3.out"
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
        <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-black' : 'text-white'}`}>{title}</h3>
        <p className="text-gray-400 mb-6 flex-grow">{description}</p>
        {/* <button className="self-start text-blue-400 font-medium flex items-center hover:text-green-300 transition-colors duration-300">
          Learn more
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button> */}
      </div>
    </div>
  );
};

const Services = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const { darkMode } = useDarkMode();
  const { isArabic } = useLanguage(); // Use the useLanguage hook to access the language context
  
  // Updated services data
  const services = [
    {
      icon: <i className="fas fa-cloud-upload-alt"></i>, // Icon for SaaS Solutions
      title: isArabic ? "حلول SaaS" : "SaaS Solutions",
      description: isArabic 
        ? "نقوم بتطوير أنظمة SaaS مبتكرة مصممة لتغطية الفجوات التشغيلية الحيوية في بيئات العمل المتعددة."
        : "We are developing innovative proprietary SaaS systems designed to bridge critical operational gaps in diverse work environments."
    },
    {
      icon: <i className="fas fa-shield-alt"></i>, // Icon for Technical and Security Consulting
      title: isArabic ? "الاستشارات التقنية والأمنية" : "Technical and Security Consulting",
      description: isArabic 
        ? "نقدم استشارة تقنية ذكية لتحليل وتحسين بيئة تكنولوجيا المعلومات والتحول الرقمي مع إجراءات أمان صارمة."
        : "We provide expert technical, programming, and security consultations that enable companies to achieve digital transformation and improve operations with rigorous security measures."
    },
    {
      icon: <i className="fas fa-handshake"></i>, // Icon for Building Strategic Partnerships
      title: isArabic ? "بناء الشراكات الاستراتيجية" : "Building Strategic Partnerships",
      description: isArabic 
        ? "نبني علاقات استراتيجية طويلة الأمد مع رواد الأعمال والمستثمرين لفتح آفاق جديدة للابتكار."
        : "We cultivate long-term, strategic relationships with entrepreneurs, investors, and specialized business leaders to unlock new avenues for innovation."
    },
    {
      icon: <i className="fas fa-code"></i>, // Icon for Custom Digital Solutions
      title: isArabic ? "حلول رقمية مخصصة" : "Custom Digital Solutions",
      description: isArabic 
        ? "مع خبرتنا التقنية، نستطيع تصميم حلول رقمية مخصصة لكل منشأة تناسب تحدياتها الفريدة (قريباً)."
        : "While we have not yet implemented custom projects, our technical expertise enables us to design bespoke digital solutions tailored to each organization’s unique challenges (coming soon)."
    },
    {
      icon: <i className="fas fa-robot"></i>, // Icon for AI-Powered Business Solutions
      title: isArabic ? "حلول الذكاء الاصطناعي الموجهة للأعمال" : "AI-Powered Business Solutions",
      description: isArabic 
        ? "волتيف في حلول مصممة لتوفير تلقاوت وتحسين عمليات الأعمال. (قريباً)"
        : "A future wave of solutions designed to further automate and optimize business processes (coming soon)."
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
  }, [isArabic]);
  
  return (
    <div ref={sectionRef} className={`relative ${darkMode ? 'bg-[#F8FAFC]' : 'bg-gray-900'} min-h-screen py-20 overflow-hidden`}>
      {/* Background gradient effect */}
      <div className="services-bg-gradient absolute inset-0 bg-gradient-to-b from-blue-900/10 to-green-900/10 bg-[length:100%_200%] bg-no-repeat"></div>
      
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
            {isArabic ? "خدماتنا" : "Our Services"}
          </h2>
          <p 
            ref={subheadingRef} 
            className="text-lg text-gray-500 max-w-3xl mx-auto"
          >
            {isArabic 
              ? "حلول تقنية متكاملة لأعمال متطورة"
              : "Comprehensive Digital Solutions for Evolving Businesses"
            }
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
    </div>
  );
};

export default Services;