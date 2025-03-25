import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Career = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);
  const jobsContainerRef = useRef(null);
  const jobRefs = useRef([]);
  const ctaButtonRef = useRef(null);
  
  // Job listings data
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Senior Frontend Developer",
      location: "Remote / New York",
      type: "Full-time",
      description: "Join our team to build cutting-edge web applications using React, TypeScript, and modern frontend tools.",
      requirements: ["5+ years of frontend development", "React expertise", "UI/UX sensibility"]
    },
    {
      id: 2,
      title: "UX/UI Designer",
      location: "San Francisco / Remote",
      type: "Full-time",
      description: "Create beautiful, intuitive interfaces that elevate our digital products to the next level.",
      requirements: ["3+ years in product design", "Strong portfolio", "Figma proficiency"]
    },
    {
      id: 3,
      title: "Backend Engineer",
      location: "Austin / Remote",
      type: "Full-time",
      description: "Develop robust, scalable backend systems that power our applications and services.",
      requirements: ["Node.js expertise", "Database design", "API development"]
    },
    {
      id: 4,
      title: "DevOps Specialist",
      location: "Remote",
      type: "Full-time",
      description: "Streamline our deployment processes and ensure reliability across our infrastructure.",
      requirements: ["CI/CD pipeline experience", "AWS/Azure expertise", "Kubernetes"]
    }
  ]);

  // Initialize animations
  useEffect(() => {
    // Set initial states
    gsap.set([headingRef.current, descriptionRef.current, ctaButtonRef.current], { 
      opacity: 0,
      y: 50 
    });
    
    gsap.set(jobRefs.current, { 
      opacity: 0,
      x: -50 
    });
    
    // Create main section animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        end: "center center",
        toggleActions: "play none none reverse",
        markers: false
      }
    });
    
    tl.to(headingRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    })
    .to(descriptionRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.6")
    .to(jobRefs.current, {
      opacity: 1,
      x: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.4")
    .to(ctaButtonRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    }, "-=0.2");
    
    // Job card hover animations
    jobRefs.current.forEach(card => {
      gsap.set(card.querySelector('.job-hover-bg'), { opacity: 0, scale: 0.8 });
      
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -10,
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
          duration: 0.3
        });
        gsap.to(card.querySelector('.job-hover-bg'), {
          opacity: 1,
          scale: 1,
          duration: 0.4
        });
        gsap.to(card.querySelector('.job-content'), {
          color: "#fff",
          duration: 0.3
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          duration: 0.3
        });
        gsap.to(card.querySelector('.job-hover-bg'), {
          opacity: 0,
          scale: 0.8,
          duration: 0.3
        });
        gsap.to(card.querySelector('.job-content'), {
          color: "#1a202c",
          duration: 0.3
        });
      });
    });
    
    // Button hover animation
    if (ctaButtonRef.current) {
      ctaButtonRef.current.addEventListener('mouseenter', () => {
        gsap.to(ctaButtonRef.current, {
          scale: 1.05,
          duration: 0.3
        });
      });
      
      ctaButtonRef.current.addEventListener('mouseleave', () => {
        gsap.to(ctaButtonRef.current, {
          scale: 1,
          duration: 0.3
        });
      });
    }
    
    // Cleanup
    return () => {
      if (ScrollTrigger.getAll().length) {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
      
      jobRefs.current.forEach(card => {
        card.removeEventListener('mouseenter', () => {});
        card.removeEventListener('mouseleave', () => {});
      });
      
      if (ctaButtonRef.current) {
        ctaButtonRef.current.removeEventListener('mouseenter', () => {});
        ctaButtonRef.current.removeEventListener('mouseleave', () => {});
      }
    };
  }, []);
  
  // Add job card to refs
  const addToJobRefs = (el) => {
    if (el && !jobRefs.current.includes(el)) {
      jobRefs.current.push(el);
    }
  };
  
  // Toggle job details
  const toggleJobDetails = (id) => {
    setJobs(prev => 
      prev.map(job => 
        job.id === id 
          ? { ...job, expanded: !job.expanded } 
          : job
      )
    );
  };

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full opacity-30 transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-100 rounded-full opacity-40 transform -translate-x-1/3 translate-y-1/3"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 
            ref={headingRef}
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
          >
            Join Our Team
          </h2>
          <p 
            ref={descriptionRef}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            We're looking for passionate individuals who want to make an impact and grow with us. 
            Explore our open positions and find where you fit in.
          </p>
        </div>
        
        <div ref={jobsContainerRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {jobs.map((job) => (
            <div 
              key={job.id} 
              ref={addToJobRefs}
              className="relative bg-white rounded-xl p-8 shadow-md transition-all duration-300 cursor-pointer overflow-hidden"
              onClick={() => toggleJobDetails(job.id)}
            >
              {/* Hover background */}
              <div className="job-hover-bg absolute inset-0 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl z-0"></div>
              
              {/* Added text-gray-900 class to ensure text is visible by default */}
              <div className="job-content relative z-10 transition-colors duration-300 text-gray-900">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">{job.title}</h3>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {job.type}
                  </span>
                </div>
                
                {/* Explicitly set text color for location */}
                <p className="text-gray-600 mb-4">{job.location}</p>
                
                {/* Explicitly set text color for description */}
                <p className="mb-6 text-gray-800">{job.description}</p>
                
                {job.expanded && (
                  <div className="mt-4 animate-fadeIn">
                    <h4 className="font-semibold mb-2">Requirements:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {job.requirements.map((req, index) => (
                        <li key={index} className="text-gray-800">{req}</li>
                      ))}
                    </ul>
                    
                    <button className="mt-6 px-6 py-2 bg-blue-100 text-blue-800 rounded-lg font-medium hover:bg-blue-200 transition-colors duration-300">
                      Apply Now
                    </button>
                  </div>
                )}
                
                <div className="flex items-center mt-4">
                  <span className="text-sm font-medium">
                    {job.expanded ? 'Show less' : 'Learn more'}
                  </span>
                  <svg 
                    className={`w-5 h-5 ml-1 transition-transform duration-300 ${job.expanded ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-gray-600 mb-6">Don't see a position that fits your skills?</p>
          <button 
            ref={ctaButtonRef}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Send Us Your Resume
          </button>
        </div>
      </div>
      
      {/* Animated particles for visual interest */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="absolute w-2 h-2 rounded-full bg-blue-400 opacity-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s linear infinite`
            }}
          ></div>
        ))}
      </div>
      
    </section>
  );
};

export default Career;