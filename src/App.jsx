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
import FAQ from './pages/FAQ';
import BlogNews from './pages/BlogNews';
import ArticlePage from './pages/ArticlePage';
// import ApplicationsPage from './pages/ApplicationsPage';
import AuthPage from './pages/AuthPage';
import ApplicationForm from './pages/ApplicationForm';
import JobApplicationSuccess from './components/JobApplicationSuccess';
import Unauthorized from './components/Unauthorized';
import ApplicationsList from './components/ApplicationList';
import ApplicationDetail from './components/ApplicationDetail';
import ProtectedRoute from './components/protectedRoute';
import AdminRoute from './components/adminRoute';


function App() {
  return (
    <DarkModeProvider>
      <LanguageProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/team" element={<Team />} />
            {/* <Route path="/blog" element={<BlogNews/>} /> */}
            {/* <Route path="/contact" element={<Contact />} /> */}
            <Route path="/blog" element={<BlogNews />} />
            <Route path="/blog/article/:slug" element={<ArticlePage />} />
            <Route path='/career' element={<Career/>}/>
            <Route path='/faq' element={<FAQ/>}/>
            <Route path='/auth' element={<AuthPage/>}/>
            <Route path='/unauthorized' element={<Unauthorized/>}/>
            {/* <Route path='/applications' element={<ApplicationsPage/>}/> */}
            <Route path="/applications" element={ <AdminRoute>
              <ApplicationsList /> </AdminRoute>} />
            <Route path="/application/:slug" element={<ProtectedRoute><ApplicationDetail /> </ProtectedRoute>} />
            <Route path="/apply/:jobIdOrSlug" element={<ProtectedRoute><ApplicationForm /> </ProtectedRoute>} />
            <Route path="/applications/success" element={<JobApplicationSuccess/>} />
          </Routes>
        </Router>
      </LanguageProvider>
    </DarkModeProvider>
  );
}

export default App;