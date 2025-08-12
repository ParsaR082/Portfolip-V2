import type { Metadata } from 'next';

export const CONFIG = {
  name: 'Parsa Rahmani',
  title: 'Parsa Rahmani - Full Stack Developer',
  description: 'Full Stack Developer and Software Engineer specializing in Next.js, React, and modern web technologies. Creating innovative digital solutions with expertise in both frontend and backend development.',
  url: 'https://parsarahmani.dev',
  ogImage: '/og-image.jpg',
  email: 'prahmani082@gmail.com',
  phone: '+989145120736',
  location: 'Iran',
  social: {
    github: 'https://github.com/ParsaR082',
    linkedin: '',
    twitter: '',
  },
  skills: [
    'Next.js',
    'React',
    'TypeScript',
    'JavaScript',
    'Vue.js',
    'Angular',
    'Node.js',
    'Python',
    '.NET Core',
    'ASP.NET',
    'MongoDB',
    'PostgreSQL',
  ],
  tools: [
    'VS Code',
    'Git',
    'Docker',
    'Google OAuth',
    'Prisma',
    'Vercel',
  ],
};

export const seoConfig: Metadata = {
  title: {
    default: CONFIG.title,
    template: `%s | ${CONFIG.name}`,
  },
  description: CONFIG.description,
  keywords: [
    'Full Stack Developer',
    'React Developer',
    'Next.js',
    'TypeScript',
    '3D Web Development',
    'Three.js',
    'WebGL',
    'Frontend Developer',
    'Backend Developer',
  ],
  authors: [{ name: CONFIG.name, url: CONFIG.url }],
  creator: CONFIG.name,
  publisher: CONFIG.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(CONFIG.url),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: CONFIG.url,
    title: CONFIG.title,
    description: CONFIG.description,
    siteName: CONFIG.name,
    images: [
      {
        url: CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: `${CONFIG.name} - Portfolio`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: CONFIG.title,
    description: CONFIG.description,
    images: [CONFIG.ogImage],
    creator: '@ParsaR082',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: CONFIG.name,
  url: CONFIG.url,
  image: `${CONFIG.url}${CONFIG.ogImage}`,
  description: CONFIG.description,
  jobTitle: 'Full Stack Developer',
  worksFor: {
    '@type': 'Organization',
    name: 'Freelance',
  },
  sameAs: Object.values(CONFIG.social),
  knowsAbout: CONFIG.skills,
};