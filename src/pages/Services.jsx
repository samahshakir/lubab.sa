import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDarkMode } from "../context/DarkModeContext";
import { useLanguage } from "../context/LanguageContext";
import sanityClient from "../sanityClient";

// Framer Motion Variants
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Service card component
const ServiceCard = ({ icon, title, description, status }) => {
  const { darkMode } = useDarkMode();

  return (
    <motion.div
      variants={cardVariants}
      className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl transition-all duration-300 hover:scale-105"
    >
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <i className={icon}></i>
        </div>
        <h3 className={`text-md md:text-2xl font-bold mb-4 ${darkMode ? "text-black" : "text-white"}`}>
          {title}
        </h3>
        <p className="text-gray-400 mb-6 flex-grow text-[12px] md:text-md">{description}</p>
        <span className="text-sm inline-block text-gray-500 text-md font-semibold">
          {status}
        </span>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const { darkMode } = useDarkMode();
  const { isArabic } = useLanguage();
  const [services, setServices] = useState([]);

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

  return (
    <div
      className={`relative ${darkMode ? "bg-[#F8FAFC]" : "bg-dark-mode"} min-h-[90%] py-15 overflow-hidden`}
      id="services-section"
    >
      <div className="services-bg-gradient absolute inset-0 z-0 opacity-20"></div>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2
            className="text-2xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent mt-10"
            variants={textVariants}
          >
            {isArabic ? "خدماتنا" : "Our Services"}
          </motion.h2>
          <motion.p
            className="text-sm md:text-lg text-gray-500 max-w-3xl mx-auto"
            variants={textVariants}
          >
            {isArabic ? "حلول تقنية متكاملة لأعمال متطورة" : "Comprehensive Digital Solutions for Evolving Businesses"}
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={isArabic ? service.title?.ar : service.title?.en}
              description={isArabic ? service.description?.ar : service.description?.en}
              status={service.status}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Services;
