import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function About() {
  const headingRef = useRef(null);
  const statsRef = useRef(null);
  
  useEffect(() => {
    // Hero animation
    gsap.from('.about-heading span', {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power4.out'
    });
    
    // Stats counter animation
    const stats = gsap.utils.toArray('.stat-number');
    stats.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      gsap.to(stat, {
        innerHTML: target,
        duration: 2,
        ease: 'power2.out',
        snap: { innerHTML: 1 },
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 80%'
        }
      });
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
          <h1 ref={headingRef} className="about-heading text-5xl md:text-7xl font-bold mb-16 overflow-hidden">
            <span className="block">About</span>
            <span className="block">DALA Agency</span>
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="text-xl text-gray-300 mb-6 reveal-text">
                Founded in 2018, DALA is a creative digital agency with a passion for crafting meaningful digital experiences that connect brands with their audiences.
              </p>
              <p className="text-xl text-gray-300 reveal-text">
                We believe in the power of design to solve problems, tell stories, and create emotional connections. Our approach combines strategic thinking with creative execution to deliver results that exceed expectations.
              </p>
            </div>
            
            <div className="reveal-text">
              <p className="text-gray-400 mb-8">
                Our multidisciplinary team brings together expertise in strategy, design, development, and marketing to create holistic digital solutions. We're not just executors – we're partners in your success, committed to understanding your business and helping you achieve your goals.
              </p>
              <p className="text-gray-400">
                Whether you're looking to establish a new brand, redesign your digital presence, or create an innovative digital product, we have the skills and experience to bring your vision to life.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <span className="stat-number text-5xl font-bold block mb-2" data-target="50">0</span>
              <span className="text-gray-400">Happy Clients</span>
            </div>
            
            <div className="text-center">
              <span className="stat-number text-5xl font-bold block mb-2" data-target="120">0</span>
              <span className="text-gray-400">Projects Completed</span>
            </div>
            
            <div className="text-center">
              <span className="stat-number text-5xl font-bold block mb-2" data-target="15">0</span>
              <span className="text-gray-400">Team Members</span>
            </div>
            
            <div className="text-center">
              <span className="stat-number text-5xl font-bold block mb-2" data-target="6">0</span>
              <span className="text-gray-400">Years Experience</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 reveal-text">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="reveal-text">
              <h3 className="text-2xl font-semibold mb-4">Innovation</h3>
              <p className="text-gray-400">We constantly push boundaries and explore new technologies to create forward-thinking solutions that stand out in the digital landscape.</p>
            </div>
            
            <div className="reveal-text">
              <h3 className="text-2xl font-semibold mb-4">Collaboration</h3>
              <p className="text-gray-400">We believe the best work happens when we work closely with our clients, fostering open communication and shared ownership of the creative process.</p>
            </div>
            
            <div className="reveal-text">
              <h3 className="text-2xl font-semibold mb-4">Excellence</h3>
              <p className="text-gray-400">We are committed to delivering work of the highest quality, paying attention to every detail and refining our craft with each project we undertake.</p>
            </div>
            
            <div className="reveal-text">
              <h3 className="text-2xl font-semibold mb-4">Integrity</h3>
              <p className="text-gray-400">We operate with honesty and transparency, building long-term relationships based on trust and mutual respect.</p>
            </div>
            
            <div className="reveal-text">
              <h3 className="text-2xl font-semibold mb-4">Impact</h3>
              <p className="text-gray-400">We measure our success by the results we deliver for our clients and the positive impact our work has on their business.</p>
            </div>
            
            <div className="reveal-text">
              <h3 className="text-2xl font-semibold mb-4">Growth</h3>
              <p className="text-gray-400">We're dedicated to continuous learning and improvement, staying at the forefront of industry trends and technologies.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Process Section */}
      <section className="py-24 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 reveal-text">Our Process</h2>
          
          <div className="space-y-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="reveal-text">
                <span className="text-sm text-gray-400 uppercase tracking-wider">Step 01</span>
                <h3 className="text-3xl font-semibold my-4">Discovery</h3>
                <p className="text-gray-400 mb-6">
                  We begin by understanding your business, goals, audience, and challenges. This foundational knowledge informs everything that follows and ensures our work aligns with your objectives.
                </p>
                <ul className="text-gray-400 space-y-2">
                  <li>• Stakeholder interviews</li>
                  <li>• Market research</li>
                  <li>• Competitor analysis</li>
                  <li>• User research</li>
                </ul>
              </div>
              <div className="h-64 bg-gray-800 reveal-text"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
              <div className="reveal-text md:order-2">
                <span className="text-sm text-gray-400 uppercase tracking-wider">Step 02</span>
                <h3 className="text-3xl font-semibold my-4">Strategy</h3>
                <p className="text-gray-400 mb-6">
                  Based on our discoveries, we develop a comprehensive strategy that serves as a roadmap for the project, outlining the approach, key messages, and metrics for success.
                </p>
                <ul className="text-gray-400 space-y-2">
                  <li>• Brand positioning</li>
                  <li>• Content strategy</li>
                  <li>• Technical planning</li>
                  <li>• Success metrics</li>
                </ul>
              </div>
              <div className="h-64 bg-gray-800 reveal-text md:order-1"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="reveal-text">
                <span className="text-sm text-gray-400 uppercase tracking-wider">Step 03</span>
                <h3 className="text-3xl font-semibold my-4">Design & Development</h3>
                <p className="text-gray-400 mb-6">
                This is where ideas come to life. Our design and development teams work collaboratively to create solutions that are both visually stunning and functionally robust.
              </p>
              <ul className="text-gray-400 space-y-2">
                <li>• User experience design</li>
                <li>• Visual design</li>
                <li>• Prototyping</li>
                <li>• Front-end and back-end development</li>
              </ul>
            </div>
            <div className="h-64 bg-gray-800 reveal-text"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
            <div className="reveal-text md:order-2">
              <span className="text-sm text-gray-400 uppercase tracking-wider">Step 04</span>
              <h3 className="text-3xl font-semibold my-4">Testing & Launch</h3>
              <p className="text-gray-400 mb-6">
                Before going live, we rigorously test all aspects of the project to ensure everything works flawlessly. Then we execute a coordinated launch to maximize impact.
              </p>
              <ul className="text-gray-400 space-y-2">
                <li>• Quality assurance</li>
                <li>• Performance optimization</li>
                <li>• Cross-platform testing</li>
                <li>• Launch planning</li>
              </ul>
            </div>
            <div className="h-64 bg-gray-800 reveal-text md:order-1"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="reveal-text">
              <span className="text-sm text-gray-400 uppercase tracking-wider">Step 05</span>
              <h3 className="text-3xl font-semibold my-4">Ongoing Support</h3>
              <p className="text-gray-400 mb-6">
                Our relationship doesn't end at launch. We provide ongoing support, maintenance, and optimization to ensure long-term success and continuous improvement.
              </p>
              <ul className="text-gray-400 space-y-2">
                <li>• Analytics and reporting</li>
                <li>• Performance monitoring</li>
                <li>• Iterative improvements</li>
                <li>• Strategic consultancy</li>
              </ul>
            </div>
            <div className="h-64 bg-gray-800 reveal-text"></div>
          </div>
        </div>
        </div>
      </section>
    </div>
  )}  

export default About;