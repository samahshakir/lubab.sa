import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-6">DALA</h2>
            <p className="text-gray-400 mb-6">Creating digital experiences that connect brands with their audience.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-400 transition-colors duration-300">Instagram</a>
              <a href="#" className="hover:text-gray-400 transition-colors duration-300">Twitter</a>
              <a href="#" className="hover:text-gray-400 transition-colors duration-300">LinkedIn</a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-6">Navigation</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="hover:text-gray-400 transition-colors duration-300">Home</Link></li>
              <li><Link to="/about" className="hover:text-gray-400 transition-colors duration-300">About</Link></li>
              <li><Link to="/team" className="hover:text-gray-400 transition-colors duration-300">Team</Link></li>
              <li><Link to="/career" className="hover:text-gray-400 transition-colors duration-300">Career</Link></li>
              <li><Link to="/contact" className="hover:text-gray-400 transition-colors duration-300">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-6">Contact</h3>
            <p className="text-gray-400 mb-2">Email: hello@dala.agency</p>
            <p className="text-gray-400 mb-2">Phone: +1 (555) 123-4567</p>
            <p className="text-gray-400">Address: 123 Creative Street, Design District, CA 90210</p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">© 2025 DALA. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-400 hover:text-white">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-400 hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;