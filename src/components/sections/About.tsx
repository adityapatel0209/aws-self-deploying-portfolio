import React, { useEffect, useRef } from 'react';
import hackathonImage from '../../data/hackathon.jpg';
import { aboutData, certificationsData } from '../../data/portfolioData';
import AwsCloudIcon from '../../assets/aws/aws-cloud.svg';

interface AboutProps {
  setActiveSection: (section: string) => void;
}

const About: React.FC<AboutProps> = ({ setActiveSection }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection('about');
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

  return (
    <div ref={sectionRef} className="flex flex-col justify-center w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6 fade-in">
          <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
          <div className="w-16 h-1 bg-white"></div>
          {aboutData.paragraphs.map((text, index) => (
            <p
              key={index}
              className={index === 0 ? "text-gray-300 text-lg" : "text-gray-400"}
            >
              {text}
            </p>
          ))}
          
          <div className="flex flex-wrap gap-4 mt-6">
            {aboutData.tags.map((tag) => (
              <div key={tag} className="bg-gray-800 px-4 py-2 rounded-full text-sm">
                {tag}
              </div>
            ))}
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-3">Certifications</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {certificationsData.map((c) => (
                <a
                  key={c.id}
                  href={c.verifyUrl || '#'}
                  target={c.verifyUrl ? '_blank' : undefined}
                  rel={c.verifyUrl ? 'noopener noreferrer' : undefined}
                  className="flex items-start gap-3 border border-white/10 rounded-lg p-3 hover:border-white/20 transition"
                >
                  <img
                    src={AwsCloudIcon}
                    alt="AWS"
                    className="w-6 h-6 mt-0.5"
                  />
                  <div>
                    <p className="text-sm text-white font-medium">{c.title}</p>
                    <p className="text-xs text-gray-400">{c.issuer} • {c.date}</p>
                    {c.verifyUrl && (
                      <span className="text-xs underline text-gray-200">Verify</span>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="relative h-80 md:h-[500px] w-full rounded-lg overflow-hidden slide-in-right">
          <div></div>
          <img 
            src={hackathonImage} 
            alt="Aditya Patel" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
            <p className="text-2xl font-semibold">Aditya Patel</p>
            <p className="text-gray-300">Cloud & DevOps Engineer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;