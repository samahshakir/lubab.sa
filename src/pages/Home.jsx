import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Contact from './Contact';
import Team from './Team';
import Spline from '@splinetool/react-spline';
import Services from './Services';
import { useLanguage } from '../context/LanguageContext'; 
import { useDarkMode } from '../context/DarkModeContext'; // Import the dark mode hook
import client from "../sanityClient"; 
import Footer from '../components/Footer';
import Career from './Career';

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const imageRef = useRef(null);
  const buttonRef = useRef(null);
  const mainRef = useRef(null);

  const section2Ref = useRef(null);
  const section2TitleRef = useRef(null);
  const section2DescriptionRef = useRef(null);

  const section3Ref = useRef(null);
  const section3TitleRef = useRef(null);
  const section3DescriptionRef = useRef(null);
  const { isArabic } = useLanguage();
  const { darkMode } = useDarkMode(); // Get dark mode state
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    client
      .fetch('*[_type == "heroSection"][0]')
      .then((data) => setHeroData(data))
      .catch(console.error);

    console.log(heroData);
    
    // --- First Section Animations (Hero) ---
    const elements = [titleRef.current, descriptionRef.current, imageRef.current, buttonRef.current];

    const ctx1 = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      gsap.set(elements, { autoAlpha: 0 });
      gsap.set(titleRef.current, { y: 30 });
      gsap.set(descriptionRef.current, { y: 20 });
      gsap.set(buttonRef.current, { y: 15 });
      gsap.set(imageRef.current, { scale: 0.97 });

      tl.to(titleRef.current, { autoAlpha: 1, y: 0, duration: 0.6 })
        .to(descriptionRef.current, { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.3")
        .to(buttonRef.current, { autoAlpha: 1, y: 0, duration: 0.4 }, "-=0.3")
        .to(imageRef.current, { autoAlpha: 1, scale: 1, duration: 0.7 }, "-=0.5");

      gsap.to(imageRef.current, {
        y: 20,
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
          invalidateOnRefresh: true
        }
      });
    }, mainRef);

    // --- Second Section Animations ---
    const ctx2 = gsap.context(() => {
      // Set initial state
      gsap.set([section2TitleRef.current, section2DescriptionRef.current], { 
        autoAlpha: 0, 
        scale: 0.7
      });

      // Create a ScrollTrigger that controls the animation throughout the entire section
      ScrollTrigger.create({
        trigger: section2Ref.current,
        start: "top bottom", // Start when the top of section2 hits the bottom of viewport
        end: "bottom top",   // End when the bottom of section2 hits the top of viewport
        scrub: 1,            // Smooth scrubbing with slight delay
        // markers: true,    // Uncomment for debugging
        onUpdate: (self) => {
          // Calculate progress values
          const progress = self.progress;
          
          // First half of scroll - fade in and scale up
          if (progress <= 0.5) {
            const fadeInProgress = progress * 2; // Normalize to 0-1 range for first half
            gsap.set([section2TitleRef.current, section2DescriptionRef.current], {
              autoAlpha: fadeInProgress,
              scale: 0.7 + (fadeInProgress * 0.5) // Scale from 0.7 to 1.2
            });
          } 
          // Second half of scroll - fade out and continue scaling
          else {
            const fadeOutProgress = (progress - 0.5) * 2; // Normalize to 0-1 range for second half
            gsap.set([section2TitleRef.current, section2DescriptionRef.current], {
              autoAlpha: 1 - fadeOutProgress,
              scale: 1.2 - (fadeOutProgress * 0.5) // Scale down from 1.2 to 0.7
            });
          }
        }
      });
    }, section2Ref);

    const ctx3 = gsap.context(() => {
      const tl3 = gsap.timeline({
        scrollTrigger: {
          trigger: section3Ref.current,
          start: "top bottom", 
          end: "bottom center",
          scrub: 1, // Smoother scrubbing with slight delay
          // markers: true,
        }
      });
    
      // Create background elements for transition effect
      const bgElements = [];
      for (let i = 0; i < 5; i++) {
        const el = document.createElement('div');
        el.className = 'absolute inset-0 transform-gpu';
        el.style.background = 'linear-gradient(135deg, #6366f1, #8b5cf6)';
        el.style.opacity = '0';
        el.style.zIndex = '-1';
        section3Ref.current.appendChild(el);
        bgElements.push(el);
      }
    
      // Set initial states
      gsap.set(section3DescriptionRef.current, { 
        autoAlpha: 0, 
        y: 80,
        scale: 0.8
      });
      
      gsap.set('.section3-word', { 
        autoAlpha: 0, 
        y: 40,
        rotationY: 40
      });
    
      // Background transition effect
      bgElements.forEach((el, i) => {
        tl3.to(el, {
          opacity: 0.7,
          duration: 0.4,
          ease: "power2.inOut"
        }, i * 0.1)
        .to(el, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut"
        }, i * 0.1 + 0.2);
      });
    
      // Text animations
      tl3.to(section3TitleRef.current, {
        autoAlpha: 1,
        y: 0,
        rotationX: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)"
      }, 0.3)
      
      // Animate each word in description separately
      .to('.section3-word', {
        autoAlpha: 1,
        y: 0,
        rotationY: 0,
        stagger: 0.0250,
        duration: 0.8,
        ease: "back.out(2.5)"
      }, 0.5)
      
      // Final fade-in for any remaining description elements
      .to(section3DescriptionRef.current, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        // eslint-disable-next-line no-dupe-keys
        autoAlpha: 1,
        // eslint-disable-next-line no-dupe-keys
        y: 0,
        // eslint-disable-next-line no-dupe-keys
        scale: 1,
        // eslint-disable-next-line no-dupe-keys
        duration: 1,
        ease: "power3.out"
      }, 0.7);
    
      // Add floating animation for continuous movement
      gsap.to(section3TitleRef.current, {
        y: "-=15",
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    
    }, section3Ref);
  
    return () => {
        ctx1.revert();
        ctx2.revert();
        ctx3.revert();
    }
  }, []);
  console.log(heroData)
    
  return (
    <div 
    ref={mainRef} 
    className={`${darkMode ? 'bg-[#00BC78]' : 'bg-gray-900'} text-white min-h-screen overflow-x-hidden transition-colors duration-300 ${isArabic ? 'rtl' : 'ltr'}`}
  >
      <Navbar />
  
      {/* --- First Section (Hero) --- */}
      <main className="container mx-auto px-6 pt-36 pb-20 relative">
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
        style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="white" fill-opacity="1" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="1"/%3E%3Ccircle cx="13" cy="13" r="1"/%3E%3C/g%3E%3C/svg%3E")',
               backgroundSize: '20px 20px'}}></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative">
        {/* Text content with higher z-index to appear above Spline */}
        <div className={`max-w-2xl relative z-20 ${isArabic ? 'text-right' : 'text-left'}`}>
          <h1
            ref={titleRef}
            className={`text-6xl md:text-9xl font-bold mb-4 leading-tight tracking-tight animate-fadeIn ${isArabic ? 'text-right' : 'text-left'}`}
          >
            <p>{isArabic ? heroData?.title?.["ar"] : heroData?.title?.["en"] || "Loading..."}</p>
            <span className={`${darkMode ? 'text-blue-600' : 'text-blue-500'} transition-colors duration-300 animate-gradientShift`}>{isArabic ? heroData?.title2?.["ar"] : heroData?.title2?.["en"] || "Loading..."}</span> {isArabic ? heroData?.title3?.["ar"] : heroData?.title3?.["en"] || "Loading..."}
          </h1>
          <p className={`text-2xl md:text-xl mb-3 font-bold ${darkMode ? 'text-sky-700' : 'text-sky-500'} uppercase transition-colors duration-300 animate-slideIn`}> {isArabic ? heroData?.subTitle?.["ar"] : heroData?.subTitle?.["en"] || "Loading..."} </p>
          <p
            ref={descriptionRef}
            className={`text-lg md:text-xl ${darkMode ? 'text-gray-300' : 'text-gray-200'} mb-5 leading-relaxed transition-colors duration-300 animate-opacityShift ${isArabic ? 'text-right' : 'text-left'}`}
          >
            {isArabic ? heroData?.description?.["ar"] : heroData?.description?.["en"] || "Loading..."}
          </p>
          <div className={`${isArabic ? 'text-right' : 'text-left'}`}>
            <button
              ref={buttonRef}
              className={`${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-[#00BC78] hover:bg-[#00A86C]'} text-white px-8 py-4 rounded-full font-medium transition-colors duration-300 text-lg hover:shadow-glow`}
            >
              {isArabic ? heroData?.buttonText?.["ar"] : heroData?.buttonText?.["en"] || "Loading..."}
            </button>
          </div>
        </div>

        {/* Spline container moved to the right and made bigger */}
        <div className="relative h-full flex justify-center items-center lg:ml-10"> {/* Increased margin to push right */}
          {/* Gradient backgrounds */}
          <div className={`absolute -bottom-10 -right-10 w-96 h-96 ${darkMode ? 'bg-green-500' : 'bg-green-600'} rounded-full opacity-20 blur-3xl transition-colors duration-300`}></div>
          <div className={`absolute -top-10 -left-10 w-72 h-72 ${darkMode ? 'bg-blue-400' : 'bg-blue-500'} rounded-full opacity-15 blur-3xl transition-colors duration-300`}></div>

          {/* Spline scene container with lower z-index, positioned behind the text */}
          <div
            ref={imageRef}
            className="absolute z-0 w-[250%] h-full min-h-[800px] will-change-transform parallax-effect" 
          >
            <Spline 
              scene="https://prod.spline.design/WxkEBWD1AULRdO4M/scene.splinecode"
              onWheel={(e) => {
                if (e.ctrlKey) e.stopPropagation(); // Block zooming (Ctrl + scroll), allow normal scrolling
              }}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      </div>
    </main>

      {/* --- Second Section --- */}
      <section 
        ref={section2Ref} 
        className={`${darkMode ? 'bg-[#00BC78CC]' : 'bg-gray-900'} text-white min-h-screen flex items-center justify-end py-20 transition-colors duration-300`}
      >
         <div className="absolute top-0 left-0 right-0 h-16 overflow-hidden">
    <div className={`h-16 ${darkMode ? 'bg-[#00BC78]' : 'bg-gray-800'}`} 
         style={{
           clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 0)',
           opacity: 0.8
         }}></div>
  </div>

  <div className={`absolute right-0 top-16 bottom-16 w-2 ${darkMode ? 'bg-blue-500' : 'bg-blue-600'}`}></div>
        <div className="container mx-auto px-6 text-right will-change-transform">
          <h2 
            ref={section2TitleRef} 
            className={`text-4xl md:text-5xl font-bold mb-8 mr-15 text-transparent bg-clip-text ${
              darkMode 
                ? 'bg-gradient-to-r from-white to-black' 
                : 'bg-gradient-to-r from-blue-400 to-green-600'
            } transition-colors duration-300`}
          >
            Scroll-Driven Experience
          </h2>
          <p 
            ref={section2DescriptionRef} 
            className={`text-lg md:text-xl ${darkMode ? 'text-gray-100' : 'text-gray-200'} max-w-3xl ml-auto transition-colors duration-300`}
          >
            This text gradually fades in as you scroll, grows in size through the middle of the section, and then fades away as you continue scrolling. The animation is directly tied to your scroll position for a seamless, interactive experience.
          </p>
        </div>
      </section>
  
      <section 
        ref={section3Ref} 
        className={`${darkMode ? 'bg-[#00BC78CC]' : 'bg-[#0D1B2A]'} text-white min-h-screen flex items-center justify-center py-20 relative overflow-hidden transition-colors duration-300`}
      >
    {/* Add floating geometric shapes */}
    <div className="absolute inset-0 pointer-events-none">
    <div className={`absolute top-1/4 left-1/5 w-16 h-16 ${darkMode ? 'border-blue-400' : 'border-blue-500'} border-2 rounded-lg opacity-20 animate-spin-slow`}></div>
    <div className={`absolute bottom-1/3 right-1/4 w-20 h-20 ${darkMode ? 'border-green-400' : 'border-green-500'} border-2 rounded-full opacity-20 animate-float`}></div>
    <div className={`absolute top-1/2 right-1/3 w-12 h-12 ${darkMode ? 'border-purple-400' : 'border-purple-500'} border-2 transform rotate-45 opacity-20 animate-pulse`}></div>
  </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 
            ref={section3TitleRef} 
            className={`text-5xl md:text-6xl font-bold mb-8 text-transparent bg-clip-text ${
              darkMode 
                ? 'bg-gradient-to-r from-blue-400 to-blue-800' 
                : 'bg-gradient-to-r from-green-200 to-green-600'
            } transition-colors duration-300`}
          >
            Experience the Magic
          </h2>
          <p 
            ref={section3DescriptionRef} 
            className="text-lg md:text-4xl text-white max-w-8xl mx-auto"
          >
            {/* Split text into words for individual animation */}
            {"This immersive journey transforms how you interact with content. Each element responds to your scrolling, creating a dynamic and engaging".split(' ').map((word, i) => (
              <span key={i} className="section3-word inline-block mx-1 my-2">{word}</span>
            ))}
          </p>
          
          {/* Add decorative elements with dark mode adjustments */}
          <div className={`absolute top-1/4 left-1/4 w-64 h-64 ${darkMode ? 'bg-purple-400' : 'bg-purple-500'} rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob transition-colors duration-300`}></div>
          <div className={`absolute top-1/3 right-1/4 w-72 h-72 ${darkMode ? 'bg-yellow-400' : 'bg-yellow-500'} rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 transition-colors duration-300`}></div>
          <div className={`absolute bottom-1/4 right-1/3 w-60 h-60 ${darkMode ? 'bg-pink-400' : 'bg-pink-500'} rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 transition-colors duration-300`}></div>
        </div>
      </section>

      <Services/>
      <Team/>
      <Contact/>
      <Footer/>
    </div>
  );
}

export default Home;