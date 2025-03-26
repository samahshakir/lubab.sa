import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useDarkMode } from '../context/DarkModeContext';
import { useLanguage } from '../context/LanguageContext';


// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Team = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const { darkMode } = useDarkMode();
  const { isArabic } = useLanguage(); // Use the useLanguage hook to access the language context

  const teamMembers = [
    {
      id: 1,
      name: isArabic ? "خالد سفر آل شلوان" : "Khalid Safar Al-Shalwan",
      role: isArabic ? "الرئيس التنفيذي" : "CEO",
      // bio: isArabic 
      //   ? "قيادة ترتقي بمستقبل التقنية"
      //   : "Leadership that shapes the future",
      image: 'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 2,
      name: isArabic ? "عبدالوهاب رفدان الشهراني" : "Abdulwahab Rafdan Al-Shahrani",
      role: isArabic ? "المدير التنفيذي للتقنية والعمليات" : "CTO & COO",
      // bio: isArabic 
      //   ? "قيادة ترتقي بمستقبل التقنية"
      //   : "Leadership that shapes the future",
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 3,
      name: isArabic ? "المطورين والمهندسين" : "Developers & Engineers",
      role: isArabic ? "المطورين، محللي الأنظمة، وأخصائيي تصميم UX/UI وأمن المعلومات" : "Developers, System Analysts, UX/UI Designers, and Cybersecurity Consultants",
      bio: isArabic 
        ? "مجموعة من الخبراء الذين يضمنون استثنائية في كل مشروع"
        : "A team of elite specialists who drive excellence in every project",
   
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    
    // Initial setup
    // Current card (center, fully visible)
    gsap.set(cards[0], { 
      autoAlpha: 1, 
      x: 0, 
      scale: 1,
      filter: "blur(0px)",
      zIndex: 10 
    });
    
    // Next card (right, blurred)
    if (cards[1]) {
      gsap.set(cards[1], { 
        autoAlpha: 0.6, 
        x: '60%', 
        scale: 0.9,
        filter: "blur(4px)",
        zIndex: 5 
      });
    }
    
    // Set all other cards invisible
    gsap.set(cards.slice(2), { 
      autoAlpha: 0, 
      x: '100%', 
      scale: 0.9,
      filter: "blur(4px)",
      zIndex: 1 
    });
    
    ScrollTrigger.create({
      trigger: section,
      pin: true,
      start: "top top",
      end: `+=${window.innerHeight * (teamMembers.length - 0.5)}`,
      scrub: 1,
      onUpdate: (self) => {
        // Calculate which team member should be active based on scroll progress
        const newIndex = Math.min(
          Math.floor(self.progress * teamMembers.length),
          teamMembers.length - 1
        );
        
        if (newIndex !== activeIndexRef.current) {
          // Previous active card moves to left (blurred)
          gsap.to(cards[activeIndexRef.current], {
            autoAlpha: 0.6,
            x: '-60%',
            scale: 0.9,
            filter: "blur(4px)",
            zIndex: 5,
            duration: 0.7,
          });
          
          // New active card comes to center
          gsap.to(cards[newIndex], {
            autoAlpha: 1,
            x: 0,
            scale: 1,
            filter: "blur(0px)",
            zIndex: 10,
            duration: 0.7,
          });
          
          // Setup next card if available
          if (cards[newIndex + 1]) {
            gsap.to(cards[newIndex + 1], {
              autoAlpha: 0.6,
              x: '60%',
              scale: 0.9,
              filter: "blur(4px)",
              zIndex: 5,
              duration: 0.7,
            });
          }
          
          // Hide previous cards that are not adjacent
          if (activeIndexRef.current < newIndex - 1) {
            gsap.to(cards[activeIndexRef.current], {
              autoAlpha: 0,
              x: '-100%',
              duration: 0.5,
            });
          }
          
          // Hide next cards that are not adjacent
          if (newIndex + 2 < cards.length) {
            gsap.to(cards.slice(newIndex + 2), {
              autoAlpha: 0,
              x: '100%',
              duration: 0.5,
            });
          }
          
          activeIndexRef.current = newIndex;
          setActiveIndex(newIndex);
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isArabic]);

  return (
    <div
      ref={sectionRef}
      className={`${
        darkMode ? "bg-[#F8FAFC]" : "bg-gray-900"
      } team-section h-screen w-full flex items-center justify-center overflow-hidden`}
    >
      <div className="container mx-auto px-8 relative">
        <h2
          className={`${
            darkMode ? "text-[#101828]" : "text-white"
          } text-4xl md:text-6xl font-bold mt-5 mb-5 text-center`}
        >
          {isArabic ? "فريق العمل" : "Our Team"}
        </h2>
        <p className="text-gray-400 mb-14 flex-grow text-center">
          {isArabic
            ? "قيادة ترتقي بمستقبل التقنية ونخبة من الخبراء"
            : "Leadership shaping the future of technology, backed by expert talent"}
        </p>
        <div className="relative h-[600px] w-full">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="absolute inset-0 transition-all duration-700 ease-out"
              style={{ perspective: "1000px" }}
            >
              <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">
                {/* Image or Fallback Text Section */}
                <div className="w-full md:w-5/12">
                  {member.image ? (
                    <div className="relative overflow-hidden rounded-lg shadow-2xl aspect-[3/4] max-w-[380px] mx-auto">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-full h-[300px] md:h-[450px] bg-gray-700 text-white text-2xl font-semibold rounded-lg shadow-2xl">
                      {member.name}
                    </div>
                  )}
                </div>

                {/* Text Section */}
                <div
                  className={`w-full md:w-5/12 max-w-[500px] ${
                    darkMode ? "text-[#101828]" : "text-white"
                  }`}
                >
                  <h3
                    className={`text-3xl md:text-5xl font-bold mb-3 ${
                      darkMode ? "text-[#101828]" : "text-white"
                    }`}
                  >
                    {member.name}
                  </h3>
                  <h4
                    className={`text-xl md:text-2xl font-light ${
                      darkMode ? "text-[#374151]" : "text-gray-400"
                    } mb-6`}
                  >
                    {member.role}
                  </h4>
                  <p
                    className={`text-lg leading-relaxed ${
                      darkMode ? "text-[#374151]" : "text-gray-300"
                    }`}
                  >
                    {member.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Indicator Dots */}
        <div className="flex justify-center mt-12">
          {teamMembers.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 mx-2 rounded-full ${
                index === activeIndex ? "bg-black" : "bg-secondary-dark-gray"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;