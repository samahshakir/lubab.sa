import React, { useEffect, useRef, useState,useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../context/LanguageContext";
import client  from "../sanityClient"; 
import { DarkModeProvider, useDarkMode } from "../context/DarkModeContext";

gsap.registerPlugin(ScrollTrigger);

const Team = () => {
  const { isArabic } = useLanguage();
  const sectionRefs = useRef(null);
  const cardsRef = useRef([]);
  const activeIndexRef = useRef(0);
  const [teamMembers, setTeamMembers] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    client
      .fetch(
        `*[_type == "teamMember"]{
          name, role, bio, "imageUrl": image.asset->url
        }`
      )
      .then((data) => setTeamMembers(data))
      .catch(console.error);
  }, []);

  useLayoutEffect(() => {
    if (teamMembers.length === 0) return;
    
    let ctx = gsap.context(() => {
      const sections = sectionRefs.current;
      const cards = cardsRef.current;
  
      gsap.set(cards[0], { autoAlpha: 1, x: 0, scale: 1, filter: "blur(0px)", zIndex: 10 });
  
      if (cards[1]) {
        gsap.set(cards[1], { autoAlpha: 0.6, x: "60%", scale: 0.9, filter: "blur(8px)", zIndex: 5 });
      }
  
      gsap.set(cards.slice(2), { autoAlpha: 0, x: "100%", scale: 0.9, filter: "blur(8px)", zIndex: 1 });
  
      ScrollTrigger.create({
        id: "team-scroll",
        trigger: sections,
        pin: true,
        start: "top top",
        end: `+=${window.innerHeight * (teamMembers.length - 0.5)}`,
        scrub: 1,
        onUpdate: (self) => {
          const newIndex = Math.min(Math.floor(self.progress * teamMembers.length), teamMembers.length - 1);
          if (newIndex !== activeIndexRef.current) {
            gsap.to(cards[activeIndexRef.current], { autoAlpha: 0.6, x: "-60%", scale: 0.9, filter: "blur(4px)", zIndex: 5, duration: 0.7 });
            gsap.to(cards[newIndex], { autoAlpha: 1, x: 0, scale: 1, filter: "blur(0px)", zIndex: 10, duration: 0.7 });
  
            if (cards[newIndex + 1]) {
              gsap.to(cards[newIndex + 1], { autoAlpha: 0.6, x: "60%", scale: 0.9, filter: "blur(4px)", zIndex: 5, duration: 0.7 });
            }
  
            activeIndexRef.current = newIndex;
            setActiveIndex(newIndex);
          }
        }
      });
  
      ScrollTrigger.refresh();
    }, sectionRefs);
  
    return () => ctx.revert();
  }, [teamMembers]);
  
  return (
    <div
      ref={sectionRefs}
      className={`team-section min-h-screen w-full ${ darkMode ? 'bg-light-gray' : 'bg-dark-mode'} flex items-center justify-center overflow-hidden ${
        isArabic ? "rtl" : "ltr"
      }`}
    >
      <div className="container mx-auto px-8 relative">
        <h2 className={`text-4xl md:text-6xl font-bold ${darkMode ? 'text-dark-gray' : 'text-light-gray'} mt-3 mb-16 text-center`}>
          {isArabic ? "فريقنا" : "Our Team"}
        </h2>

        <div className="relative h-[600px] w-[80%] mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="absolute inset-0 transition-all duration-700 ease-out"
              style={{ perspective: "1000px" }}
            >
              {member.imageUrl ? (
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                  <div className="w-full md:w-5/12">
                    <div className="relative overflow-hidden rounded-lg shadow-2xl aspect-[3/4] max-w-[380px] mx-auto">
                      <img src={member.imageUrl} alt={member.name[isArabic ? "ar" : "en"]} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    </div>
                  </div>

                  <div className={`w-full md:w-1/2 ${darkMode ? 'text-dark-gray' : 'text-light-gray'}`}>
                    <h3 className="text-3xl md:text-5xl font-bold mb-3">
                      {member.name[isArabic ? "ar" : "en"]}
                    </h3>
                    <h4 className="text-xl md:text-2xl font-light text-gray-400 mb-6">
                      {member.role[isArabic ? "ar" : "en"]}
                    </h4>
                    <p className="text-lg leading-relaxed">
                      {member.bio[isArabic ? "ar" : "en"]}
                    </p>
                  </div>
                </div>
              ) : (
                // Special layout for "The Team" without an image
                <div className="flex flex-col items-center justify-center h-full text-center max-w-   xl mx-auto">
                  <div className="bg-dark-gray/5 p-8 md:p-12 rounded-xl shadow-lg">
                    <h3 className={`text-3xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-dark-gray' : 'text-light-gray'}`}>
                      {member.name[isArabic ? "ar" : "en"]}
                    </h3>
                    <p className={`text-xl leading-relaxed ${darkMode ? 'text-dark-gray' : 'text-gray-400'}`}>
                      {member.bio[isArabic ? "ar" : "en"]}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Dots for visual navigation */}
        <div className="flex justify-center mt-12">
          {teamMembers.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 mx-2 rounded-full ${
                index === activeIndex ? "bg-white" : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
