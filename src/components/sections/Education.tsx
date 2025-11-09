import React, { useEffect, useRef } from 'react';
import { Calendar } from 'lucide-react';
import { educationData } from '../../data/portfolioData';

interface EducationProps {
  setActiveSection: (section: string) => void;
}

const Education: React.FC<EducationProps> = ({ setActiveSection }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection('education');
        }
      },
      { threshold: 0.3 }
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
      <div className="space-y-12">
        <div className="fade-in">
          <h2 className="text-3xl md:text-4xl font-bold">Education & Certifications</h2>
          <div className="w-16 h-1 bg-white mt-4"></div>
          <p className="text-gray-300 mt-6 max-w-2xl">
            My educational background and professional certifications that have contributed to my development journey.
          </p>
        </div>
        
        <div className="space-y-12">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Formal Education</h3>
            <div className="space-y-8">
              {educationData.formal.map((edu, index) => (
                <div 
                  key={index} 
                  className="bg-gray-900 p-6 rounded-lg relative overflow-hidden slide-in-left"
                  style={{ animationDelay: `${0.2 * index}s` }}
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-white"></div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h4 className="text-lg font-semibold">{edu.degree}</h4>
                      <p className="text-gray-300">{edu.institution}</p>
                      <p className="text-gray-400 text-sm mt-1">{edu.description}</p>
                    </div>
                    <div className="flex items-center text-gray-400 whitespace-nowrap">
                      <Calendar size={16} className="mr-2" />
                      {edu.period}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Certifications & Courses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {educationData.certifications.map((cert, index) => (
                <div 
                  key={index} 
                  className="bg-gray-900 p-5 rounded-lg hover:bg-gray-800 transition-colors duration-300 slide-up"
                  style={{ animationDelay: `${0.15 * index}s` }}
                >
                  <h4 className="font-semibold">{cert.title}</h4>
                  <p className="text-gray-300 text-sm">{cert.issuer}</p>
                  <div className="flex items-center text-gray-400 text-sm mt-2">
                    <Calendar size={14} className="mr-2" />
                    {cert.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;