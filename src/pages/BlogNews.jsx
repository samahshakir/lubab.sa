import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';
import { useDarkMode } from '../context/DarkModeContext';
import { useNavigate } from 'react-router-dom';
import sanityClient from '../sanityClient';

gsap.registerPlugin(ScrollTrigger);

function BlogNews() {
  const { isArabic } = useLanguage();
  const { darkMode } = useDarkMode();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const navigate = useNavigate();
  
  // State for blog data
  const [blogSection, setBlogSection] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch blog section data
  useEffect(() => {
    const fetchBlogSection = async () => {
      try {
        const data = await sanityClient.fetch(
          `*[_type == "blogSection"][0]`
        );
        setBlogSection(data);
      } catch (error) {
        console.error("Error fetching blog section:", error);
      }
    };

    fetchBlogSection();
  }, []);

  // Fetch blog posts
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        const data = await sanityClient.fetch(
          `*[_type == "blog"] | order(publishedAt desc) {
            _id,
            title,
            titleAr,
            slug,
            excerpt,
            excerptAr,
            readTime,
            readTimeAr,
            author,
            authorAr,
            publishedAt,
            tags,
            tagsAr,
            active,
            mainImage {
              asset->{
                _id,
                url
              }
            }
          }`
        );
  
        // Prioritize active post first
        const activePost = data.find(post => post.active);
        const remainingPosts = data.filter(post => !post._id || (activePost ? post._id !== activePost._id : true));
        
        const selectedPosts = [
          ...(activePost ? [activePost] : []),
          ...remainingPosts.slice(0, activePost ? 4 : 5)
        ];
  
        setBlogPosts(selectedPosts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        setLoading(false);
      }
    };
  
    fetchBlogPosts();
  }, []);
  

  const handleReadMore = (article) => {
    // Navigate to the article page using the slug
    navigate(`/blog/article/${article.slug.current}`);
  };

  useLayoutEffect(() => {
    if (loading) return;

    let ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { autoAlpha: 0, y: 50, scale: 0.9 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            id: "blog-title",
            trigger: titleRef.current,
            start: "top 80%", // Trigger when 80% of the section is visible
            end: "bottom top",
            toggleActions: "play none none reverse", // Reverse animation on scroll up
          },
        }
      );
  
      // Card animations
      const cards = gsap.utils.toArray(".blog-card");
      if (cards.length > 0) {
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { autoAlpha: 0, y: 50, scale: 0.9 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 1,
              delay: index * 0.1,
              ease: "power3.out",
              scrollTrigger: {
                id: `blog-card-${index}`,
                trigger: card,
                start: "top 85%", // Animation triggers when each card is in view
                end: "bottom 20%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      }
  
      // Ensure ScrollTrigger updates after animations are set
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);
    }, sectionRef);
  
    return () => ctx.revert(); // Cleanup animations on unmount
  }, [loading, blogPosts]);

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
      <section className={`container min-h-screen mx-auto px-6 pt-25 pb-20 flex items-center justify-center ${darkMode ? 'bg-light-gray' : 'bg-dark-mode'}`}>
        <div className="text-center">
          <div className={`w-12 h-12 border-4 border-gray-300 border-t-${darkMode ? 'primary-green' : 'secondary-blue'} rounded-full animate-spin mx-auto mb-4`}></div>
          <p className={darkMode ? 'text-dark-gray' : 'text-white'}>Loading blog content...</p>
        </div>
      </section>
    );
  }

  // If no blog section data yet, show a placeholder
  // if (!blogSection) {
  //   return null;
  // }

  return (
    <section 
    ref={sectionRef}
    className={`container min-h-screen mx-auto px-6 pt-25 pb-20 relative ${darkMode ? 'bg-light-gray' : 'bg-dark-mode'} transition-colors duration-300 ${isArabic ? 'rtl' : 'ltr'}`}
  > 
    <div className="max-w-4xl mx-auto text-center mb-16">
      <h2 
        ref={titleRef}
        className={`text-md md:text-5xl font-bold mb-6 leading-tight tracking-tight ${darkMode ? 'text-primary-green' : 'text-white'}`}
      >
        {formatTitle(isArabic ? blogPosts.titleAr : blogSection.title)}
      </h2>
      <p 
        className={`text-sm md:text-xl ${darkMode ? 'text-gray-400' : 'text-gray-200'} mb-12`}
      >
        {isArabic ? blogSection.descriptionAr : blogSection.description}
      </p>
    </div>
  
    {/* Modified grid to center when only 2 items */}
    <div className={`grid gap-8 ${
      blogPosts.length <= 2 
        ? 'md:grid-cols-2 max-w-3xl mx-auto' 
        : 'md:grid-cols-2 lg:grid-cols-4'
    } grid-flow-row-dense`}>
      {blogPosts.map((article) => (
        <div 
          key={article._id}
          className={`blog-card p-3 rounded-xl shadow-lg transition-all duration-300 flex flex-col
            ${darkMode 
              ? 'bg-white hover:bg-gray-100 text-dark-gray' 
              : 'bg-white/10 backdrop-blur-md text-white'}
            ${!article.mainImage ? 'self-start' : ''}
          `}
          style={{height: article.mainImage ? '' : 'fit-content'}}
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
          <p className={`text-xs md:text-sm ${darkMode ? 'text-secondary-dark-gray' : 'text-gray-300'}`}>
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
              className={`mt-1 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 
                ${darkMode 
                  ? 'bg-primary-green text-white hover:bg-blue-700' 
                  : 'bg-secondary-blue text-white hover:bg-blue-600'
                }`}
            >
              {isArabic ? 'اقرأ المزيد' : 'Read More'}
            </button>
          </div>
        </div>
      ))}
    </div>
<div className="flex justify-center mt-12">
    <button 
      onClick={() =>  navigate('/blogposts')}
      className={`px-6 py-3 rounded-full text-base font-medium transition-colors duration-200 flex items-center
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