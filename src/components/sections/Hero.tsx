import React, { useEffect, useRef } from 'react';
import { ChevronDown, Github } from 'lucide-react';

interface HeroProps {
  setActiveSection: (section: string) => void;
}

const Hero: React.FC<HeroProps> = ({ setActiveSection }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection('hero');
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [setActiveSection]);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={sectionRef} className="flex flex-col justify-center w-full max-w-6xl mx-auto h-screen px-6 md:px-8">
      <div className="space-y-6">
        <div className="slide-in-left">
          <h2 className="text-xl md:text-2xl font-light text-gray-400">Hello, I'm</h2>
        </div>
        <div className="slide-in-left" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
            Aditya Patel
          </h1>
        </div>
        <div className="slide-in-left" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-300">
            Cloud & DevOps Engineer
          </h3>
        </div>
        <div className="slide-in-left" style={{ animationDelay: '0.6s' }}>
          <p className="text-gray-400 max-w-2xl mt-4 text-lg">
            I design secure, scalable AWS infrastructure, automate deployments with Terraform and CI/CD, and keep systems observable and resilient.
          </p>
        </div>
        <div className="slide-in-left flex flex-col sm:flex-row gap-4" style={{ animationDelay: '0.8s' }}>
          <button
            onClick={() => scrollToSection('projects')}
            className="group relative px-6 py-3 backdrop-blur-lg bg-white/10 rounded-full
              border border-white/20 overflow-hidden transition-all duration-300
              hover:border-white/40 hover:bg-white/20
              hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0
              translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            <span className="relative z-10">View Cloud Projects</span>
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="group relative px-6 py-3 backdrop-blur-lg bg-white/10 rounded-full
              border border-white/20 overflow-hidden transition-all duration-300
              hover:border-white/40 hover:bg-white/20
              hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0
              translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            <span className="relative z-10">Contact Me</span>
          </button>
          <a
            href="https://github.com/adityapatel0209"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-6 py-3 backdrop-blur-lg bg-white/10 rounded-full
              border border-white/20 overflow-hidden transition-all duration-300
              hover:border-white/40 hover:bg-white/20
              hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] inline-flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0
              translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            <Github className="relative z-10 mr-2" size={20} />
            <span className="relative z-10">GitHub</span>
          </a>
        </div>
      </div>

      <button 
        onClick={() => scrollToSection('about')} 
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce
          w-10 h-10 rounded-full backdrop-blur-lg bg-white/10 border border-white/20
          flex items-center justify-center
          hover:bg-white/20 hover:border-white/40 transition-all duration-300
          hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        aria-label="Scroll to next section"
      >
        <ChevronDown className="text-white" size={24} />
      </button>
    </div>
  );
};

export default Hero;