import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useDarkMode } from '../context/DarkModeContext';
import { useLanguage } from '../context/LanguageContext';
import client from "../sanityClient"; // Your configured Sanity client
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { isAuthenticated,logout, verifyToken } from '../utils/auth'; // Import useAuth
import { PortableText } from '@portabletext/react';


// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const apiUrl = import.meta.env.VITE_API_URL;

const Careers = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const { darkMode } = useDarkMode();
  const { isArabic } = useLanguage();
  // const { isAuthenticated, user, logout } = useAuth(); // Get auth state and functions
  const navigate = useNavigate();

  const [openPositions, setOpenPositions] = useState([]); // State for actual jobs
  const [whyJoin, setWhyJoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');

  // GSAP Animations (keep as is)
  useEffect(() => {
    if (headingRef.current && subheadingRef.current) {
      gsap.set([headingRef.current, subheadingRef.current], { opacity: 0, y: 30 });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none reverse" }
      });
      tl.to(headingRef.current, { opacity: 1, y: 0, duration: 1, ease: "power3.out" })
        .to(subheadingRef.current, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.7");
    }
  }, []);

  // Fetch Data from Sanity
  useEffect(() => {
    const fetchCareersData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Query for active job positions
        const jobsQuery = `*[_type == "job" && active == true]{
          _id,
          titleEn,
          titleAr,
          slug,
          location,
          jobType,
          descriptionEn,
          descriptionAr,
          requirementsEn,
          requirementsAr
        }`;
        // Query for 'why join' items
        const whyJoinQuery = `*[_type == "whyJoin"]{titleEn, titleAr, descriptionEn, descriptionAr}`; // Keep this if needed

        const [jobsData, whyJoinData] = await Promise.all([
          client.fetch(jobsQuery),
          client.fetch(whyJoinQuery)
        ]);

        setOpenPositions(jobsData || []);
        setWhyJoin(whyJoinData || []);

        if(!verifyToken()){
          logout();
        }

      } catch (err) {
        console.error("Error fetching careers data:", err);
        setError("Failed to load career information. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    const fetchUsername = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user?.id;
        console.log(userId)
        const response = await fetch(`${apiUrl}/api/username/by-id/${userId}`);
        const data = await response.json();
        console.log(data)
  
        if (response.ok) {
          setUsername(data.username);
          console.log("FRom response",data.username)
        } else {
          alert(data.message || 'Error fetching username');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong');
      }
    };

    if(isAuthenticated()){
    fetchUsername();
    }
    fetchCareersData();
  }, []); // Fetch once on mount

  // --- Handle Apply Button Click ---
  const handleApplyClick = async (jobSlugOrId) => {
    const applyPath = `/apply/${jobSlugOrId}`;
  
    if (isAuthenticated()) {
      const user = await verifyToken(); // Await the verification
      if (user) {
        sessionStorage.setItem("jobSlug", jobSlugOrId)
        navigate(applyPath);
      } else {
        sessionStorage.setItem("redirectAfterLogin", applyPath);
        sessionStorage.setItem("jobSlug", jobSlugOrId)
        navigate('/auth', { state: { from: applyPath } });
      }
    } else {
      sessionStorage.setItem("jobSlug", jobSlugOrId)
      sessionStorage.setItem("redirectAfterLogin", applyPath);
      navigate('/auth', { state: { from: applyPath } });
    }
  };
  

  const handleLogout = () => {
    logout();
    navigate('/career'); // Redirect to home or login page after logout
  }

  const LoadingScreen = () => (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${darkMode ? 'bg-light-gray' : 'bg-dark-mode'} transition-opacity duration-500`}>
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-t-transparent border-b-transparent rounded-full mx-auto mb-4 animate-spin"
             style={{borderColor: darkMode ? '#00BC78 transparent #101828 transparent' : '#00BC78 transparent white transparent'}}></div>
        <h2 className={`text-xl font-bold ${darkMode ? 'text-[#101828]' : 'text-white'}`}>Loading Content</h2>
      </div>
    </div>
  );

   if (loading) {
    return <LoadingScreen />;
   }

  return (
    <div ref={sectionRef} className={`relative ${darkMode ? "bg-light-gray" : "bg-dark-mode"} font-nizar min-h-screen py-20 overflow-hidden`}>

      <div className="container mx-auto px-6">

        {/* --- Updated User Icon/Link --- */}
        <div className="absolute top-6 right-6 text-2xl text-gray-600 hover:text-primary-blue transition flex items-center space-x-4">
          {isAuthenticated() ? (
            <>
              <span className={`text-sm font-medium ${darkMode ? 'text-gray-700' : 'text-white'}`}>
                {username}
              </span>
              <button onClick={handleLogout} title="Logout">
                 <img src="/src/assets/logout.png" alt="Logout" className="h-6 w-auto" /> {/* Replace with actual logout icon */}
              </button>
            </>
          ) : (

            <Link to="/auth"  className='flex justify-center items-center gap-2 bg-secondary-blue hover:bg-blue-600 rounded-2xl px-2 py-2' title="Login / Sign Up">
            <p className='text-[15px] text-white'>Log in</p>
              {/* <img src="./src/assets/user.png" alt="Login/Sign Up" className="h-6 w-auto" /> */}
            </Link>

            
          )}
        </div>

        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 ref={headingRef} className="text-4xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-secondary-blue">
            {isArabic ? "التوظيف – انضم إلى فريق لُباب" : "Careers at Lubab"}
          </h2>
          <p ref={subheadingRef} className={`text-lg ${ darkMode ? 'text-dark-gray' : 'text-white'} max-w-3xl mx-auto`}>
            {isArabic
              ? "فرصة للابتكار والانضمام إلى رحلة التحول الرقمي"
              : "A Chance to Innovate and Join the Digital Transformation Journey"
            }
          </p>
        </div>

        {/* Introduction Text */}
         <div className="max-w-3xl mx-auto text-center mb-12">
              <p className={`mb-8 text-lg ${darkMode ? "text-gray-700" : "text-gray-300"}`}>
                {isArabic
                  ? "نبحث دائمًا عن مواهب للانضمام إلى فريقنا. استعرض الوظائف المتاحة أدناه وقم بالتقديم إذا وجدت ما يناسبك."
                  : "We are always looking for talented individuals to join our team. Browse the open positions below and apply if you find a suitable match."
                }
              </p>
         </div>


         {/* --- Display Open Job Positions --- */}
         <h3 className={`text-3xl font-semibold mb-8 text-center ${darkMode ? "text-gray-800" : "text-white"}`}>
            {isArabic ? "الوظائف المتاحة" : "Open Positions"}
         </h3>

         {error && <p className="text-center text-red-500 mb-6">{error}</p>}

         {openPositions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                {openPositions.map((job, index) => (
                  <div
                    key={job._id}
                    className={`p-6 rounded-xl transition-all flex flex-col justify-between ${
                      darkMode
                        ? "bg-gray-100 shadow-[8px_8px_16px_#d1d1d1,_-8px_-8px_16px_#ffffff] hover:shadow-[12px_12px_20px_#d1d1d1,_-12px_-12px_20px_#ffffff]"
                        : "bg-white/10 hover:bg-white/5"
                    } transform hover:-translate-y-2 duration-300`}
                    style={{
                      opacity: 0,
                      animation: `fadeIn 0.5s ease-out forwards ${0.2 + index * 0.1}s`
                    }}
                  >
                    {/* Job Content */}
                    <div>
                      <h4 className={`text-xl font-bold mb-2 ${darkMode ? "text-gray-800" : "text-white"}`}>
                        {isArabic ? job.titleAr : job.titleEn} {/* Adjust based on your fields */}
                      </h4>
                      <p className={`text-sm mb-1 ${darkMode ? "text-gray-600" : "text-gray-400"}`}>
                        {job.location || ''}
                      </p>
                       <p className={`text-sm mb-4 ${darkMode ? "text-gray-600" : "text-gray-400"}`}>
                        {job.jobType || ''}
                      </p>
                      <div className={`${darkMode ? "text-gray-700" : "text-gray-300"} mb-5 text-sm line-clamp-3`}>
                        <PortableText
                          value={isArabic ? job.descriptionAr : job.descriptionEn}
                          components={{
                            block: ({ children }) => <p>{children}</p>, // keep it simple
                          }}
                        />
                      </div>

                    </div>

                    {/* Apply Button Section */}
                    <div className="mt-auto pt-4 flex justify-between items-center">
                        <button
                            onClick={() => handleApplyClick(job.slug?.current || job._id)} // Pass slug or ID
                            className={`px-5 py-2 rounded-lg font-medium transition-all duration-200 text-base ${
                              !darkMode
                              ? "bg-dark-mode shadow-[1px_1px_1px_#1a1a1a,_-1px_-1px_1px_#3a3a3a] hover:shadow-[inset_1px_1px_3px_#1a1a1a,_inset_-1px_-1px_3px_#3a3a3a]"
                              : "bg-gray-100 shadow-[3px_3px_6px_#d1d1d1,_-3px_-3px_6px_#ffffff] hover:shadow-[inset_3px_3px_6px_#d1d1d1,_inset_-3px_-3px_6px_#ffffff]"
                            } border-none relative overflow-hidden`}
                        >
                          <span className="bg-gradient-to-r from-primary-green to-secondary-blue bg-clip-text text-transparent font-semibold">
                            {isArabic ? 'قدم الآن' : 'Apply Now'}
                          </span>
                        </button>
                    </div>
                  </div>
                ))}
            </div>
         ) : (
             <p className={`text-center text-lg mt-8 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
                {isArabic ? "لا توجد وظائف متاحة في الوقت الحالي. يرجى التحقق مرة أخرى لاحقًا." : "No open positions available at the moment. Please check back later."}
             </p>
         )}


        {/* Why Join Section (Keep as is if needed) */}
        {whyJoin.length > 0 && (
            <div className="mt-20 text-center">
              <h3 className={`text-2xl font-semibold mb-6 ${darkMode ? "text-gray-800" : "text-white"}`}>
                {isArabic ? "لماذا تنضم إلى لُباب؟" : "Why Join Lubab?"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-18 max-w-5xl mx-auto mt-10">
                {whyJoin.map((item, index) => (
                  <div
                    key={index}
                    className={`p-5 rounded-lg transition-all ${darkMode ? "bg-gray-100 shadow-[8px_8px_16px_#d1d1d1,_-8px_-8px_16px_#ffffff] hover:shadow-[12px_12px_20px_#d1d1d1,_-12px_-12px_20px_#ffffff]" : "bg-white/10 backdrop-blur-xl"} transform hover:scale-105 duration-300`}
                    style={{ opacity: 0, animation: `fadeIn 0.5s ease-out forwards ${0.5 + index * 0.1}s` }}
                  >
                    <h4 className={`text-lg font-medium mb-2 ${darkMode ? "text-gray-800" : "text-white"}`}>
                      {isArabic ? item.titleAr : item.titleEn}
                    </h4>
                    <p className={`${darkMode ? "text-gray-600" : "text-gray-300"}`}>
                      {isArabic ? item.descriptionAr : item.descriptionEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default Careers;