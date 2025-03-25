// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import { LanguageProvider } from "./context/LanguageContext";
import { DarkModeProvider } from "./context/DarkModeContext";
import Navbar from "./components/Navbar";
import Career from './pages/Career';
import Team from './pages/Team';

function App() {
  return (
    <DarkModeProvider>
      <LanguageProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/team" element={<Team />} />

            <Route path="/contact" element={<Contact />} />
            <Route path='/career' element={<Career/>}/>
          </Routes>
        </Router>
      </LanguageProvider>
    </DarkModeProvider>
  );
}

export default App;