import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import imageUrlBuilder from '@sanity/image-url';
import client from "../sanityClient"; 
import { useLanguage } from '../context/LanguageContext';
import { useDarkMode } from '../context/DarkModeContext';
import { scroller } from "react-scroll"
import { PortableText } from '@portabletext/react';


const builder = imageUrlBuilder(client);
const urlFor = (source) => builder.image(source);


const ArticlePage = () => {
  // const { articleId } = useParams();
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isArabic } = useLanguage();
  const { darkMode } = useDarkMode();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const handleClick = () => {
    navigate("/");

    setTimeout(() => {
      scroller.scrollTo("blog", {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
      });
    }, 100); // Small delay to ensure navigation completes
  };
  
  

  useEffect(() => {
    const fetchData = async () => {
      const query = `*[_type == "blog" && slug.current == $slug][0]{
        title, titleAr, excerpt, excerptAr, readTime, readTimeAr, author, authorAr, publishedAt,
        tags, tagsAr, mainImage, content, contentAr
      }`;

      const relatedQuery = `*[_type == "blog" && slug.current != $slug][0...3]{
        title, titleAr, excerpt, excerptAr, slug
      }`;

      const data = await client.fetch(query, { slug });
      const related = await client.fetch(relatedQuery, { slug });

      setArticle(data);
      setRelatedArticles(related);
    };

    fetchData();
  }, [slug]);
  
  if (!article) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen ${darkMode ? 'bg-light-gray' : 'bg-dark-mode'} transition-colors duration-300 font-nizar ${isArabic ? 'rtl' : 'ltr'}`}
    >
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <button
          onClick={handleClick}
          className={`mb-8 flex items-center gap-2 ${darkMode ? "text-dark-gray" : "text-white"} hover:opacity-80 transition-opacity`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          {isArabic ? 'العودة إلى المدونة' : 'Back to Blog'}
        </button>

        <div className={`p-8 rounded-2xl shadow-xl ${darkMode ? 'bg-white' : 'bg-dark-gray'}`}>
          <div className="flex justify-between items-center mb-6">
            <span className={`text-sm font-medium ${darkMode ? 'text-primary-green' : 'text-secondary-blue'}`}>
              {new Date(article.publishedAt).toLocaleDateString()} • {isArabic ? article.readTimeAr : article.readTime}
            </span>
            <span className={`text-sm font-medium ${darkMode ? 'text-primary-green' : 'text-secondary-blue'}`}>
              {isArabic ? article.authorAr : article.author}
            </span>
          </div>

          <h1 className={`text-3xl md:text-4xl font-bold mb-6 ${darkMode ? 'text-dark-gray' : 'text-white'}`}>
            {isArabic ? article.titleAr : article.title}
          </h1>

          {article.mainImage && (
            <div className="mb-8 rounded-xl overflow-hidden">
              <img 
                src={urlFor(article.mainImage).width(800).url()} 
                alt={article.title} 
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          <div className="article-content space-y-6">
            <PortableText
              value={isArabic ? article.contentAr : article.content}
              components={{
                block: {
                  normal: ({ children }) => (
                    <p className={`text-lg leading-relaxed ${darkMode ? 'text-dark-gray' : 'text-gray-200'}`}>
                      {children}
                    </p>
                  )
                },
                // Optionally add support for images, headers, etc.
              }}
            />
          </div>

          {article.tags && (
            <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap gap-2">
                {(isArabic ? article.tagsAr : article.tags)?.map((tag, index) => (
                  <span 
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-gray-100 text-gray-700' : 'bg-gray-700 text-gray-200'}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-12">
          <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-dark-gray' : 'text-white'}`}>
            {isArabic ? 'مقالات ذات صلة' : 'Related Articles'}
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedArticles.map((relatedArticle, index) => (
              <div 
                key={index}
                className={`p-4 rounded-xl cursor-pointer ${darkMode ? 'bg-white hover:bg-gray-100 text-dark-gray' : 'bg-dark-gray hover:bg-gray-800 text-white'} transition-colors duration-200`}
                onClick={() => navigate(`/blog/article/${relatedArticle.slug.current}`)}
              >
                <h4 className="font-bold mb-2">{isArabic ? relatedArticle.titleAr : relatedArticle.title}</h4>
                <p className={`text-sm ${darkMode ? 'text-gray-600' : 'text-gray-300'} line-clamp-2`}>
                  {isArabic ? relatedArticle.excerptAr : relatedArticle.excerpt}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArticlePage;