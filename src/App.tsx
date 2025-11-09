import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Education from './components/sections/Education';
import Contact from './components/sections/Contact';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('hero');

  return (
    <div className="relative bg-black text-white min-h-screen">
      <Sidebar activeSection={activeSection} />
      
      <main className="ml-0 md:ml-20">
        <div id="hero" className="section">
          <Hero setActiveSection={setActiveSection} />
        </div>
        
        <div id="about" className="section">
          <About setActiveSection={setActiveSection} />
        </div>
        
        <div id="skills" className="section">
          <Skills setActiveSection={setActiveSection} />
        </div>
        
        <div id="projects" className="section">
          <Projects setActiveSection={setActiveSection} />
        </div>
        
        <div id="education" className="section">
          <Education setActiveSection={setActiveSection} />
        </div>
        
        <div id="contact" className="section">
          <Contact setActiveSection={setActiveSection} />
        </div>
      </main>
    </div>
  );
}

export default App;