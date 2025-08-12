export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Task Manager',
    description: 'A comprehensive task manager with analytics and database integration built with Next.js',
    longDescription: 'A full-featured task management application with user authentication via Google OAuth, comprehensive analytics dashboard, and robust database integration. Features include task creation, assignment, progress tracking, and detailed analytics to help users manage their productivity effectively.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop&crop=center',
    technologies: ['Next.js', 'Google OAuth', 'MongoDB', 'TypeScript', 'Prisma'],
    githubUrl: 'https://github.com/ParsaR082/Task-Manager',
    featured: true,
  },
  {
    id: '2',
    title: 'Full Stack E-Commerce Platform',
    description: 'Modern e-commerce solution with advanced features and seamless user experience',
    longDescription: 'A complete e-commerce platform built with Next.js featuring product management, shopping cart, secure payment processing, and admin dashboard. Includes user authentication, order tracking, and responsive design for optimal mobile experience.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=center',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
    githubUrl: 'https://github.com/ParsaR082',
    featured: true,
  },
  {
    id: '3',
    title: 'Real-time Chat Application',
    description: 'Modern chat application with real-time messaging and file sharing capabilities',
    longDescription: 'A sophisticated real-time chat application built with modern web technologies. Features include instant messaging, file sharing, user presence indicators, message history, and group chat functionality with a clean, intuitive interface.',
    image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=600&h=400&fit=crop&crop=center',
    technologies: ['React', 'Socket.io', 'Node.js', 'MongoDB', 'Express'],
    githubUrl: 'https://github.com/ParsaR082',
    featured: false,
  },
  {
     id: '4',
     title: 'Portfolio Website',
     description: 'Interactive 3D portfolio website showcasing projects and skills',
     longDescription: 'A modern, interactive portfolio website built with Next.js and Three.js featuring 3D animations, smooth transitions, and responsive design. Showcases projects, skills, and experience with an engaging user interface and optimized performance.',
     image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center',
     technologies: ['Next.js', 'Three.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
     githubUrl: 'https://github.com/ParsaR082',
     featured: false,
   },
];

export const featuredProjects = projects.filter(project => project.featured);