import React, { useRef, useEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';
import { useDarkMode } from '../context/DarkModeContext';
import { useNavigate } from 'react-router-dom';
import sanityClient from '../sanityClient';
import { motion } from 'framer-motion';
import backgroundImage from '../assets/Assetbg1.webp';
import LoadScreen from '../components/LoadScreen';


function BlogNews() {
  const { isArabic } = useLanguage();
  const { darkMode } = useDarkMode();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  // State for blog data
  const [blogSection, setBlogSection] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch blog section data
// 1. Combine related data fetching into a single useEffect
useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const [sectionData, postsData] = await Promise.all([
        sanityClient.fetch(`*[_type == "blogSection"][0]`),
        sanityClient.fetch(`*[_type == "blog"] | order(publishedAt desc) {
          _id, title, titleAr, slug, excerpt, excerptAr, readTime, readTimeAr,
          author, authorAr, publishedAt, tags, tagsAr, active,
          mainImage { asset->{ _id, url } }
        }`)
      ]);
      
      setBlogSection(sectionData);
      
      // Process blog posts
      const activePost = postsData.find(post => post.active);
      const remainingPosts = postsData.filter(post => !post._id || 
        (activePost ? post._id !== activePost._id : true));
      
      const selectedPosts = [
        ...(activePost ? [activePost] : []),
        ...remainingPosts.slice(0, activePost ? 4 : 5)
      ];
      
      setBlogPosts(selectedPosts);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  fetchData();
}, []);

// 2. Optimize scroll event listener with throttling
useEffect(() => {
  if (loading) return;
  
  // Throttle function to limit execution frequency
  const throttle = (func, limit) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };
  
  // Throttled scroll handler
  const handleScroll = throttle(() => {
    const section = document.getElementById('blog-section');
    if (!section) return;
    
    const rect = section.getBoundingClientRect();
    setIsVisible(rect.top <= window.innerHeight * 0.8);
  }, 100);
  
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check initial visibility
  
  return () => window.removeEventListener('scroll', handleScroll);
}, [loading]);
  

  const handleReadMore = (article) => {
    // Navigate to the article page using the slug
    navigate(`/blog/article/${article.slug.current}`);
  };

  // Format the title to add styling to periods
  const formatTitle = (title) => {
    if (!title) return '';
    return title.split('.').map((part, index) => (
      <React.Fragment key={index}>
        {part}
        {index < title.split('.').length - 1 && <span className="text-secondary-blue">.</span>}
      </React.Fragment>
    ));
  };

  // Format the date based on current language
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    
    if (isArabic) {
      // Arabic date formatting
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      // Use Arabic numerals and format
      return date.toLocaleDateString('ar-SA', options);
    } else {
      // English date formatting
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    }
  };

  if (loading) {
    return (
      <LoadScreen/>
    );
  }


  return (
    <section id="blog-section"
    ref={sectionRef}
    className={`min-h-screen mx-auto px-6 pt-25 pb-20 relative ${darkMode ? 'bg-light-gray' : 'bg-dark-mode'} transition-colors duration-300 ${isArabic ? 'rtl' : 'ltr'}`}
  > 
           <div 
                    className="absolute inset-0 bg-cover opacity-3 bg-center z-0 pointer-events-none"
                    style={{
                      backgroundImage: `url(${backgroundImage})`,
                    }}
                  />
    <div className="max-w-4xl mx-auto text-center mb-16">
    <motion.h2
        ref={titleRef}
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50, scale: isVisible ? 1 : 0.9 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        className={`text-md md:text-5xl font-bold mb-6 leading-tight tracking-tight ${darkMode ? 'text-primary-green' : 'text-white'}`}
      >
      {blogPosts && blogSection ? (
        formatTitle(isArabic ? blogSection.titleAr : blogSection.title)
      ) : (
        <span>Loading...</span>
      )}
      </motion.h2>
      <p 
        className={`text-sm md:text-xl text-gray-400 mb-12 font-nizar-regular`}
      >
       {blogPosts && blogSection ? (
        formatTitle(isArabic ? blogSection.descriptionAr: blogSection.description)
      ) : (
        <span>Loading...</span>
      )}
      </p>
    </div>
  
    {/* Modified grid to center when only 2 items */}
    <div className={`grid gap-8 ${
      blogPosts.length <= 2 
        ? 'md:grid-cols-2 max-w-3xl mx-auto' 
        : 'md:grid-cols-2 lg:grid-cols-4'
    } grid-flow-row-dense`}>
      {blogPosts.map((article,index) => (
        <motion.div 
          key={article._id}
          className={`blog-card p-3 rounded-xl shadow-lg transition-all duration-300 flex flex-col
            ${darkMode 
              ? 'bg-white hover:bg-gray-100 text-dark-gray' 
              : 'bg-white/10 backdrop-blur-md text-white'}
            ${!article.mainImage ? 'self-start' : ''}
          `}
          style={{height: article.mainImage ? '' : 'fit-content'}}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50, scale: isVisible ? 1 : 0.9 }}
          transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.85 }}
        >
          {article.mainImage && (
            <div className="mb-4 overflow-hidden rounded-lg">
              <img 
                src={article.mainImage.asset.url} 
                alt={isArabic ? article.titleAr : article.title}
                className="w-full h-auto object-cover object-center rounded-lg"
              />
            </div>
          )}
          <div className="mb-1 flex items-center justify-between">
            <span 
              className={`text-sm font-medium ${darkMode ? 'text-primary-green' : 'text-secondary-blue'}`}
            >
              {isArabic ? article.readTimeAr : article.readTime}
            </span>
          </div>
          <h3 className="text-md md:text-xl font-bold mb-3">{isArabic ? article.titleAr : article.title}</h3>
          <p className={`text-xs md:text-sm font-nizar-regular ${darkMode ? 'text-secondary-dark-gray' : 'text-gray-300'}`}>
            {isArabic ? article.excerptAr : article.excerpt}
          </p>
          <div className="flex items-center mt-4 mb-3">
            <span className={`text-xs ${darkMode ? 'text-secondary-dark-gray' : 'text-gray-300'}`}>
              {isArabic ? article.authorAr : article.author} • {formatDate(article.publishedAt)}
            </span>
          </div>
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {(isArabic ? article.tagsAr : article.tags)?.map((tag, index) => (
              <span 
                key={index}
                className={`text-xs px-2 py-1 rounded-full ${
                  darkMode 
                    ? 'bg-gray-100 text-secondary-dark-gray' 
                    : 'bg-dark-gray text-gray-300'
                }`}
              >
                #{tag}
              </span>
            ))}
          </div>
          <div className="mt-auto">
            <button 
              onClick={() => handleReadMore(article)}
              className={`mt-1 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 font-nizar-regular
                ${darkMode 
                  ? 'bg-primary-green text-white hover:bg-blue-700' 
                  : 'bg-secondary-blue text-white hover:bg-blue-600'
                }`}
            >
              {isArabic ? 'اقرأ المزيد' : 'Read More'}
            </button>
          </div>
        </motion.div>
      ))}
    </div>
<div className="flex justify-center mt-12">
    <button 
      onClick={() =>  navigate('/blogposts')}
      className={`px-6 py-3 rounded-full text-base font-medium transition-colors duration-200 flex items-center font-nizar-regular
        ${darkMode 
          ? 'bg-primary-green text-white hover:bg-blue-700' 
          : 'bg-secondary-blue text-white hover:bg-blue-600'
        }`}
    >
      {isArabic ? 'عرض جميع المقالات' : 'View All Blog Posts'}
      <span className="ml-2">
        {isArabic ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5"></path>
            <polyline points="12 5 5 12 12 19"></polyline>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"></path>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        )}
      </span>
    </button>
  </div>
      {/* Display message if no blog posts */}
      {blogPosts.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className={darkMode ? 'text-dark-gray' : 'text-white'}>
            {isArabic ? 'لا توجد منشورات متاحة حالياً.' : 'No blog posts available at the moment.'}
          </p>
        </div>
      )}
    </section>
  );
}

export default BlogNews;