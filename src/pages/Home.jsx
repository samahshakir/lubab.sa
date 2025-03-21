import React, { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Contact from './Contact';
import Team from './Team';

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const imageRef = useRef(null);
  const buttonRef = useRef(null);
  const mainRef = useRef(null);

  const section2Ref = useRef(null);
  const section2TitleRef = useRef(null);
  const section2DescriptionRef = useRef(null);

  const section3Ref = useRef(null);
  const section3TitleRef = useRef(null);
  const section3DescriptionRef = useRef(null);

  useEffect(() => {
    // --- First Section Animations (Hero) ---
    const elements = [titleRef.current, descriptionRef.current, imageRef.current, buttonRef.current];

    const ctx1 = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      gsap.set(elements, { autoAlpha: 0 });
      gsap.set(titleRef.current, { y: 30 });
      gsap.set(descriptionRef.current, { y: 20 });
      gsap.set(buttonRef.current, { y: 15 });
      gsap.set(imageRef.current, { scale: 0.97 });

      tl.to(titleRef.current, { autoAlpha: 1, y: 0, duration: 0.6 })
        .to(descriptionRef.current, { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.3")
        .to(buttonRef.current, { autoAlpha: 1, y: 0, duration: 0.4 }, "-=0.3")
        .to(imageRef.current, { autoAlpha: 1, scale: 1, duration: 0.7 }, "-=0.5");

      gsap.to(imageRef.current, {
        y: 20,
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
          invalidateOnRefresh: true
        }
      });
    }, mainRef);


    // --- Second Section Animations ---
    const ctx2 = gsap.context(() => {
      // Set initial state
      gsap.set([section2TitleRef.current, section2DescriptionRef.current], { 
        autoAlpha: 0, 
        scale: 0.7
      });

      // Create a ScrollTrigger that controls the animation throughout the entire section
      ScrollTrigger.create({
        trigger: section2Ref.current,
        start: "top bottom", // Start when the top of section2 hits the bottom of viewport
        end: "bottom top",   // End when the bottom of section2 hits the top of viewport
        scrub: 1,            // Smooth scrubbing with slight delay
        // markers: true,    // Uncomment for debugging
        onUpdate: (self) => {
          // Calculate progress values
          const progress = self.progress;
          
          // First half of scroll - fade in and scale up
          if (progress <= 0.5) {
            const fadeInProgress = progress * 2; // Normalize to 0-1 range for first half
            gsap.set([section2TitleRef.current, section2DescriptionRef.current], {
              autoAlpha: fadeInProgress,
              scale: 0.7 + (fadeInProgress * 0.5) // Scale from 0.7 to 1.2
            });
          } 
          // Second half of scroll - fade out and continue scaling
          else {
            const fadeOutProgress = (progress - 0.5) * 2; // Normalize to 0-1 range for second half
            gsap.set([section2TitleRef.current, section2DescriptionRef.current], {
              autoAlpha: 1 - fadeOutProgress,
              scale: 1.2 - (fadeOutProgress * 0.5) // Scale down from 1.2 to 0.7
            });
          }
        }
      });
    }, section2Ref);

    const ctx3 = gsap.context(() => {
      const tl3 = gsap.timeline({
        scrollTrigger: {
          trigger: section3Ref.current,
          start: "top bottom", 
          end: "bottom center",
          scrub: 1, // Smoother scrubbing with slight delay
          // markers: true,
        }
      });
    
      // Create background elements for transition effect
      const bgElements = [];
      for (let i = 0; i < 5; i++) {
        const el = document.createElement('div');
        el.className = 'absolute inset-0 transform-gpu';
        el.style.background = 'linear-gradient(135deg, #6366f1, #8b5cf6)';
        el.style.opacity = '0';
        el.style.zIndex = '-1';
        section3Ref.current.appendChild(el);
        bgElements.push(el);
      }
    
      // Set initial states
      // gsap.set(section3TitleRef.current, { 
      //   autoAlpha: 0, 
      //   y: 100,
      //   rotationX: 45
      // });
      
      gsap.set(section3DescriptionRef.current, { 
        autoAlpha: 0, 
        y: 80,
        scale: 0.8
      });
      
      gsap.set('.section3-word', { 
        autoAlpha: 0, 
        y: 40,
        rotationY: 40
      });
    
      // Background transition effect
      bgElements.forEach((el, i) => {
        tl3.to(el, {
          opacity: 0.7,
          duration: 0.4,
          ease: "power2.inOut"
        }, i * 0.1)
        .to(el, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut"
        }, i * 0.1 + 0.2);
      });
    
      // Text animations
      tl3.to(section3TitleRef.current, {
        autoAlpha: 1,
        y: 0,
        rotationX: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)"
      }, 0.3)
      
      // Animate each word in description separately
      .to('.section3-word', {
        autoAlpha: 1,
        y: 0,
        rotationY: 0,
        stagger: 0.0250,
        duration: 0.8,
        ease: "back.out(2.5)"
      }, 0.5)
      
      // Final fade-in for any remaining description elements
      .to(section3DescriptionRef.current, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out"
      }, 0.7);
    
      // Add floating animation for continuous movement
      gsap.to(section3TitleRef.current, {
        y: "-=15",
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    
    }, section3Ref);

    return () => {
        ctx1.revert();
        ctx2.revert();
        ctx3.revert();
    }
  }, []);

  return (
    <div ref={mainRef} className="bg-black text-white min-h-screen overflow-x-hidden">
      <Navbar />

      {/* --- First Section (Hero) --- */}
      <main className="container mx-auto px-6 pt-36 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-2xl">
            <h1
              ref={titleRef}
              className="text-6xl md:text-9xl font-bold mb-4 leading-tight tracking-tight text-left"
            >
              Creative <span className="text-purple-500">Digital</span> Experiences
            </h1>
            <p className="text-2xl md:text-xl mb-3 font-bold text-sky-500 uppercase">
              Stop managing knowledge. Start using it.
            </p>
            <p
              ref={descriptionRef}
              className="text-lg md:text-xl text-gray-200 mb-5 leading-relaxed text-left"
            >
              We craft meaningful digital experiences that connect brands with their audience through innovative design and technology.
            </p>
            <button
              ref={buttonRef}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full font-medium transition-colors duration-200 text-lg"
            >
              Explore Work
            </button>
          </div>

          <div className="relative h-full flex justify-center items-center">
            {/* Gradient backgrounds */}
            <div className="absolute -bottom-10 -right-10 w-96 h-96 bg-purple-600 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -top-10 -left-10 w-72 h-72 bg-blue-500 rounded-full opacity-15 blur-3xl"></div>

            {/* Main image */}
            <div
              ref={imageRef}
              className="relative z-10 w-full max-w-2xl rounded-lg overflow-hidden shadow-2xl will-change-transform"
            >
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format"
                alt="Abstract Design"
                className="w-full h-auto object-cover"
                style={{ aspectRatio: "16/9" }}
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </main>

      {/* --- Second Section --- */}
        <section ref={section2Ref} className="bg-black text-white min-h-screen flex items-center justify-end py-20">
        <div className="container mx-auto px-6 text-right will-change-transform">
          <h2 ref={section2TitleRef} className="text-4xl md:text-5xl font-bold mb-8 mr-15 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            Scroll-Driven Experience
          </h2>
          <p ref={section2DescriptionRef} className="text-lg md:text-xl text-gray-300 max-w-3xl ml-auto">
            This text gradually fades in as you scroll, grows in size through the middle of the section, and then fades away as you continue scrolling. The animation is directly tied to your scroll position for a seamless, interactive experience.
          </p>
        </div>
       </section>


      <section ref={section3Ref} className="bg-black text-white min-h-screen flex items-center justify-center py-20 relative overflow-hidden">
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 ref={section3TitleRef} className="text-5xl md:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Experience the Magic
        </h2>
        <p ref={section3DescriptionRef} className="text-lg md:text-4xl text-white max-w-8xl mx-auto">
          {/* Split text into words for individual animation */}
          {"This immersive journey transforms how you interact with content. Each element responds to your scrolling, creating a dynamic and engaging".split(' ').map((word, i) => (
            <span key={i} className="section3-word inline-block mx-1 my-2">{word}</span>
          ))}
        </p>
        
        {/* Add decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-60 h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
    </section>

    <Team/>
    <Contact/>
    
  </div>
  );
}

export default Home;