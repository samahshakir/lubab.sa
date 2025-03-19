import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function Team() {
  useEffect(() => {
    // Hero animation
    gsap.from('.team-heading span', {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: 'power4.out'
    });
    
    // Team member animations
    gsap.from('.team-member', {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.team-grid',
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
          <h1 className="team-heading text-5xl md:text-7xl font-bold mb-16 overflow-hidden">
            <span className="block">Meet Our</span>
            <span className="block">Creative Team</span>
          </h1>
          
          <div className="max-w-3xl">
            <p className="text-xl text-gray-300 reveal-text">
              Our team of strategists, designers, and developers brings diverse perspectives and expertise to every project. United by a passion for great design and a commitment to excellence, we work collaboratively to create impactful digital experiences.
            </p>
          </div>
        </div>
      </section>
      
      {/* Team Grid */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <div className="team-grid grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Team Member 1 */}
            <div className="team-member group">
              <div className="aspect-w-3 aspect-h-4 mb-6 overflow-hidden bg-gray-800">
                <div className="w-full h-full bg-gray-800 group-hover:scale-105 transition-transform duration-700 ease-in-out"></div>
              </div>
              <h3 className="text-2xl font-semibold mb-1">Alex Morgan</h3>
              <p className="text-gray-400 mb-4">Founder & Creative Director</p>
              <p className="text-gray-500">With over 15 years in the industry, Alex leads our creative vision and ensures every project meets our high standards.</p>
            </div>
            
            {/* Team Member 2 */}
            <div className="team-member group">
              <div className="aspect-w-3 aspect-h-4 mb-6 overflow-hidden bg-gray-800">
                <div className="w-full h-full bg-gray-700 group-hover:scale-105 transition-transform duration-700 ease-in-out"></div>
              </div>
              <h3 className="text-2xl font-semibold mb-1">Maya Chen</h3>
              <p className="text-gray-400 mb-4">UX Director</p>
              <p className="text-gray-500">Maya combines strategic thinking with user-centered design to create intuitive and engaging digital experiences.</p>
            </div>
            
            {/* Team Member 3 */}
            <div className="team-member group">
              <div className="aspect-w-3 aspect-h-4 mb-6 overflow-hidden bg-gray-800">
                <div className="w-full h-full bg-gray-600 group-hover:scale-105 transition-transform duration-700 ease-in-out"></div>
              </div>
              <h3 className="text-2xl font-semibold mb-1">Ethan Williams</h3>
              <p className="text-gray-400 mb-4">Technical Director</p>
              <p className="text-gray-500">Ethan leads our development team, turning creative concepts into functional, high-performing digital products.</p>
            </div>
            
            {/* Team Member 4 */}
            <div className="team-member group">
              <div className="aspect-w-3 aspect-h-4 mb-6 overflow-hidden bg-gray-800">
                <div className="w-full h-full bg-gray-500 group-hover:scale-105 transition-transform duration-700 ease-in-out"></div>
              </div>
              <h3 className="text-2xl font-semibold mb-1">Olivia Johnson</h3>
              <p className="text-gray-400 mb-4">Strategy Lead</p>
              <p className="text-gray-500">Olivia helps our clients define their digital strategy and ensures our work delivers measurable business results.</p>
            </div>
            
            {/* Team Member 5 */}
            <div className="team-member group">
              <div className="aspect-w-3 aspect-h-4 mb-6 overflow-hidden bg-gray-800">
                <div className="w-full h-full bg-gray-900 group-hover:scale-105 transition-transform duration-700 ease-in-out"></div>
              </div>
              <h3 className="text-2xl font-semibold mb-1">David Kim</h3>
              <p className="text-gray-400 mb-4">Design Lead</p>
              <p className="text-gray-500">David brings brands to life through distinctive visual identities and thoughtful design systems.</p>
            </div>
            
            {/* Team Member 6 */}
            <div className="team-member group">
              <div className="aspect-w-3 aspect-h-4 mb-6 overflow-hidden bg-gray-800">
                <div className="w-full h-full bg-gray-700 group-hover:scale-105 transition-transform duration-700 ease-in-out"></div>
              </div>
              <h3 className="text-2xl font-semibold mb-1">Sophie Martinez</h3>
              <p className="text-gray-400 mb-4">Motion Designer</p>
              <p className="text-gray-500">Sophie specializes in creating engaging animations and interactive experiences that captivate users.</p>
            </div>
            
            {/* Team Member 7 */}
            <div className="team-member group">
              <div className="aspect-w-3 aspect-h-4 mb-6 overflow-hidden bg-gray-800">
                <div className="w-full h-full bg-gray-800 group-hover:scale-105 transition-transform duration-700 ease-in-out"></div>
              </div>
              <h3 className="text-2xl font-semibold mb-1">James Lee</h3>
              <p className="text-gray-400 mb-4">Frontend Developer</p>
              <p className="text-gray-500">James crafts pixel-perfect interfaces with clean, efficient code and a focus on performance and accessibility.</p>
            </div>
            
            {/* Team Member 8 */}
            <div className="team-member group">
              <div className="aspect-w-3 aspect-h-4 mb-6 overflow-hidden bg-gray-800">
                <div className="w-full h-full bg-gray-600 group-hover:scale-105 transition-transform duration-700 ease-in-out"></div>
              </div>
              <h3 className="text-2xl font-semibold mb-1">Emma Rodriguez</h3>
              <p className="text-gray-400 mb-4">Project Manager</p>
              <p className="text-gray-500">Emma ensures our projects run smoothly, keeping everything on track and facilitating clear communication.</p>
            </div>
            
            {/* Team Member 9 */}
            <div className="team-member group">
              <div className="aspect-w-3 aspect-h-4 mb-6 overflow-hidden bg-gray-800">
                <div className="w-full h-full bg-gray-500 group-hover:scale-105 transition-transform duration-700 ease-in-out"></div>
              </div>
              <h3 className="text-2xl font-semibold mb-1">Michael Thompson</h3>
              <p className="text-gray-400 mb-4">Backend Developer</p>
              <p className="text-gray-500">Michael builds robust backend systems that power our digital products, with a focus on security and scalability.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Culture Section */}
      <section className="py-24 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 reveal-text">Our Culture</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="reveal-text">
              <p className="text-xl text-gray-300 mb-8">
                At DALA, we foster a culture of creativity, collaboration, and continuous learning. We believe that great work happens when talented people are given the freedom to explore, experiment, and grow.
              </p>
              <p className="text-gray-400">
                Our studio is a place where ideas flow freely, where diverse perspectives are valued, and where we challenge each other to push beyond the expected. We work hard, but we also make time for fun, celebrating our successes and learning from our challenges.
              </p>
            </div>
            
            <div className="reveal-text">
              <p className="text-gray-400 mb-8">
                We invest in our team's professional development, encouraging everyone to stay curious, keep learning, and share their knowledge with others. Regular workshops, design reviews, and team outings help us stay inspired and connected.
              </p>
              <p className="text-gray-400">
                Most importantly, we care about creating an inclusive environment where everyone feels welcome, respected, and empowered to do their best work. We believe that diverse teams create better solutions, and we're committed to building a team that reflects the diversity of the communities we serve.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Join Us Section */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 reveal-text">Join Our Team</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12 reveal-text">
            We're always looking for talented and passionate people to join our team. Check out our current openings or send us your portfolio.
          </p>
          <a href="#" className="inline-block px-10 py-4 border border-white hover:bg-white hover:text-black transition-colors duration-300 reveal-text">
            View Open Positions
          </a>
        </div>
      </section>
    </div>
  );
}

export default Team;