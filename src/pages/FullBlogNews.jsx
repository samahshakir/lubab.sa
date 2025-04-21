import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';
import { useDarkMode } from '../context/DarkModeContext';
import { useNavigate } from 'react-router-dom';
import sanityClient from '../sanityClient';

gsap.registerPlugin(ScrollTrigger);

function FullBlogNews() {
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
      className={`container min-h-screen mx-auto px-6 pt-25 pb-20 relative ${darkMode ? 'bg-light-gray' : 'bg-dark-mode'} font-nizar transition-colors duration-300 ${isArabic ? 'rtl' : 'ltr'}`}
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

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 grid-flow-row-dense">
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

export default FullBlogNews;