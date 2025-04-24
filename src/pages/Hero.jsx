import React, { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useDarkMode } from "../context/DarkModeContext";
import client from "../sanityClient";
import { Link } from "react-scroll";
import Spline from "@splinetool/react-spline";
import HeroLogo from '../assets/AssetLogo.webp'
import LoadScreen from "../components/LoadScreen";


const Hero = () => {
  const { isArabic } = useLanguage();
  const { darkMode } = useDarkMode();
  const [heroData, setHeroData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
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
    <LoadScreen/>
  );

  return (
    <>
      {isLoading && <LoadingScreen />}

      <main
        className={`container min-h-1.5 md:min-h-screen mx-auto px-6 ${
          isArabic ? "pt-5 md:pt-40" : "pt-22"
        } pb-20 relative font-nizar`}
      >
        {/* <div className="absolute inset-0 opacity-5 pointer-events-none" 
      style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="white" fill-opacity="1" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="1"/%3E%3Ccircle cx="13" cy="13" r="1"/%3E%3C/g%3E%3C/svg%3E")',
        backgroundSize: '20px 20px'
      }}></div> */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative ${
            isArabic ? "lg:flex-row-reverse" : ""
          }`}
        >
          <div className="absolute inset-0 flex justify-center items-center z-0 opacity-15 pointer-events-none lg:hidden">
    <img
      src={HeroLogo}
      alt="3D Visual"
      className="max-w-[70%] h-auto"
    />
    {/* Or use Spline instead of image */}
    {/* <Spline scene="https://prod.spline.design/WxkEBWD1AULRdO4M/scene.splinecode" /> */}
  </div>
          {/* Text Content */}
          <div
            className={`max-w-2xl relative z-20 pr-5 ${
              isArabic ? "lg:order-last text-right" : "lg:order-first text-left"
            }`}
          >
            <h1
              className={`text-xl lg:text-5xl font-bold mt-25 mb-4 leading-tight tracking-tight animate-fadeIn`}
            >
              <p className={`${darkMode ? "text-dark-gray" : "text-white"}`}>
                {isArabic ? heroData?.title?.["ar"] : heroData?.title?.["en"]}
              </p>
              <p className="text-secondary-blue transition-colors duration-300 animate-gradientShift">
                {isArabic ? heroData?.title2?.["ar"] : heroData?.title2?.["en"]}
              </p>
              <span className={`${darkMode ? "text-dark-gray" : "text-white"}`}>
                {isArabic
                  ? heroData?.title3?.["ar"]
                  : heroData?.title3?.["en"] || "Loading..."}
              </span>
            </h1>
            <p
              className={`text-sm lg:text-xl ${
                darkMode ? "text-secondary-dark-gray" : "text-gray-200"
              } mb-5 leading-relaxed transition-colors duration-300 animate-opacityShift text-justify font-nizar-regular`}
            >
              {isArabic
                ? heroData?.description?.["ar"]
                : heroData?.description?.["en"]}
            </p>

            {/* Buttons */}
            <button
            className={`text-sm sm:text-lg px-4 py-1.5 sm:px-6 sm:py-2 rounded-4xl font-medium transition-all duration-200 mx-2 w-[45%] sm:w-auto ${
              !darkMode
                ? "bg-dark-mode shadow-[5px_5px_10px_#1a1a1a,_-5px_-5px_10px_#3a3a3a] hover:shadow-[inset_5px_5px_10px_#1a1a1a,_inset_-5px_-5px_10px_#3a3a3a]"
                : "bg-gray-100 shadow-[5px_5px_10px_#d1d1d1,_-5px_-5px_10px_#ffffff] hover:shadow-[inset_5px_5px_10px_#d1d1d1,_inset_-5px_-5px_10px_#ffffff]"
            } border-none relative overflow-hidden`}
          >
            <Link to="services" smooth={true} duration={500}>
              <span className="bg-gradient-to-r from-primary-green to-secondary-blue bg-clip-text text-transparent hover:text-shadow font-nizar-regular">
                {isArabic ? "اكتشف حلولنا" : "Explore our services"}
              </span>
            </Link>
          </button>

          <button
            className={`text-sm sm:text-lg font-nizar-regular px-4 py-1.5 sm:px-6 sm:py-2 rounded-4xl font-medium mt-5 transition-all duration-200 mx-2 w-[45%] block sm:w-auto ${
              !darkMode
                ? "bg-dark-mode shadow-[5px_5px_10px_#1a1a1a,_-5px_-5px_10px_#3a3a3a] hover:shadow-[inset_5px_5px_10px_#1a1a1a,_inset_-5px_-5px_10px_#3a3a3a]"
                : "bg-gray-100 shadow-[5px_5px_10px_#d1d1d1,_-5px_-5px_10px_#ffffff] hover:shadow-[inset_5px_5px_10px_#d1d1d1,_inset_-5px_-5px_10px_#ffffff]"
            } border-none relative overflow-hidden`}
          >
            <Link to="contact" smooth={true} duration={500}>
              <span className="bg-gradient-to-r from-primary-green to-secondary-blue bg-clip-text text-transparent">
                {isArabic ? "اتصل بنا الآن" : "Contact us now"}
              </span>
            </Link>
          </button>

          </div>

          {/* Spline Container */}
          <div
            className={`relative h-full flex justify-center items-center lg:ml-25 z-0 ${
              isArabic ? "lg:order-first" : "lg:order-last"
            }`}
          >
            {/* Gradient Backgrounds
            <div
              className={`absolute -bottom-10 -right-10 w-96 h-96 ${
                darkMode ? "bg-green-500" : "bg-green-600"
              } rounded-full opacity-20 blur-3xl transition-colors duration-300`}
            ></div>
            <div
              className={`absolute -top-10 -left-10 w-72 h-72 ${
                darkMode ? "bg-blue-400" : "bg-blue-500"
              } rounded-full opacity-15 blur-3xl transition-colors duration-300`}
            ></div> */}

            {/* Spline scene */}
            <div
              className={`absolute ${
                isArabic ? "z-25" : "z-0"
              } w-[250%] h-full min-h-[800px] will-change-transform parallax-effect lg:block hidden`}
            >
              <Spline
                scene="https://draft.spline.design/KwyhaXaTIr4Q3LxF/scene.splinecode"
                onWheel={(e) => {
                  if (e.ctrlKey) e.stopPropagation(); // Block zooming (Ctrl + scroll), allow normal scrolling
                }}
                style={{ width: "100%", height: "100%" }}
              />
            </div>

            {/* <div className="w-full flex justify-center items-center lg:hidden opacity-20">
              <img
                src={HeroLogo}
                alt="3D Visual"
                className="max-w-[70%] h-auto"
              /> */}
              {/* <Spline scene="https://prod.spline.design/WxkEBWD1AULRdO4M/scene.splinecode" /> */}
            {/* </div> */}
          </div>
        </div>
      </main>
    </>
  );
};

export default Hero;
