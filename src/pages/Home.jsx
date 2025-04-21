import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Contact from "./Contact";
import Team from "./Team";
import Spline from "@splinetool/react-spline";
import Services from "./Services";
import { useLanguage } from "../context/LanguageContext";
import { useDarkMode } from "../context/DarkModeContext"; // Import the dark mode hook
import client from "../sanityClient";
import Footer from "../components/Footer";
import Career from "./Career";
import AboutUs from "./AboutUs";
import BlogNews from "./BlogNews";
import { Element } from "react-scroll";
import CookieBanner from "../components/CookieBanner";
import Hero from "./Hero";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const mainRef = useRef(null);
  const { isArabic } = useLanguage();
  const { darkMode } = useDarkMode(); // Get dark mode state

  return (
    <div
      ref={mainRef}
      className={`${
        darkMode ? "bg-light-gray" : "bg-[#2D3F3B]"
      } font-nizar text-white min-h-screen overflow-x-hidden transition-colors duration-300 ${
        isArabic ? "rtl" : "ltr"
      }`}
    >
      <Navbar />
      <Element name="#">
        <CookieBanner />
        <Hero />
      </Element>

      <Element name="about" className="section-container">
        <AboutUs />
      </Element>

      {/* <div
        className={`h-24 ${darkMode ? "bg-[#F8FAFC]" : "bg-dark-mode"}`}
      ></div> */}

      {/* Services Section - Add spacer to prevent overlap */}
      <Element name="services">
        <Services />
      </Element>

      {/* Add a spacer before Team section to ensure proper scrolling */}
      {/* <div
        className={`h-[100px] ${darkMode ? "bg-[#F8FAFC]" : "bg-dark-mode"}`}
      ></div> */}

      {/* <div
        className={`h-20 ${darkMode ? "bg-light-gray" : "bg-dark-mode"}`}
      ></div> */}

      <Element name="blog">
        <BlogNews />
      </Element>

      {/* Team Section */}
      <Element name="team" className="section-container">
        <Team />
      </Element>

      <Element name="contact">
        <Contact />
      </Element>

      <Footer />
    </div>
  );
}

export default Home;
