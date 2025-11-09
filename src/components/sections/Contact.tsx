import React, { useEffect, useRef, useState } from 'react';
import { Send, Mail, Linkedin, Github, Twitter } from 'lucide-react';
import emailjs from '@emailjs/browser';

interface ContactProps {
  setActiveSection: (section: string) => void;
}

const Contact: React.FC<ContactProps> = ({ setActiveSection }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection('contact');
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Replace these with your actual EmailJS credentials
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: 'Aditya Patel', // Your name
      };

      await emailjs.send(
        'service_webz7th', // Replace with your EmailJS service ID
        'template_6ulkjay', // Replace with your EmailJS template ID
        templateParams,
        'k8RfW5gQuWpDyZMPo' // Replace with your EmailJS public key
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }
  };

  return (
    <div ref={sectionRef} className="flex flex-col justify-center w-full max-w-6xl mx-auto">
      <div className="space-y-12">
        <div className="fade-in">
          <h2 className="text-3xl md:text-4xl font-bold">Get In Touch</h2>
          <div className="w-16 h-1 bg-white mt-4"></div>
          <p className="text-gray-300 mt-6 max-w-2xl">
            Have a project in mind or want to discuss opportunities? Feel free to reach out.
            I'm always open to new challenges and collaborations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8 slide-in-left">
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center text-gray-300">
                  <Mail className="mr-3" size={20} />
                  <a href="mailto:ad02092004@gmail.com" className="hover:text-white transition-colors">
                    ad02092004@gmail.com
                  </a>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Connect With Me</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://github.com/adityapatel0209" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <Github size={20} />
                </a>
                <a 
                  href="https://www.linkedin.com/in/aditya-patel-52859a274/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Current Status</h3>
              <div className="bg-gray-900 p-4 rounded-lg">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-green-400">Available for opportunities</span>
                </div>
                <p className="text-gray-400 mt-2 text-sm">
                  I'm currently open to freelance projects, full-time positions, and collaborations.
                </p>
              </div>
            </div>
          </div>
          
          <div className="slide-in-right">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all"
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-3 bg-white text-black font-medium rounded flex items-center justify-center transition-colors duration-300 ${
                  isSubmitting ? 'opacity-70' : 'hover:bg-gray-200'
                } w-full md:w-auto`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Send size={18} className="mr-2" /> Send Message
                  </span>
                )}
              </button>
              
              {submitStatus === 'success' && (
                <div className="bg-green-900 bg-opacity-30 text-green-400 p-3 rounded-lg">
                  Your message has been sent successfully. I'll get back to you soon!
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="bg-red-900 bg-opacity-30 text-red-400 p-3 rounded-lg">
                  There was a problem sending your message. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-16 text-center fade-in">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Aditya Patel. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;