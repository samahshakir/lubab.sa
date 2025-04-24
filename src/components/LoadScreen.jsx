import React from 'react'
import backgroundImage from '../assets/Assetbg1.webp';
import logo from '../assets/Assetlogo.webp'
import { useDarkMode } from "../context/DarkModeContext";
import { BlinkBlur } from "react-loading-indicators";


const LoadScreen = () => {
    const { darkMode } = useDarkMode();

  return (
    <div
    className={`fixed inset-0 z-50 flex items-center justify-center flex-col gap-5 ${
      darkMode ? "bg-light-gray" : "bg-dark-mode"
    } transition-opacity duration-500`}
  >
           <div 
            className="absolute inset-0 bg-cover opacity-3 bg-center"
            style={{
              backgroundImage: `url(${backgroundImage})`,
            }}
          />
          <img
                          src={logo}
                          alt="Lubab"
                          className="h-10 w-auto mr-3"
                        />

    <BlinkBlur size='small' color={["#00BC78", "#3F73B7", "#8AAEDC",]} />
  </div>
  )
}

export default LoadScreen