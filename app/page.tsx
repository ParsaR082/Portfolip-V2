'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import Header from '../components/Header';
import Projects from '../components/Projects';
import About from '../components/About';
import Footer from '../components/Footer';
import { Loader3D } from '../components/Three/Loader';

// Dynamic import for Hero3D to reduce initial bundle size
const Hero3D = dynamic(() => import('../components/Hero3D'), {
  ssr: false,
  loading: () => <Loader3D />,
});

export default function HomePage() {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="relative">
        {/* Hero Section with 3D */}
        <section id="hero" className="relative">
          <Suspense fallback={<Loader3D />}>
            <Hero3D onScrollToProjects={scrollToProjects} />
          </Suspense>
        </section>

        {/* Projects Section */}
        <section id="projects" className="relative">
          <Projects />
        </section>

        {/* About Section */}
        <section id="about" className="relative">
          <About />
        </section>
      </main>

      {/* Footer with Contact */}
      <Footer />
    </>
  );
}