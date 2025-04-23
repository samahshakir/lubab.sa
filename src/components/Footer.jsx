import { useDarkMode } from '../context/DarkModeContext';
import { useLanguage } from '../context/LanguageContext';
import linkedinIcon from '../assets/linkedin.png';
import xIcon from '../assets/twitter.png';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import {useState,useEffect} from 'react'
import client from '../sanityClient';
import logo from '../assets/AssetImage.webp'

function Footer() {
  const { darkMode } = useDarkMode();
  const { isArabic } = useLanguage();
  const [footerData, setFooterData] = useState(null);

  useEffect(() => {
    client.fetch(`*[_type == "footer"][0]`).then(setFooterData);
  }, []);

  if (!footerData) return null;

  const {
    description,
    navLinks,
    services,
    socialLinks,
  } = footerData;

  const iconMap = {
    linkedin: linkedinIcon,
    twitter: xIcon,
  };

  return (
    <footer
      className={`${
        darkMode
          ? 'bg-[#F8FAFC] border-gray-200'
          : 'bg-gradient-to-r from-[#2D3F3B] to-[#1E2927]'
      } border-t`}
    >
      <div className="container mx-auto px-6 py-6 md:py-12 ">
        <div className="grid grid-cols-1 md:grid-cols-4 gaps-4 md:gap-12">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-3 md:mb-6">
              <img
                src={logo}
                alt="Lubab"
                className="h-10 w-auto mr-3"
              />
              {/* <span
                className={`text-xl font-bold bg-clip-text text-transparent ${
                  darkMode
                    ? 'bg-gradient-to-r from-[#3F73B7] via-[#00BC78] to-[#3F73B7]'
                    : 'bg-gradient-to-r from-[#3F73B7] via-[#00BC78] to-[#3F73B7]'
                }`}
              >
                Lubab
              </span> */}
            </div>
            <p
              className={`${
                darkMode ? 'text-[#374151]' : 'text-gray-400'
              } mb-6 text-sm md:text-md`}
            >
              {isArabic ? description.ar : description.en}
            </p>
            <p
              className={`${
                darkMode ? 'text-[#374151]' : 'text-gray-400'
              } mb-6 text-xs md:text-md`}
            >
              National Address
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`${darkMode ? 'text-[#101828]' : 'text-white'} font-semibold md:mb-4 text-sm md:text-md`}>
              {isArabic ? 'روابط سريعة' : 'Quick Links'}
            </h3>
            <ul className="space-y-1 md:space-y-2 text-xs md:text-sm mb-2">
              {navLinks.map((link) => (
                <li key={link.name[isArabic ? 'ar' : 'en']}>
                  {link.isExternal ? (
                    <RouterLink
                      to={link.to}
                      className={`cursor-pointer ${
                        darkMode
                          ? 'text-[#374151] hover:text-[#101828]'
                          : 'text-gray-400 hover:text-blue-400'
                      } transition-colors duration-300`}
                    >
                      {link.name[isArabic ? 'ar' : 'en']}
                    </RouterLink>
                  ) : (
                    <ScrollLink
                      to={link.to}
                      smooth={true}
                      duration={500}
                      className={`cursor-pointer ${
                        darkMode
                          ? 'text-[#374151] hover:text-[#101828]'
                          : 'text-gray-400 hover:text-blue-400'
                      } transition-colors duration-300`}
                    >
                      {link.name[isArabic ? 'ar' : 'en']}
                    </ScrollLink>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className={`${darkMode ? 'text-[#101828]' : 'text-white'} font-semibold md:mb-4 text-sm md:text-sm`}>
              {isArabic ? 'خدماتنا' : 'Our Services'}
            </h3>
            <ScrollLink to="services" smooth={true} duration={500}>
            <ul className="space-y-1 md:space-y-2 text-xs md:text-sm mb-2 cursor-pointer">
              {(isArabic ? services.ar : services.en).map((service) => (
                <li key={service}>
                  <span
                    className={`${
                      darkMode
                        ? 'text-[#374151] hover:text-[#101828]'
                        : 'text-gray-400 hover:text-green-400'
                    } transition-colors duration-300`}
                  >
                    {service}
                  </span>
                </li>
              ))}
            </ul>
            </ScrollLink>
          </div>

          {/* Connect With Us */}
          <div>
            <h3 className={`${darkMode ? 'text-[#101828]' : 'text-white'} font-semibold md:mb-4 text-sm md:text-sm`}>
              {isArabic ? 'تواصل معنا' : 'Connect With Us'}
            </h3>
            <div className="space-y-3 text-sm">
              {socialLinks.map(({ platform, url }) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start hover:opacity-80 transition-opacity duration-200"
                >
                  <img
                    src={iconMap[platform]}
                    alt={platform}
                    className="h-4 w-4 md:h-5 md:w-5 mt-1 mx-1 md:mx-3"
                  />
                  <span className={`${darkMode ? 'text-[#374151]' : 'text-gray-400'} pt-2 text-xs md:text-sm`}>
                    {isArabic && platform === 'linkedin'
                      ? 'لينكدإن'
                      : platform === 'linkedin'
                      ? 'LinkedIn'
                      : isArabic
                      ? 'إكس'
                      : 'Twitter'}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

         {/* Copyright & Policies */}
         <div
          className={`mt-8 pt-8 border-t ${
            darkMode ? 'border-gray-300' : 'border-gray-800'
          } text-center`}
        >
          <p
            className={`${
              darkMode ? 'text-[#374151]' : 'text-gray-500'
            } text-sm`}
          >
            {isArabic
              ? `© ${new Date().getFullYear()} لباب. جميع الحقوق محفوظة.`
              : `© ${new Date().getFullYear()} Lubab. All rights reserved.`}
          </p>
          <div className="mt-2 flex justify-center space-x-6">
            {[
              {
                label: isArabic ? 'سياسة الخصوصية' : 'Privacy Policy',
                href: '/privacy-policy',
              },
              {
                label: isArabic ? 'شروط الاستخدام' : 'Terms of Service',
                href: isArabic
                  ? '/policies/terms-of-use-ar.pdf'
                  : '/policies/terms-of-use-en.pdf',
              },
              // {
              //   label: isArabic
              //     ? 'سياسة ملفات تعريف الارتباط'
              //     : 'Cookies Policy',
              //   href: '#',
              // },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${
                  darkMode
                    ? 'text-[#374151] hover:text-[#101828]'
                    : 'text-gray-500 hover:text-gray-400'
                } text-sm`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;