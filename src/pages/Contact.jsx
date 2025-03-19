import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    services: []
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      services: checked 
        ? [...prev.services, value]
        : prev.services.filter(service => service !== value)
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      company: '',
      message: '',
      services: []
    });
    
    // Show success message temporarily
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };
  
  useEffect(() => {
    // Hero animation
    gsap.from('.contact-heading span', {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power4.out'
    });
    
    // Form animation
    gsap.from('.contact-form', {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.contact-form',
        start: 'top 80%'
      }
    });
    
    // Contact info animation
    gsap.from('.contact-info div', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.contact-info',
        start: 'top 85%'
      }
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-40 pb-20 bg-black">
        <div className="container mx-auto px-6">
          <h1 className="contact-heading text-5xl md:text-7xl font-bold mb-16 overflow-hidden">
            <span className="block">Let's</span>
            <span className="block">Work Together</span>
          </h1>
          
          <div className="max-w-3xl">
            <p className="text-xl text-gray-300">
              Ready to start a project, or want to learn more about how we work? Get in touch and let's create something amazing together.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Form Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Form */}
            <div className="md:col-span-2">
              <form onSubmit={handleSubmit} className="contact-form space-y-8">
                {formSubmitted && (
                  <div className="bg-green-900 text-white p-4 mb-6">
                    Thank you for your message! We'll get back to you shortly.
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border border-gray-700 p-3 focus:outline-none focus:border-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border border-gray-700 p-3 focus:outline-none focus:border-white"
                    />
                  </div>
                </div>
                
                <div>
                ```jsx
                  <label htmlFor="company" className="block text-sm font-medium mb-2">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-transparent border border-gray-700 p-3 focus:outline-none focus:border-white"
                  />
                </div>
                
                <div>
                  <p className="block text-sm font-medium mb-3">Services you're interested in</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="service-web"
                        name="services"
                        value="Web Development"
                        checked={formData.services.includes("Web Development")}
                        onChange={handleCheckboxChange}
                        className="mr-2 h-4 w-4"
                      />
                      <label htmlFor="service-web">Web Development</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="service-design"
                        name="services"
                        value="UI/UX Design"
                        checked={formData.services.includes("UI/UX Design")}
                        onChange={handleCheckboxChange}
                        className="mr-2 h-4 w-4"
                      />
                      <label htmlFor="service-design">UI/UX Design</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="service-branding"
                        name="services"
                        value="Branding"
                        checked={formData.services.includes("Branding")}
                        onChange={handleCheckboxChange}
                        className="mr-2 h-4 w-4"
                      />
                      <label htmlFor="service-branding">Branding</label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="service-strategy"
                        name="services"
                        value="Digital Strategy"
                        checked={formData.services.includes("Digital Strategy")}
                        onChange={handleCheckboxChange}
                        className="mr-2 h-4 w-4"
                      />
                      <label htmlFor="service-strategy">Digital Strategy</label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Your Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full bg-transparent border border-gray-700 p-3 focus:outline-none focus:border-white"
                  ></textarea>
                </div>
                
                <div>
                  <button 
                    type="submit" 
                    className="px-8 py-4 bg-white text-black font-medium hover:bg-gray-200 transition duration-300"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
            
            {/* Contact Info */}
            <div className="contact-info space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">Email</h3>
                <p className="text-gray-300">hello@youragency.com</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Phone</h3>
                <p className="text-gray-300">+1 (555) 123-4567</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Office</h3>
                <p className="text-gray-300">
                  123 Creative Street<br />
                  Suite 101<br />
                  San Francisco, CA 94103
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-300 hover:text-white transition">Twitter</a>
                  <a href="#" className="text-gray-300 hover:text-white transition">Instagram</a>
                  <a href="#" className="text-gray-300 hover:text-white transition">LinkedIn</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;