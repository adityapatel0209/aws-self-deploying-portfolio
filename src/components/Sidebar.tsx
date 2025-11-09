import React, { useState, useEffect } from 'react';
import { ChevronRight, User, Brain, Code, GraduationCap, Mail } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const menuItems = [
    { id: 'hero', label: 'Home', icon: <ChevronRight size={20} /> },
    { id: 'about', label: 'About', icon: <User size={20} /> },
    { id: 'skills', label: 'Skills', icon: <Brain size={20} /> },
    { id: 'projects', label: 'Projects', icon: <Code size={20} /> },
    { id: 'education', label: 'Education', icon: <GraduationCap size={20} /> },
    { id: 'contact', label: 'Contact', icon: <Mail size={20} /> },
  ];

  const handleClick = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          document.querySelectorAll('.nav-item').forEach((item) => {
            item.classList.remove('active');
          });
          document.querySelector(`.nav-item[data-id="${id}"]`)?.classList.add('active');
        }
      });
      },
      { threshold: 0.7 }
    );

    document.querySelectorAll('.section').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav 
      className="fixed top-8 left-1/2 -translate-x-1/2 z-50 backdrop-blur-lg bg-white/10 rounded-full p-2 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] border border-white/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center space-x-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className={`nav-item group relative p-3 rounded-full transition-all duration-300 ${
              activeSection === item.id 
                ? 'bg-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
            data-id={item.id}
          >
              {item.icon}
            {isHovered && (
              <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 backdrop-blur-sm rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {item.label}
            </span>
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;