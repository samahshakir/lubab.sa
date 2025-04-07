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
  const scrollTriggerRef = useRef(null);
  const { darkMode } = useDarkMode();
  const {isArabic} = useLanguage();

  const teamMembers = [
  {
    id: 1,
    name: isArabic ? 'خالد سفر آل شلوان' : 'Khalid Safer Al-Shalwan',
    role: isArabic ? 'الرئيس التنفيذي' : 'CEO',
    bio: isArabic
      ? 'يتمتع خالد بخبرة تزيد عن 10 سنوات في قيادة التصميم، حيث يجمع بين الجماليات والوظيفية في كل مشروع.'
      : 'With over 10 years of experience in design leadership, Khalid brings a unique perspective to every project, blending aesthetics with functionality.',
    image:
      'https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    name: isArabic ? 'عبدالوهاب رفدان الشهراني' : 'Abdulwahab Rafdan Al-Shahrani',
    role: isArabic ? 'المدير التنفيذي للتقنية والعمليات' : 'CTO & COO',
    bio: isArabic
      ? 'عبدالوهاب هو مطور برمجيات متكامل يتمتع بشغف للكود النظيف والحلول المبتكرة، وقد شكل عمله توجهنا التقني منذ 2019.'
      : 'Abdulwahab is a full-stack developer with a passion for clean code and innovative solutions. His work has shaped our technical direction since 2019.',
    image:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    name: isArabic ? 'النخبة' : 'The Team',
    role: '',
    bio: isArabic
      ? 'يضم فريق لُباب نخبة من المطورين، المصممين، محللي الأعمال، وخبراء أمن المعلومات. نعمل بروح واحدة ونؤمن بأن التنوع في الخبرات والأفكار هو ما يخلق أفضل الحلول.'
      : "Lubab's workforce includes top-tier developers, designers, business analysts, and cybersecurity specialists. We operate as one unit, believing that diversity in both expertise and ideas creates the best solutions.",
    image: null,
  },
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
    
    // Create a ScrollTrigger
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: section,
      pin: true,
      start: "top top",
      end: `+=${window.innerHeight * (teamMembers.length - 0.5)}`,
      scrub: 1,
      // Important: Add a unique id and specific scope to prevent conflicts
      id: "teamScroll",
      invalidateOnRefresh: true,
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
      // Use the ref to ensure we only kill this component's ScrollTrigger
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`team-section h-screen w-full ${
        darkMode ? 'bg-light-gray' : 'bg-[#2D3F3B]'
      } flex items-center justify-center overflow-hidden border-b border-t`}
      id="team-section"
    >
      <div className="container mx-auto px-8 relative">
        <h2
          className={`text-4xl md:text-6xl font-bold ${
            darkMode ? 'text-dark-gray' : 'text-light-gray'
          } mt-3 text-center`}
        >
          {isArabic ? 'فريقنا' : 'Our Team'}
        </h2>
        <p className="text-sm md:text-md font-bold text-gray-400 mt-2 mb-12 text-center">
          {isArabic
            ? 'القيادة التي تشكل مستقبل التكنولوجيا، مدعومة بالمواهب الخبيرة'
            : 'Leadership shaping the future of technology, backed by expert talent'}
        </p>

        <div className="relative h-[600px] w-full">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`absolute inset-0 transition-all duration-700 ease-out ${
                !member.image ? 'flex items-center justify-center' : ''
              }`}
              style={{ perspective: '1000px' }}
            >
              {member.image ? (
                <div
                  className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
                    isArabic ? 'md:flex-row-reverse text-right' : ''
                  }`}
                >
                  <div className="w-full md:w-5/12 max-w-[220px] sm:max-w-[260px] md:max-w-[320px] mx-auto">
                    <div className="relative overflow-hidden rounded-lg shadow-2xl aspect-[3/4]">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    </div>
                  </div>

                  <div
                    className={`w-full md:w-1/2 ${
                      darkMode ? 'text-dark-gray' : 'text-light-gray'
                    }`}
                  >
                    <h3 className="text-3xl md:text-5xl font-bold mb-3">
                      {member.name}
                    </h3>
                    <h4 className="text-xl md:text-2xl font-light text-gray-400 mb-6">
                      {member.role}
                    </h4>
                    <p className="text-lg leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              ) : (
                // Special layout for "The Team" without an image - centered
                <div className="flex flex-col items-center justify-center h-full text-center max-w-3xl mx-auto">
                  <div className="bg-dark-gray/5 p-8 md:p-12 rounded-xl shadow-lg">
                    <h3
                      className={`text-3xl md:text-5xl font-bold mb-6 ${
                        darkMode ? 'text-dark-gray' : 'text-light-gray'
                      }`}
                    >
                      {member.name}
                    </h3>
                    <p
                      className={`text-xl leading-relaxed ${
                        darkMode ? 'text-dark-gray' : 'text-light-gray'
                      }`}
                    >
                      {member.bio}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-12">
          {teamMembers.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 mx-2 rounded-full ${
                index === activeIndex ? 'bg-white' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;