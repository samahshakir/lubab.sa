import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../context/LanguageContext";
import client from "../sanityClient";
import { useDarkMode } from "../context/DarkModeContext";

gsap.registerPlugin(ScrollTrigger);

const Team = () => {
  const { isArabic } = useLanguage();
  const sectionRefs = useRef(null);
  const cardsRef = useRef([]);
  const activeIndexRef = useRef(0);
  const [teamMembers, setTeamMembers] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const { darkMode } = useDarkMode();
  const [isMobile, setIsMobile] = useState(false);
  const touchStartRef = useRef(0);
  const touchEndRef = useRef(0);
  const scrollTriggerRef = useRef(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fetch team members data
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

  // Handle scroll and animation
  // useLayoutEffect(() => {
  //   if (teamMembers.length === 0) return;

  //   let ctx = gsap.context(() => {
  //     const sections = sectionRefs.current;
  //     const cards = cardsRef.current;

  //     // Initial setup for all cards
  //     cards.forEach((card, index) => {
  //       if (index === 0) {
  //         gsap.set(card, {
  //           autoAlpha: 1,
  //           x: 0,
  //           scale: 1,
  //           filter: "blur(0px)",
  //           zIndex: 10,
  //         });
  //       } else if (index === 1) {
  //         gsap.set(card, {
  //           autoAlpha: 0.6,
  //           x: "60%",
  //           scale: 0.9,
  //           filter: "blur(8px)",
  //           zIndex: 5,
  //         });
  //       } else {
  //         gsap.set(card, {
  //           autoAlpha: 0,
  //           x: "100%",
  //           scale: 0.9,
  //           filter: "blur(8px)",
  //           zIndex: 1,
  //         });
  //       }
  //     });
      
  //     // Only setup ScrollTrigger for non-mobile
  //     if (!isMobile) {
  //       scrollTriggerRef.current = ScrollTrigger.create({
  //         id: "team-scroll",
  //         trigger: sections,
  //         start: "top top",
  //         end: `+=${window.innerHeight * (teamMembers.length - 0.5)}`,
  //         scrub: 1,
  //         pin: false,
  //         onUpdate: (self) => {
  //           const newIndex = Math.min(
  //             Math.floor(self.progress * teamMembers.length),
  //             teamMembers.length - 1
  //           );
  //           if (newIndex !== activeIndexRef.current) {
  //             navigateToMember(newIndex);
  //           }
  //         },
  //       });
  //     }

  //     ScrollTrigger.refresh();
  //   }, sectionRefs);

  //   return () => {
  //     ctx.revert();
  //     if (scrollTriggerRef.current) {
  //       scrollTriggerRef.current.kill();
  //     }
  //   };
  // }, [teamMembers, isMobile]);

  useEffect(() => {
    if (isMobile || !cardsRef.current.length) return;
  
    const handleWheel = (e) => {
      const currentIndex = activeIndexRef.current;
  
      if (e.deltaY > 0) {
        // Scroll down
        if (currentIndex < teamMembers.length - 1) {
          e.preventDefault(); // Only prevent when not at last member
          navigateToMember(currentIndex + 1);
        }
      } else if (e.deltaY < 0) {
        // Scroll up
        if (currentIndex > 0) {
          e.preventDefault(); // Only prevent when not at first member
          navigateToMember(currentIndex - 1);
        }
      }
    };
  
    const cards = cardsRef.current;
  
    cards.forEach((card) => {
      const onEnter = () => card.addEventListener("wheel", handleWheel, { passive: false });
      const onLeave = () => card.removeEventListener("wheel", handleWheel);
  
      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);
  
      card._onEnter = onEnter;
      card._onLeave = onLeave;
    });
  
    return () => {
      cards.forEach((card) => {
        card.removeEventListener("mouseenter", card._onEnter);
        card.removeEventListener("mouseleave", card._onLeave);
        card.removeEventListener("wheel", handleWheel);
      });
    };
  }, [isMobile, teamMembers]);
  
  

  // Navigate to specific team member
  const navigateToMember = (index) => {
    if (index < 0 || index >= teamMembers.length || index === activeIndexRef.current) return;

    const cards = cardsRef.current;
    
    // Current card moves left
    gsap.to(cards[activeIndexRef.current], {
      autoAlpha: 0.6,
      x: index > activeIndexRef.current ? "-60%" : "60%",
      scale: 0.9,
      filter: "blur(4px)",
      zIndex: 5,
      duration: 0.7,
    });
    
    // New card becomes active
    gsap.to(cards[index], {
      autoAlpha: 1,
      x: 0,
      scale: 1,
      filter: "blur(0px)",
      zIndex: 10,
      duration: 0.7,
    });

    // Setup next card if available
    if (cards[index + 1]) {
      gsap.to(cards[index + 1], {
        autoAlpha: 0.6,
        x: "60%",
        scale: 0.9,
        filter: "blur(4px)",
        zIndex: 5,
        duration: 0.7,
      });
    }
    
    // Setup previous card if available
    if (cards[index - 1]) {
      gsap.to(cards[index - 1], {
        autoAlpha: 0.6,
        x: "-60%",
        scale: 0.9,
        filter: "blur(4px)",
        zIndex: 5,
        duration: 0.7,
      });
    }

    activeIndexRef.current = index;
    setActiveIndex(index);
  };

  // Touch handlers for swipe functionality
  const handleTouchStart = (e) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartRef.current - touchEndRef.current > 75) {
      // Swipe left - next card
      navigateToMember(Math.min(activeIndex + 1, teamMembers.length - 1));
    } else if (touchEndRef.current - touchStartRef.current > 75) {
      // Swipe right - previous card
      navigateToMember(Math.max(activeIndex - 1, 0));
    }
  };

  // Click handler for dots
  const handleDotClick = (index) => {
    navigateToMember(index);
    
    // If on desktop with ScrollTrigger active, sync the scroll position
    if (!isMobile && scrollTriggerRef.current) {
      const progress = index / (teamMembers.length - 1);
      scrollTriggerRef.current.scroll(
        scrollTriggerRef.current.start + 
        (scrollTriggerRef.current.end - scrollTriggerRef.current.start) * progress
      );
    }
  };

  return (
    <div
      ref={sectionRefs}
      className={`team-section min-h-screen w-full ${
        darkMode ? "bg-light-gray" : "bg-dark-mode"
      } flex items-center justify-center overflow-hidden ${
        isArabic ? "rtl" : "ltr"
      }`}
    >
      <div className="container mx-auto px-8 relative">
        <h2
          className={`text-4xl md:text-6xl font-bold ${
            darkMode ? "text-dark-gray" : "text-light-gray"
          } mt-15 text-center`}
        >
          {isArabic ? "فريقنا" : "Our Team"}
        </h2>
        <p className="text-sm md:text-xl text-primary-green max-w-3xl mx-auto text-center">
          {isArabic ? "قيادة ترتقي بمستقبل التقنية ونخبة من الخبراء " : "Leadership shaping the future of technology, backed by expert talent."}
        </p>

        <div 
          className="relative h-[600px] w-[80%] mx-auto touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {teamMembers.map((member, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              className="absolute inset-0 transition-all duration-700 ease-out"
              style={{ perspective: "1000px" }}
            >
              {member.imageUrl ? (
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 md:pt-35 lg:pt-10">
                  <div className="w-full md:w-5/12">
                    <div className="relative overflow-hidden rounded-lg shadow-2xl aspect-[3/4] max-w-[380px] mx-auto">
                      <img
                        src={member.imageUrl}
                        alt={member.name[isArabic ? "ar" : "en"]}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    </div>
                  </div>

                  <div
                    className={`w-full md:w-1/2 ${
                      darkMode ? "text-dark-gray" : "text-light-gray"
                    }`}
                  >
                    <h3 className="text-3xl md:text-5xl font-bold mb-3">
                      {member.name[isArabic ? "ar" : "en"]}
                    </h3>
                    <h4 className="text-xl md:text-2xl text-black mb-6">
                      {member.role[isArabic ? "ar" : "en"]}
                    </h4>
                    <p className="text-lg leading-relaxed">
                      {member.bio[isArabic ? "ar" : "en"]}
                    </p>
                  </div>
                </div>
              ) : (
                // Special layout for "The Team" without an image
                <div className="flex flex-col items-center justify-center h-full text-center max-w-xl mx-auto">
                  <div className="bg-dark-gray/5 p-8 md:p-12 rounded-xl shadow-lg">
                    <h3
                      className={`text-xl md:text-3xl font-bold mb-2 ${
                        darkMode ? "text-dark-gray" : "text-light-gray"
                      }`}
                    >
                      {member.name[isArabic ? "ar" : "en"]}
                    </h3>
                    <h4 className="text-md md:text-2xl text-gray-400 mb-2">
                      {member.role[isArabic ? "ar" : "en"]}
                    </h4>
                    <p
                      className={`text-sm md:text-xl leading-relaxed ${
                        darkMode ? "text-dark-gray" : "text-gray-400"
                      }`}
                    >
                      {member.bio[isArabic ? "ar" : "en"]}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Interactive dots for navigation */}
        <div className="flex justify-center mt-12">
          {teamMembers.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 mx-2 rounded-full transition-all duration-300 ${
                index === activeIndex 
                ? "bg-white scale-125" 
                : "bg-gray-600 hover:bg-gray-400"
              }`}
              aria-label={`Go to team member ${index + 1}`}
            />
          ))}
        </div>

        {/* Mobile navigation indicators (only visible on mobile) */}
        {isMobile && teamMembers.length > 0 && (
          <div className="md:hidden flex justify-between items-center w-full max-w-md mx-auto mt-8 px-4">
            <div className="text-gray-400 text-sm">
              {isArabic ? "اسحب للتنقل" : "Swipe to navigate"}
            </div>
            <div className="text-gray-400 text-sm">
              {activeIndex + 1}/{teamMembers.length}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Team;