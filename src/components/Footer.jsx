import { useDarkMode } from '../context/DarkModeContext';
import { useLanguage } from '../context/LanguageContext';
import linkedinIcon from '../assets/linkedin.png';
import xIcon from '../assets/twitter.png';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';

function Footer() {
  const { darkMode } = useDarkMode();
  const { isArabic } = useLanguage();

  const iconMap = {
    linkedin: linkedinIcon,
    twitter: xIcon,
  };

  const linkMap = {
    linkedin: 'https://www.linkedin.com/company/lubab/posts/?feedView=all',
    twitter: '#', // Replace with actual Twitter/X link
  };

  const navLinks = [
    { name: isArabic ? "الوظائف" : "Careers", to: "/career", isExternal: true },
    { name: isArabic ? "الفريق" : "Team", to: "team", isExternal: false },
    { name: isArabic ? "الأسئلة الشائعة" : "FAQ", to: "/faq", isExternal: true },
    { name: isArabic ? "المدونة" : "Blog", to: "blog", isExternal: false },
    { name: isArabic ? "اتصل بنا" : "Contact", to: "contact", isExternal: false },
  ];

  return (
    <footer
      className={`${
        darkMode
          ? 'bg-[#F8FAFC] border-gray-200'
          : 'bg-gradient-to-r from-[#2D3F3B] to-[#1E2927]'
      } border-t`}
    >
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-6">
              <img
                src="./src/assets/lubab-b.png"
                alt="Lubab"
                className="h-8 w-auto mr-3"
              />
              <span
                className={`text-xl font-bold bg-clip-text text-transparent ${
                  darkMode
                    ? 'bg-gradient-to-r from-blue-500 to-green-600'
                    : 'bg-gradient-to-r from-blue-400 to-green-500'
                }`}
              >
                Lubab
              </span>
            </div>
            <p
              className={`${
                darkMode ? 'text-[#374151]' : 'text-gray-400'
              } mb-6`}
            >
              {isArabic
                ? 'تحويل الأفكار إلى تجارب رقمية تُلهم وتُبهر.'
                : 'Transforming ideas into digital experiences that captivate and inspire.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className={`${
                darkMode ? 'text-[#101828]' : 'text-white'
              } font-semibold mb-4`}
            >
              {isArabic ? 'روابط سريعة' : 'Quick Links'}
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  {link.isExternal ? (
                    <RouterLink
                      to={link.to}
                      className={`cursor-pointer ${
                        darkMode
                          ? 'text-[#374151] hover:text-[#101828]'
                          : 'text-gray-400 hover:text-blue-400'
                      } transition-colors duration-300`}
                    >
                      {link.name}
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
                      {link.name}
                    </ScrollLink>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          
          <div>
            <h3
              className={`${
                darkMode ? 'text-[#101828]' : 'text-white'
              } font-semibold mb-4`}
            >
              {isArabic ? 'خدماتنا' : 'Our Services'}
            </h3>
            <ScrollLink to="services" smooth={true} duration={500}>
              <ul className="space-y-2">
                {(isArabic
                  ? [
                      'حلول البرمجيات كخدمة (SaaS)',
                      'بناء الشراكات',
                      'الاستشارات',
                      'حلول مخصصة',
                      'حلول الذكاء الاصطناعي',
                    ]
                  : [
                      'SaaS Solutions',
                      'Partnership Building',
                      'Consultations',
                      'Custom Solutions',
                      'AI Solutions',
                    ]
                ).map((service) => (
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
            <h3
              className={`${
                darkMode ? 'text-[#101828]' : 'text-white'
              } font-semibold mb-4`}
            >
              {isArabic ? 'تواصل معنا' : 'Connect With Us'}
            </h3>
            <div className="space-y-3">
              {['linkedin', 'twitter'].map((platform) => (
                <a
                  key={platform}
                  href={linkMap[platform]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start hover:opacity-80 transition-opacity duration-200"
                >
                  <img
                    src={iconMap[platform]}
                    alt={platform}
                    className="h-5 w-5 mt-1 mx-3"
                  />
                  <span
                    className={`${
                      darkMode ? 'text-[#374151]' : 'text-gray-400'
                    } pt-1`}
                  >
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
                href: isArabic
                  ? '/policies/privacy-policy-ar.pdf'
                  : '/policies/privacy-policy-en.pdf',
              },
              {
                label: isArabic ? 'شروط الاستخدام' : 'Terms of Service',
                href: isArabic
                  ? '/policies/terms-of-use-ar.pdf'
                  : '/policies/terms-of-use-en.pdf',
              },
              {
                label: isArabic
                  ? 'سياسة ملفات تعريف الارتباط'
                  : 'Cookies Policy',
                href: '#',
              },
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