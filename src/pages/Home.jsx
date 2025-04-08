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
import AboutUs from './AboutUs';
import BlogNews from './BlogNews';
import { Element } from "react-scroll";


gsap.registerPlugin(ScrollTrigger);

function Home() {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const imageRef = useRef(null);
  const buttonRef = useRef(null);
  const mainRef = useRef(null);
  const { isArabic } = useLanguage();
  const { darkMode } = useDarkMode(); // Get dark mode state
  const [heroData, setHeroData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const minLoadingTime = setTimeout(() => {
      if (heroData) {
        setIsLoading(false);
      }
    }, 1500); 
    client
      .fetch('*[_type == "heroSection"][0]')
      .then((data) => setHeroData(data))
      .catch(console.error);

    
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

        ScrollTrigger.create({
          trigger: imageRef.current,
          start: "top bottom",
          end: "bottom top",
          id: "heroParallax",
          scrub: 0.5,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            gsap.set(imageRef.current, { y: 20 * self.progress });
          }
        });
      }, mainRef);

    
    return () => {
        ctx1.revert();
        // ctx2.revert();
        // ctx3.revert();
        clearTimeout(minLoadingTime)
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
  }, []);
  

  useEffect(() => {
    if (heroData && isLoading) {
      // Check if minimum loading time has passed
      setTimeout(() => {
        setIsLoading(false);
      }, 300); // Small buffer to ensure smooth transition
    }
  }, [heroData, isLoading]);

  const LoadingScreen = () => (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${darkMode ? 'bg-light-gray' : 'bg-dark-mode'} transition-opacity duration-500`}>
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-t-transparent border-b-transparent rounded-full mx-auto mb-4 animate-spin" 
             style={{borderColor: darkMode ? '#00BC78 transparent #101828 transparent' : '#00BC78 transparent white transparent'}}></div>
        <h2 className={`text-xl font-bold ${darkMode ? 'text-[#101828]' : 'text-white'}`}>Loading Content</h2>
      </div>
    </div>
  );
    
  return (

    <>
      {isLoading && <LoadingScreen />}

    <div 
    ref={mainRef} 
    className={`${darkMode ? 'bg-light-gray' : 'bg-[#2D3F3B]'} font-nizar text-white min-h-screen overflow-x-hidden transition-colors duration-300 ${isArabic ? 'rtl' : 'ltr'}`}
  >
      <Navbar />
      <Element name='#'>
  
      {/* --- First Section (Hero) --- */}
      <main className="container min-h-screen mx-auto px-6 pt-36 pb-20 relative font-nizar">
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
        style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="white" fill-opacity="1" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="1"/%3E%3Ccircle cx="13" cy="13" r="1"/%3E%3C/g%3E%3C/svg%3E")',
               backgroundSize: '20px 20px'}}></div>
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative ${isArabic ? "lg:flex-row-reverse" : ""}`}>
  {/* Text Content */}
  <div className={`max-w-2xl relative z-20 pr-5 ${isArabic ? "lg:order-last text-right" : "lg:order-first text-left"}`}>
    <h1
      ref={titleRef}
      className={`text-5xl md:text-7xl font-bold mb-4 leading-tight tracking-tight animate-fadeIn`}
    >
      <p className={`${darkMode ? "text-dark-gray" : "text-white"}`}>{isArabic ? heroData?.title?.["ar"] : heroData?.title?.["en"]}</p>
      <p className="text-secondary-blue transition-colors duration-300 animate-gradientShift">
        {isArabic ? heroData?.title2?.["ar"] : heroData?.title2?.["en"]}
      </p>
      <span className={`${darkMode ? "text-dark-gray" : "text-white"}`}>
        {isArabic ? heroData?.title3?.["ar"] : heroData?.title3?.["en"] || "Loading..."}
      </span>
    </h1>
    {/* <p className={`text-2xl md:text-xl mb-3 font-bold ${darkMode ? "text-primary-green" : "text-secondary-blue"} uppercase transition-colors duration-300 animate-slideIn`}>
      {isArabic ? heroData?.subTitle?.["ar"] : heroData?.subTitle?.["en"]}
    </p> */}
    <p
      ref={descriptionRef}
      className={`text-lg md:text-xl ${darkMode ? "text-secondary-dark-gray" : "text-gray-200"} mb-5 leading-relaxed transition-colors duration-300 animate-opacityShift`}
    >
      {isArabic ? heroData?.description?.["ar"] : heroData?.description?.["en"]}
    </p>
    <button
        ref={buttonRef}
        className="bg-primary-green hover:bg-blue-700 text-white px-8 py-4 rounded-full font-medium transition-colors duration-200 text-lg mx-2"
      >
        Explore our solutions
      </button>
      <button
        ref={buttonRef}
        className="bg-primary-green hover:bg-blue-700 text-white px-8 py-4 rounded-full font-medium transition-colors duration-200 text-lg ml-5 mt-2"
      >
        Contact us now
      </button>
  </div>

  {/* Spline Container */}
  <div className={`relative h-full flex justify-center items-center lg:ml-10 ${isArabic ? "lg:order-first" : "lg:order-last"}`}>
    {/* Gradient Backgrounds */}
    <div className={`absolute -bottom-10 -right-10 w-96 h-96 ${darkMode ? "bg-green-500" : "bg-green-600"} rounded-full opacity-20 blur-3xl transition-colors duration-300`}></div>
    <div className={`absolute -top-10 -left-10 w-72 h-72 ${darkMode ? "bg-blue-400" : "bg-blue-500"} rounded-full opacity-15 blur-3xl transition-colors duration-300`}></div>

    {/* Spline scene */}
    <div
      ref={imageRef}
      className={`absolute ${isArabic ? 'z-25' : 'z-0'} w-[250%] h-full min-h-[800px] will-change-transform parallax-effect`}
    >
      <Spline 
        scene="https://prod.spline.design/WxkEBWD1AULRdO4M/scene.splinecode"
        onWheel={(e) => {
          if (e.ctrlKey) e.stopPropagation(); // Block zooming (Ctrl + scroll), allow normal scrolling
        }}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  </div>
</div>

    </main>
    </Element>

    <Element name='about' className="section-container">
          <AboutUs/>
        </Element>

        <div className={`h-24 ${darkMode ? 'bg-[#F8FAFC]' : 'bg-dark-mode'}`}></div>

        {/* Services Section - Add spacer to prevent overlap */}
        <Element name='services'>
          <Services/>
        </Element>

        {/* Add a spacer before Team section to ensure proper scrolling */}
        <div className={`h-[100px] ${darkMode ? 'bg-[#F8FAFC]' : 'bg-dark-mode' }`}></div>

        {/* Team Section */}
        <Element name='team' className='section-container'>
          <Team/>
        </Element>
      
        <div className={`h-24 ${darkMode ? 'bg-[#F8FAFC]' : 'bg-dark-mode'}`}></div>

      <Element name="blog">
      <BlogNews/>
      </Element>

      <Element name="contact">
      <Contact/>
      </Element>

      <Footer/>
    </div>
    </>
      );
}

export default Home;