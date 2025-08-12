'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Code2, 
  Palette, 
  Zap, 
  Globe, 
  Database, 
  Smartphone,
  Monitor,
  Figma,
  Github,
  Coffee,
  Lightbulb,
  Target
} from 'lucide-react';
import { CONFIG } from '../lib/seo';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const skills = [
    {
      category: 'Frontend',
      icon: Monitor,
      items: ['React', 'Next.js', 'TypeScript', 'Vue.js', 'Angular', 'Tailwind CSS'],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      category: 'Backend',
      icon: Database,
      items: ['Node.js', 'Python', '.NET Core', 'ASP.NET', 'MongoDB', 'PostgreSQL'],
      color: 'from-green-500 to-emerald-500',
    },
    {
      category: 'Full Stack',
      icon: Code2,
      items: ['Next.js', 'MERN Stack', 'TypeScript', 'JavaScript', 'RESTful APIs', 'GraphQL'],
      color: 'from-purple-500 to-pink-500',
    },
    {
      category: 'Tools & Technologies',
      icon: Zap,
      items: ['Git', 'Docker', 'Google OAuth', 'Prisma', 'Vercel', 'VS Code'],
      color: 'from-orange-500 to-red-500',
    },
  ];

  const stats = [
    { label: 'Years of Experience', value: '3+', icon: Target },
    { label: 'Projects Completed', value: '15+', icon: Code2 },
    { label: 'Technologies Mastered', value: '15+', icon: Lightbulb },
    { label: 'Cups of Coffee', value: '∞', icon: Coffee },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 bg-background relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent rounded-full blur-3xl" />
      </div>

      <div className="container-width section-padding relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-3xl mx-auto text-balance">
            Passionate about creating digital experiences that make a difference. 
            Here&apos;s a bit about my journey and expertise.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Personal Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-foreground">
                My Journey
              </h3>
              <div className="space-y-4 text-foreground/80 leading-relaxed">
                <p>
                  I&apos;m a passionate Full Stack Developer and Software Engineer with a 
                  Bachelor&apos;s degree in Computer Engineering. I have extensive experience 
                  working with a wide range of technologies, but I&apos;m most comfortable 
                  and proficient with Next.js for building modern web applications.
                </p>
                <p>
                  My expertise spans across frontend frameworks like React, Vue.js, and 
                  Angular, as well as backend technologies including Node.js, Python, 
                  .NET Core, and ASP.NET. I&apos;m skilled in working with databases like 
                  MongoDB and PostgreSQL, and I have hands-on experience with authentication 
                  systems like Google OAuth.
                </p>
                <p>
                  What excites me most about technology is how every day brings new tools 
                  and innovations to the world. I&apos;m constantly learning and adapting to 
                  stay at the forefront of web development, always eager to explore the 
                  latest frameworks and best practices in full-stack development.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 pt-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="text-center p-4 rounded-xl bg-card/50 border border-border/50"
                  >
                    <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-foreground mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-foreground/60">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-foreground mb-8">
              Skills & Expertise
            </h3>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="space-y-6"
            >
              {skills.map((skillGroup, index) => {
                const Icon = skillGroup.icon;
                return (
                  <motion.div
                    key={skillGroup.category}
                    variants={itemVariants}
                    className="group"
                  >
                    <div className="card hover:border-primary/30 transition-all duration-300">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${skillGroup.color} bg-opacity-20`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="text-lg font-semibold text-foreground">
                          {skillGroup.category}
                        </h4>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {skillGroup.items.map((skill, skillIndex) => (
                          <motion.span
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                            transition={{ 
                              duration: 0.3, 
                              delay: 0.6 + index * 0.1 + skillIndex * 0.05 
                            }}
                            className="tech-tag text-sm group-hover:border-primary/30 transition-colors duration-200"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>

        {/* Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-foreground mb-6">
              My Development Philosophy
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                  <Code2 className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-lg font-semibold text-foreground">Clean Code</h4>
                <p className="text-foreground/70 text-sm">
                  Writing maintainable, scalable code that stands the test of time
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto">
                  <Globe className="w-6 h-6 text-accent" />
                </div>
                <h4 className="text-lg font-semibold text-foreground">User-Centric</h4>
                <p className="text-foreground/70 text-sm">
                  Prioritizing user experience and accessibility in every project
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                  <Lightbulb className="w-6 h-6 text-green-500" />
                </div>
                <h4 className="text-lg font-semibold text-foreground">Innovation</h4>
                <p className="text-foreground/70 text-sm">
                  Constantly learning and adopting cutting-edge technologies
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 border border-border/50">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Let&apos;s Build Something Amazing Together
            </h3>
            <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
              I&apos;m always excited to work on new projects and collaborate with 
              fellow developers, designers, and innovators.
            </p>
            <motion.a
              href={`mailto:${CONFIG.email}`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>Start a Conversation</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;