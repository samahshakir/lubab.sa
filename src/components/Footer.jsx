import { Link } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';

function Footer() {
  const {darkMode} = useDarkMode();
  return (
    <footer className={`${darkMode ? 'bg-[#F8FAFC] border-gray-200' : 'bg-gradient-to-r from-gray-900 to-black border-gray-800'} border-t`}>
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-6">
              <img src="./src/assets/lubab-b.png" alt="Lubab" className="h-8 w-auto mr-3" />
              <span className={`text-xl font-bold bg-clip-text text-transparent ${darkMode ? 'bg-gradient-to-r from-blue-500 to-green-600' : 'bg-gradient-to-r from-blue-400 to-green-500'}`}>
                Lubab
              </span>
            </div>
            <p className={`${darkMode ? 'text-[#374151]' : 'text-gray-400'} mb-6`}>
              Transforming ideas into digital experiences that captivate and inspire.
            </p>
            <div className="flex space-x-4">
              {/* Social Media Icons */}
              {["facebook", "twitter", "instagram", "linkedin"].map((platform) => (
                <a key={platform} href="#" className={`${darkMode ? 'text-[#374151] hover:text-[#101828]' : 'text-gray-400 hover:text-white'} transition-colors duration-300`}>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    {/* Add platform-specific paths here */}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
            <div>
              <h3 className={`${darkMode ? 'text-[#101828]' : 'text-white'} font-semibold mb-4`}>Quick Links</h3>
              <ul className="space-y-2">
                {[
                  { name: "Blog", href: "/" },
                  { name: "Careers", href: "/careers" },
                  { name: "Contact", href: "/contact" },
                  { name: "FAQ", href: "/faq" },
                ].map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className={`${darkMode ? 'text-[#374151] hover:text-[#101828]' : 'text-gray-400 hover:text-blue-400'} transition-colors duration-300`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>


          {/* Services */}
          <div>
            <h3 className={`${darkMode ? 'text-[#101828]' : 'text-white'} font-semibold mb-4`}>Our Services</h3>
            <ul className="space-y-2">
              {["SaaS Solutions", "Partnership Building", "Consultations", "Custom Solutions", "AI Solutions"].map((service) => (
                <li key={service}>
                  <a href="#" className={`${darkMode ? 'text-[#374151] hover:text-[#101828]' : 'text-gray-400 hover:text-green-400'} transition-colors duration-300`}>
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          

          {/* Contact Info */}
          <div>
          <h3 className={`${darkMode ? 'text-[#101828]' : 'text-white'} font-semibold mb-4`}>Connect With Us</h3>
          <div className="space-y-3">
            {[
              { icon: "linkedin", text: "LinkedIn" },
              { icon: "twitter", text: "X" },
            ].map((item) => (
              <div key={item.icon} className="flex items-start">
                <svg className={`h-5 w-5 ${darkMode ? 'text-blue-500' : 'text-blue-400'} mt-1 mr-3`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {/* Add corresponding icon paths here */}
                </svg>
                <span className={`${darkMode ? 'text-[#374151]' : 'text-gray-400'}`}>{item.text}</span>
              </div>
              
            ))}
          </div>
        </div>
        </div>

        {/* Copyright */}
        <div className={`mt-8 pt-8 border-t ${darkMode ? 'border-gray-300' : 'border-gray-800'} text-center`}>
          <p className={`${darkMode ? 'text-[#374151]' : 'text-gray-500'} text-sm`}>
            © {new Date().getFullYear()} Lubab. All rights reserved.
          </p>
          <div className="mt-2 flex justify-center space-x-6">
            {["Privacy Policy", "Terms of Service", "Cookies Policy"].map((policy) => (
              <a key={policy} href="#" className={`${darkMode ? 'text-[#374151] hover:text-[#101828]' : 'text-gray-500 hover:text-gray-400'} text-sm`}>
                {policy}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;