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
            mainImage {
              asset->{
                _id,
                url
              }
            }
          }`
        );
        setBlogPosts(data);
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
              duration: 0.6,
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
  if (!blogSection) {
    return null;
  }

  return (
    <section 
      ref={sectionRef}
      className={`container min-h-screen mx-auto px-6 pt-25 pb-20 relative ${darkMode ? 'bg-light-gray' : 'bg-dark-mode'} transition-colors duration-300 ${isArabic ? 'rtl' : 'ltr'}`}
    >
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
        style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="white" fill-opacity="1" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="1"/%3E%3Ccircle cx="13" cy="13" r="1"/%3E%3C/g%3E%3C/svg%3E")',
               backgroundSize: '20px 20px'}}></div>
      
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 
          ref={titleRef}
          className={`text-5xl md:text-5xl font-bold mb-6 leading-tight tracking-tight ${darkMode ? 'text-dark-gray' : 'text-white'}`}
        >
          {formatTitle(isArabic ? blogSection.titleAr : blogSection.title)}
        </h2>
        <p 
          className={`text-xl ${darkMode ? 'text-secondary-dark-gray' : 'text-gray-200'} mb-12`}
        >
          {isArabic ? blogSection.descriptionAr : blogSection.description}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {blogPosts.map((article) => (
          <div 
            key={article._id}
            className={`blog-card p-6 rounded-xl shadow-lg transition-all duration-300 
              ${darkMode 
                ? 'bg-white hover:bg-gray-100 text-dark-gray' 
                : 'bg-dark-gray hover:bg-dark-mode text-white'}
            `}
          >
            {article.mainImage && (
              <div className="mb-4 h-48 overflow-hidden rounded-lg">
                <img 
                  src={article.mainImage.asset.url} 
                  alt={isArabic ? article.titleAr : article.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            )}
            <div className="mb-4 flex items-center justify-between">
              <span 
                className={`text-sm font-medium ${darkMode ? 'text-primary-green' : 'text-secondary-blue'}`}
              >
                {isArabic ? article.readTimeAr : article.readTime}
              </span>
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center 
                  ${darkMode 
                    ? 'bg-primary-green/10 text-primary-green' 
                    : 'bg-secondary-blue/10 text-secondary-blue'
                  }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
                  <polyline points="13 2 13 9 20 9"/>
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3">{isArabic ? article.titleAr : article.title}</h3>
            <p className={`text-sm ${darkMode ? 'text-secondary-dark-gray' : 'text-gray-300'}`}>
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
            <button 
              onClick={() => handleReadMore(article)}
              className={`mt-4 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 
                ${darkMode 
                  ? 'bg-primary-green text-white hover:bg-blue-700' 
                  : 'bg-secondary-blue text-white hover:bg-blue-600'
                }`}
            >
              {isArabic ? 'اقرأ المزيد' : 'Read More'}
            </button>
          </div>
        ))}
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