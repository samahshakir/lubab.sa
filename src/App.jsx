import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import { LanguageProvider } from "./context/LanguageContext";
import Navbar from "./components/Navbar";

function App() {
  return (
    <LanguageProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  </LanguageProvider>
  );
}

export default App;
