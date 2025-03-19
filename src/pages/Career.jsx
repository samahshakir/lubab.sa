import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function Career() {
  useEffect(() => {
    // Hero animation
    gsap.from('.career-heading span', {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power4.out'
    });
    
    // Job listing animations
    gsap.from('.job-listing', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.job-listings',
        start: 'top 80%'
      }
    });
    
    // Text reveal animations
    gsap.utils.toArray('.reveal-text').forEach(section => {
      gsap.from(section, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%'
        }
      });
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
          <h1 className="career-heading text-5xl md:text-7xl font-bold mb-16 overflow-hidden">
            <span className="block">Join Our</span>
            <span className="block">Creative Team</span>
          </h1>
          
          <div className="max-w-3xl">
            <p className="text-xl text-gray-300 reveal-text">
              At DALA, we're building a team of passionate, talented individuals who are excited about creating exceptional digital experiences. If you're creative, collaborative, and constantly curious, we'd love to hear from you.
            </p>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-16 reveal-text">Why Work With Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="reveal-text">
              <h3 className="text-2xl font-semibold mb-4">Meaningful Work</h3>
              <p className="text-gray-400">Work on challenging projects for innovative brands that make a real impact in the digital landscape.</p>
            </div>
            
            <div className="reveal-text">
              <h3 className="text-2xl font-semibold mb-4">Growth Opportunities</h3>
              <p className="text-gray-400">Develop your skills through ongoing training, mentorship, and opportunities to work across disciplines.</p>
            </div>
            
            <div className="reveal-text">
              <h3 className="text-2xl font-semibold mb-4">Collaborative Culture</h3>
              <p className="text-gray-400">Join a supportive team where ideas are valued, feedback is constructive, and everyone contributes to our success.</p>
            </div>
            
            <div className="reveal-text">
              <h3 className="text-2xl font-semibold mb-4">Work-Life Balance</h3>
              <p className="text-gray-400">Flexible work arrangements, generous PTO, and a focus on wellbeing help you bring your best self to work.</p>
            </div>
            
            <div className="reveal-text">
              <h3 className="text-2xl font-semibold mb-4">Competitive Benefits</h3>
              <p className="text-gray-400">Comprehensive healthcare, retirement plans, and other benefits to support you and your family.</p>
            </div>
            
            <div className="reveal-text">
              <h3 className="text-2xl font-semibold mb-4">Creative Environment</h3>
              <p className="text-gray-400">A modern studio space designed to inspire creativity and foster collaboration.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Current Openings */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-16 reveal-text">Current Openings</h2>
          
          <div className="job-listings space-y-8">
            {/* Job 1 */}
            <div className="job-listing bg-gray-900 p-8 border-l-4 border-white hover:bg-gray-800 transition-colors duration-300">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Senior UX Designer</h3>
                  <p className="text-gray-400 mb-4">Full-time • Remote or Los Angeles</p>
                  <p className="text-gray-500 mb-6 md:mb-0">We're looking for an experienced UX designer to join our team and lead user experience strategy across a variety of digital products.</p>
                </div>
                <a href="#" className="inline-block px-8 py-3 border border-white hover:bg-white hover:text-black transition-colors duration-300 whitespace-nowrap">
                  Apply Now
                </a>
              </div>
            </div>
            
            {/* Job 2 */}
            <div className="job-listing bg-gray-900 p-8 border-l-4 border-white hover:bg-gray-800 transition-colors duration-300">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Frontend Developer</h3>
                  <p className="text-gray-400 mb-4">Full-time • Los Angeles</p>
                  <p className="text-gray-500 mb-6 md:mb-0">Join our development team to build responsive, performant, and accessible websites and web applications.</p>
                </div>
                <a href="#" className="inline-block px-8 py-3 border border-white hover:bg-white hover:text-black transition-colors duration-300 whitespace-nowrap">
                  Apply Now
                </a>
              </div>
            </div>
            
            {/* Job 3 */}
            <div className="job-listing bg-gray-900 p-8 border-l-4 border-white hover:bg-gray-800 transition-colors duration-300">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Motion Designer</h3>
                  <p className="text-gray-400 mb-4">Full-time • Los Angeles</p>
                  <p className="text-gray-500 mb-6 md:mb-0">Create engaging animations and motion graphics for websites, digital products, and brand experiences.</p>
                </div>
                <a href="#" className="inline-block px-8 py-3 border border-white hover:bg-white hover:text-black transition-colors duration-300 whitespace-nowrap">
                  Apply Now
                </a>
              </div>
            </div>
            
            {/* Job 4 */}
            <div className="job-listing bg-gray-900 p-8 border-l-4 border-white hover:bg-gray-800 transition-colors duration-300">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Project Manager</h3>
                  <p className="text-gray-400 mb-4">Full-time • Remote or Los Angeles</p>
                  <p className="text-gray-500 mb-6 md:mb-0">Lead project planning, execution, and delivery, ensuring our clients' needs are met and projects run smoothly.</p>
                </div>
                <a href="#" className="inline-block px-8 py-3 border border-white hover:bg-white hover:text-black transition-colors duration-300 whitespace-nowrap">
                  Apply Now
                </a>
              </div>
            </div>
            
            {/* Job 5 */}
            <div className="job-listing bg-gray-900 p-8 border-l-4 border-white hover:bg-gray-800 transition-colors duration-300">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                <div>
                  <h3 className="text-2xl font-semibold mb-2">Brand Strategist</h3>
                  <p className="text-gray-400 mb-4">Full-time • Los Angeles</p>
                  <p className="text-gray-500 mb-6 md:mb-0">Develop compelling brand strategies that help our clients stand out in their markets and connect with their audiences.</p>
                </div>
                <a href="#" className="inline-block px-8 py-3 border border-white hover:bg-white hover:text-black transition-colors duration-300 whitespace-nowrap">
                  Apply Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Internship Section */}
      <section className="py-24 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-8 reveal-text">Internship Program</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="reveal-text">
              <p className="text-xl text-gray-300 mb-6">
                Our internship program offers students and recent graduates the opportunity to gain hands-on experience in a professional creative agency environment.
              </p>
              <p className="text-gray-400 mb-8">
                Interns work alongside our team on real client projects, receiving mentorship and guidance from experienced professionals. Many of our full-time team members started as interns, and we're committed to providing a valuable learning experience that can launch your career.
              </p>
              <a href="#" className="inline-block px-8 py-3 border border-white hover:bg-white hover:text-black transition-colors duration-300">
                Learn More
              </a>
            </div>
            <div className="h-64 bg-gray-800 reveal-text"></div>
          </div>
        </div>
      </section>
      
      {/* No Openings Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8 reveal-text">Don't See a Match?</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12 reveal-text">
            We're always interested in connecting with talented individuals. Send us your portfolio or resume, and we'll keep you in mind for future opportunities.
          </p>
          <Link to="/contact" className="inline-block px-10 py-4 border border-white hover:bg-white hover:text-black transition-colors duration-300 reveal-text">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Career;