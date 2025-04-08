import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDarkMode } from "../context/DarkModeContext";
import { useLanguage } from "../context/LanguageContext";
import sanityClient from "../sanityClient"; // Import your Sanity client

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Service card component
const ServiceCard = ({ icon, title, description, status, index }) => {
  const cardRef = useRef(null);
  const { darkMode } = useDarkMode();
  const cardAnimationRef = useRef(null);

  useEffect(() => {
    gsap.set(cardRef.current, {
      opacity: 0,
      y: 50,
    });

    // Create a unique identifier for this specific card's ScrollTrigger
    cardAnimationRef.current = ScrollTrigger.create({
      trigger: cardRef.current,
      start: "top 80%", // Start animation when top of the card hits 80% of the viewport height
      end: "bottom 20%", // End the animation when the bottom of the card is at 20% of the viewport height
      toggleActions: "play none none reverse", // Play the animation when entering the viewport, reverse it when leaving
      id: `serviceCard-${index}`,
      onEnter: () => {
        gsap.to(cardRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: index * 0.15,
          ease: "power3.out",
        });
      },
      onLeaveBack: () => {
        gsap.to(cardRef.current, {
          opacity: 0,
          y: 50,
          duration: 0.6,
          ease: "power3.out",
        });
      },
    });

    // Cleanup function to kill the ScrollTrigger instance when the component unmounts
    return () => {
      if (cardAnimationRef.current) {
        cardAnimationRef.current.kill();
      }
    };
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl transition-all duration-300 hover:scale-105"
    >
      <div className="flex flex-col h-full">
        <div className="mb-4 text-4xl">
          <i className={icon}></i>
        </div>
        <h3 className={`text-2xl font-bold mb-4 ${darkMode ? "text-black" : "text-white"}`}>
          {title}
        </h3>
        <p className="text-gray-400 mb-6 flex-grow">{description}</p>
        <span className="inline-block text-gray-500 text-md font-semibold">
          {status}
        </span>
      </div>
    </div>
  );
};

const Services = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const { darkMode } = useDarkMode();
  const { isArabic } = useLanguage();
  const [services, setServices] = useState([]);
  const headingAnimationRef = useRef(null);
  const backgroundAnimationRef = useRef(null);

  // Fetch services from Sanity
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "service"] {
          title,
          description,
          icon,
          status
        }`
      )
      .then((data) => setServices(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    // Clean up previous animations if they exist
    if (headingAnimationRef.current) {
      headingAnimationRef.current.kill();
    }
    if (backgroundAnimationRef.current) {
      backgroundAnimationRef.current.kill();
    }

    // Animate the heading and subheading
    gsap.set([headingRef.current, subheadingRef.current], {
      opacity: 0,
      y: 30,
    });

    const tl = gsap.timeline({
      paused: true,
    });

    tl.to(headingRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
    }).to(
      subheadingRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.7"
    );

    // Create the ScrollTrigger with a unique ID
    headingAnimationRef.current = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 70%",
      id: "servicesHeading",
      onEnter: () => tl.play(),
      onLeaveBack: () => tl.reverse(),
    });

    // Add a slight parallax effect to the background with a unique ID
    backgroundAnimationRef.current = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      id: "servicesBackground",
      scrub: true,
      onUpdate: (self) => {
        gsap.set(".services-bg-gradient", {
          backgroundPosition: `0% ${100 * self.progress}%`,
        });
      }
    });
    
    return () => {
      // Ensure proper cleanup
      if (headingAnimationRef.current) {
        headingAnimationRef.current.kill();
      }
      if (backgroundAnimationRef.current) {
        backgroundAnimationRef.current.kill();
      }
    };
  }, [isArabic]);

  return (
    <div
      ref={sectionRef}
      className={`relative ${darkMode ? "bg-[#F8FAFC]" : "bg-dark-mode"} min-h-screen py-20 overflow-hidden`}
      id="services-section" // Add a unique ID
    >
      <div className="services-bg-gradient absolute inset-0 z-0 opacity-20"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2
            ref={headingRef}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent"
          >
            {isArabic ? "خدماتنا" : "Our Services"}
          </h2>
          <p ref={subheadingRef} className="text-lg text-gray-500 max-w-3xl mx-auto">
            {isArabic ? "حلول تقنية متكاملة لأعمال متطورة" : "Comprehensive Digital Solutions for Evolving Businesses"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={isArabic ? service.title?.ar : service.title?.en}
              description={isArabic ? service.description?.ar : service.description?.en}
              status={service.status}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;