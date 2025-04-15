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
import { Element,Link } from "react-scroll";
import { initGA, trackPageView } from "../utils/analytics";
import CookieConsent from "react-cookie-consent";
import CookieBanner from '../components/CookieBanner';

gsap.registerPlugin(ScrollTrigger);

function Home() {
  // const titleRef = useRef(null);
  // const descriptionRef = useRef(null);
  // const imageRef = useRef(null);
  // const buttonRef = useRef(null);
  const mainRef = useRef(null);
  const { isArabic } = useLanguage();
  const { darkMode } = useDarkMode(); // Get dark mode state
  const [heroData, setHeroData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (consent === "true") {
      trackPageView();
    }
    initGA();


    client
      .fetch('*[_type == "heroSection"][0]')
      .then((data) => setHeroData(data))
      .catch(console.error);
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
      <CookieBanner/>
      {/* --- First Section (Hero) --- */}
      <main className={`container min-h-screen mx-auto px-6 ${isArabic ? 'pt-28 md:pt-35' : 'pt-22'} pb-20 relative font-nizar`}>
        {/* <div className="absolute inset-0 opacity-5 pointer-events-none" 
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="white" fill-opacity="1" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="1"/%3E%3Ccircle cx="13" cy="13" r="1"/%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: '20px 20px'
          }}></div> */}

          {/* <CookieConsent
              location="bottom"
              buttonText="Accept"
              declineButtonText="Deny"
              enableDeclineButton
              onAccept={() => {
                localStorage.setItem("cookieConsent", "true");
                setConsentGiven(true);
                initGA(); // Only enable GA after consent
              }}
              onDecline={() => {
                localStorage.setItem("cookieConsent", "false");
              }}
            >
              This website uses cookies to improve your experience.{" "}
              <a href="/privacy-policy" style={{ color: "#fff" }}>
                Learn more
              </a>
            </CookieConsent> */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative ${isArabic ? "lg:flex-row-reverse" : ""}`}>
          {/* Text Content */}
          <div className={`max-w-2xl relative z-20 pr-5 ${isArabic ? "lg:order-last text-right" : "lg:order-first text-left"}`}>
            <h1 className={`text-5xl lg:text-7xl font-bold mb-4 leading-tight tracking-tight animate-fadeIn`}>
              <p className={`${darkMode ? "text-dark-gray" : "text-white"}`}>
                {isArabic ? heroData?.title?.["ar"] : heroData?.title?.["en"]}
              </p>
              <p className="text-secondary-blue transition-colors duration-300 animate-gradientShift">
                {isArabic ? heroData?.title2?.["ar"] : heroData?.title2?.["en"]}
              </p>
              <span className={`${darkMode ? "text-dark-gray" : "text-white"}`}>
                {isArabic ? heroData?.title3?.["ar"] : heroData?.title3?.["en"] || "Loading..."}
              </span>
            </h1>
            <p className={`text-lg md:text-xl ${darkMode ? "text-secondary-dark-gray" : "text-gray-200"} mb-5 leading-relaxed transition-colors duration-300 animate-opacityShift`}>
              {isArabic ? heroData?.description?.["ar"] : heroData?.description?.["en"]}
            </p>

            {/* Buttons */}
            <button className={`px-6 py-2 rounded-4xl font-medium transition-all duration-200 text-lg mx-2 w-full sm:w-auto ${
                !darkMode 
                ? "bg-dark-mode shadow-[5px_5px_10px_#1a1a1a,_-5px_-5px_10px_#3a3a3a] hover:shadow-[inset_5px_5px_10px_#1a1a1a,_inset_-5px_-5px_10px_#3a3a3a]" 
                : "bg-gray-100 shadow-[5px_5px_10px_#d1d1d1,_-5px_-5px_10px_#ffffff] hover:shadow-[inset_5px_5px_10px_#d1d1d1,_inset_-5px_-5px_10px_#ffffff]"
              } border-none relative overflow-hidden`}>
              <Link to="services" smooth={true} duration={500}>
                <span className="bg-gradient-to-r from-primary-green to-secondary-blue bg-clip-text text-transparent hover:text-shadow">
                  {isArabic ? 'اكتشف حلولنا' : 'Explore our services'}
                </span>
              </Link>
            </button>

            <button className={`px-6 py-2 rounded-4xl font-medium mt-5 transition-all duration-200 text-lg mx-2 w-full sm:w-auto ${
                !darkMode 
                ? "bg-dark-mode shadow-[5px_5px_10px_#1a1a1a,_-5px_-5px_10px_#3a3a3a] hover:shadow-[inset_5px_5px_10px_#1a1a1a,_inset_-5px_-5px_10px_#3a3a3a]" 
                : "bg-gray-100 shadow-[5px_5px_10px_#d1d1d1,_-5px_-5px_10px_#ffffff] hover:shadow-[inset_5px_5px_10px_#d1d1d1,_inset_-5px_-5px_10px_#ffffff]"
              } border-none relative overflow-hidden`}>
              <Link to="contact" smooth={true} duration={500}>
                <span className="bg-gradient-to-r from-primary-green to-secondary-blue bg-clip-text text-transparent">
                  {isArabic ? 'اتصل بنا الآن' : 'Contact us now'}
                </span>
              </Link>
            </button>
          </div>

          {/* Spline Container */}
          <div className={`relative h-full flex justify-center items-center lg:ml-25 ${isArabic ? "lg:order-first" : "lg:order-last"}`}>
            {/* Gradient Backgrounds */}
            <div className={`absolute -bottom-10 -right-10 w-96 h-96 ${darkMode ? "bg-green-500" : "bg-green-600"} rounded-full opacity-20 blur-3xl transition-colors duration-300`}></div>
            <div className={`absolute -top-10 -left-10 w-72 h-72 ${darkMode ? "bg-blue-400" : "bg-blue-500"} rounded-full opacity-15 blur-3xl transition-colors duration-300`}></div>

            {/* Spline scene */}
            <div
              className={`absolute ${isArabic ? 'z-25' : 'z-0'} w-[250%] h-full min-h-[800px] will-change-transform parallax-effect lg:block hidden`}
            >
              <Spline 
                scene="https://draft.spline.design/KwyhaXaTIr4Q3LxF/scene.splinecode"
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

      
        <div className={`h-20 ${darkMode ? 'bg-light-gray' : 'bg-dark-mode'}`}></div>

      <Element name="blog">
      <BlogNews/>
      </Element>


        {/* Team Section */}
        <Element name='team' className='section-container'>
          <Team/>
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