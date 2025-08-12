'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Github, 
  Linkedin, 
  Twitter,
  ExternalLink,
  Heart,
  ArrowUp
} from 'lucide-react';
import { CONFIG } from '../lib/seo';

const Footer = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission (replace with actual implementation)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { 
      icon: Github, 
      href: CONFIG.social.github, 
      label: 'GitHub',
      color: 'hover:text-gray-400'
    },
    { 
      icon: Linkedin, 
      href: CONFIG.social.linkedin, 
      label: 'LinkedIn',
      color: 'hover:text-blue-400'
    },
    { 
      icon: Twitter, 
      href: CONFIG.social.twitter, 
      label: 'Twitter',
      color: 'hover:text-sky-400'
    },
  ];

  const quickLinks = [
    { label: 'Home', href: 'hero' },
    { label: 'Projects', href: 'projects' },
    { label: 'About', href: 'about' },
    { label: 'Contact', href: 'contact' },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      id="contact"
      ref={sectionRef}
      className="bg-background-secondary relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </div>

      <div className="container-width section-padding relative z-10">
        {/* Contact Section */}
        <div className="py-20">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Let&apos;s <span className="gradient-text">Connect</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto text-balance">
              Have a project in mind or just want to chat about technology? 
              I&apos;d love to hear from you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-6">
                  Get in Touch
                </h3>
                <p className="text-foreground/70 mb-8 leading-relaxed">
                  I&apos;m always open to discussing new opportunities, creative projects, 
                  or potential collaborations. Feel free to reach out!
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-4">
                <motion.a
                  href={`mailto:${CONFIG.email}`}
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-4 p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-200 group"
                >
                  <div className="p-2 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors duration-200">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Email</div>
                    <div className="text-foreground/70 text-sm">{CONFIG.email}</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-foreground/40 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </motion.a>

                <motion.a
                  href={`tel:${CONFIG.phone}`}
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-4 p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-200 group"
                >
                  <div className="p-2 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors duration-200">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Phone</div>
                    <div className="text-foreground/70 text-sm">{CONFIG.phone}</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-foreground/40 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </motion.a>

                <div className="flex items-center space-x-4 p-4 rounded-xl bg-card/50 border border-border/50">
                  <div className="p-2 rounded-lg bg-accent/20">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Location</div>
                    <div className="text-foreground/70 text-sm">{CONFIG.location}</div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-4">
                  Follow Me
                </h4>
                <div className="flex items-center space-x-4">
                  {socialLinks.map((social) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        className={`p-3 rounded-xl bg-card/50 border border-border/50 hover:border-primary/50 text-foreground/60 ${social.color} transition-all duration-200`}
                        aria-label={social.label}
                      >
                        <Icon size={20} />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="card">
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  Send a Message
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 text-foreground placeholder-foreground/50"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 text-foreground placeholder-foreground/50"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground/80 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 text-foreground placeholder-foreground/50"
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground/80 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 text-foreground placeholder-foreground/50 resize-none"
                      placeholder="Tell me about your project or just say hello!"
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full btn-primary flex items-center justify-center space-x-2 ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Send size={18} />
                    )}
                    <span>
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </span>
                  </motion.button>
                  
                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-green-500 text-sm text-center"
                    >
                      Message sent successfully! I&apos;ll get back to you soon.
                    </motion.div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm text-center"
                    >
                      Something went wrong. Please try again or email me directly.
                    </motion.div>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="border-t border-border/50 pt-8 pb-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-foreground/60">
              <span>© {new Date().getFullYear()} {CONFIG.name}.</span>
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>and lots of coffee.</span>
            </div>

            {/* Quick Links */}
            <div className="flex items-center space-x-6">
              {quickLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-foreground/60 hover:text-foreground transition-colors duration-200 text-sm"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Back to Top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-card/50 border border-border/50 hover:border-primary/50 text-foreground/60 hover:text-primary transition-all duration-200"
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;