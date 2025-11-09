import React, { useEffect, useRef } from 'react';
import notionIcon from '../../assets/projects/notion-icon.png';
import { projectsData } from '../../data/portfolioData';

interface ProjectsProps {
  setActiveSection: (section: string) => void;
}

const Projects: React.FC<ProjectsProps> = ({ setActiveSection }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection('projects');
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
    <div ref={sectionRef} className="flex flex-col justify-center w-full max-w-6xl mx-auto px-2 md:px-6">
      <div className="space-y-16">
        <div className="fade-in">
          <h2 className="text-3xl md:text-4xl font-bold">Featured Projects</h2>
          <div className="w-16 h-1 bg-white mt-4"></div>
          <p className="text-gray-300 mt-6 max-w-2xl">
            Here are some of my notable projects that showcase my skills and approach to problem-solving.
          </p>
        </div>
        
        <div className="space-y-20">
          {projectsData.map((project, index) => (
            <article
              key={project.id}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gray-900/60 backdrop-blur p-6 md:p-8 transition-all duration-500 hover:border-white/20 hover:shadow-[0_0_35px_rgba(255,255,255,0.12)]"
              style={{ animationDelay: `${index * 0.12}s` }}
            >
              <div className="grid gap-6 md:grid-cols-[minmax(0,1.7fr)_minmax(0,2.3fr)]">
                <figure className="relative overflow-hidden rounded-xl border border-white/10">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent p-4 text-sm text-gray-300">
                    Cloud-native case study
                  </figcaption>
                </figure>

                <div className="flex flex-col justify-between gap-6">
                  <header className="space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-wide text-gray-300">
                      Featured build
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-semibold text-white">{project.title}</h3>
                      <p className="mt-3 text-gray-300 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </header>

                  <div className="space-y-6">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-gray-200 transition-colors duration-300 group-hover:border-white/25"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-4">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(255,255,255,0.25)]"
                        >
                          <span>Visit Site</span>
                        </a>
                      )}
                      {project.notionUrl && (
                        <a
                          href={project.notionUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-transform duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10"
                        >
                          <img src={notionIcon} alt="Notion" className="h-5 w-5" />
                          <span>Read Build Notes</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/0 transition-all duration-500 group-hover:border-white/20" />
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;