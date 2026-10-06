'use client';

import { useEffect, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUpLeft,
  Briefcase,
  Check,
  ChevronDown,
  Code2,
  ExternalLink,
  Github,
  GraduationCap,
  Menu,
  Sparkles,
  X,
  Zap,
} from 'lucide-react';
import Image from 'next/image';
import CinematicIntro from '../components/CinematicIntro';
import SectionScrollController from '../components/SectionScrollController';
import KineticLetterHeading from '../components/KineticLetterHeading';
import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
  ClipReveal,
  ScaleFade,
  SlideIn,
  LineDraw,
  ScrollProvider,
  useScrollDir,
  ease,
} from '../components/MotionPrimitives';

const sectionIds = [
  'hero',
  'about',
  'experience',
  'skills',
  'projects',
  'education',
  'contact',
];

const skills = [
  { label: 'TypeScript', group: 'برنامه‌نویسی' },
  { label: 'JavaScript', group: 'برنامه‌نویسی' },
  { label: 'Python', group: 'هوش مصنوعی' },
  { label: 'C#', group: 'برنامه‌نویسی' },
  { label: 'Next.js', group: 'توسعه وب' },
  { label: 'React', group: 'توسعه وب' },
  { label: 'Node.js', group: 'توسعه وب' },
  { label: 'Tailwind CSS', group: 'توسعه وب' },
  { label: 'REST API', group: 'توسعه وب' },
  { label: 'PyTorch', group: 'هوش مصنوعی' },
  { label: 'Optuna', group: 'هوش مصنوعی' },
  { label: 'PINNs', group: 'هوش مصنوعی' },
  { label: 'Neural Architecture Search', group: 'هوش مصنوعی' },
  { label: 'PostgreSQL', group: 'پایگاه داده' },
  { label: 'MongoDB', group: 'پایگاه داده' },
  { label: 'MySQL', group: 'پایگاه داده' },
  { label: 'Redis', group: 'پایگاه داده' },
  { label: 'Supabase', group: 'پایگاه داده' },
  { label: 'Prisma', group: 'ابزارها' },
  { label: 'Git / GitHub', group: 'ابزارها' },
  { label: 'Docker', group: 'ابزارها' },
  { label: 'Linux', group: 'ابزارها' },
  { label: 'Vercel', group: 'ابزارها' },
];

const projects = [
  {
    number: '۰۱',
    title: 'PINN-NAS',
    category: 'هوش مصنوعی و یادگیری عمیق',
    description:
      'پروژه کارشناسی برای بهینه‌سازی معماری شبکه‌های Physics-Informed Neural Networks با جست‌وجوی خودکار معماری و ارزیابی معماری‌های مختلف بر اساس خطای مدل.',
    stack: 'Python · PyTorch · Optuna · PINNs',
    featured: true,
    link: 'https://github.com/ParsaR082/PINN-NAS',
    image: '/projects/pinn-nas.jpg',
  },
  {
    number: '۰۲',
    title: 'سامانه مدیریت مدرسه',
    category: 'پروژه واقعی · فول‌استک',
    description:
      'سامانه مدیریت مدرسه با داشبورد فارسی و راست‌به‌چپ، مدیریت اطلاعات و ارتباط با پایگاه داده. لینک و تصاویر پروژه در نسخه نهایی اضافه می‌شوند.',
    stack: 'Next.js · TypeScript · Supabase · PostgreSQL',
    link: 'https://school-management-beryl-one.vercel.app/',
    image: '/projects/school-manager.png', // 👈 عکس پروژه دوم (مثلاً: '/projects/school.jpg')
  },
  {
    number: '۰۳',
    title: 'NeoPlan',
    category: 'وب · فول‌استک',
    description:
      'پلتفرم هوشمند مدیریت و برنامه‌ریزی اهداف، یکپارچه‌سازی پروژه‌ها و پیگیری تسک‌ها با پایگاه‌داده بلادرنگ و استقرار ابری.',
    stack: 'Next.js · TypeScript · Supabase · PostgreSQL · Tailwind CSS',
    link: 'https://neoplan-kappa.vercel.app/',
    image: '/projects/neoplan.png',
  },
  {
    number: '۰۴',
    title: 'Architecture Studio',
    category: 'وب · فرانت‌اند / موشن',
    description:
      'وب‌سایت تعاملی و مدرن استودیوی معماری با جلوه‌ها و ترنزیشن‌های حرکتی سینمایی (Cinematic Reveals)، طراحی مینیمال و عملکرد بهینه.',
    stack: 'Next.js 15 · TypeScript · Tailwind CSS · Motion / GSAP',
    link: 'https://studio-ten-teal-18.vercel.app/',
    image: '/projects/studio.png',
  },
];


const experience = [
  {
    period: '۱۴۰۲ — ۱۴۰۵',
    title: 'توسعه‌دهنده نرم‌افزار و فول‌استک',
    company: 'فریلنسر',
    points: [
      'توسعه و تحویل ۳ پروژه واقعی شامل دو سامانه فروشگاهی و یک سامانه مدیریت مدرسه.',
      'پیاده‌سازی پروژه‌های فول‌استک از رابط کاربری و API تا پایگاه داده و استقرار.',
      'توسعه، نگهداری و بهبود قابلیت‌های پروژه‌های موجود بر اساس نیاز مشتری.',
      'عیب‌یابی و رفع مشکلات فنی و شخصی‌سازی قابلیت‌ها متناسب با نیاز هر پروژه.',
    ],
  },
];

const groups = ['همه', 'برنامه‌نویسی', 'توسعه وب', 'هوش مصنوعی', 'پایگاه داده', 'ابزارها'];

function PortfolioContent() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState('همه');
  const [progress, setProgress] = useState(0);
  const [introPhase, setIntroPhase] = useState<'playing' | 'transforming' | 'settled'>('playing');
  const [activeSection, setActiveSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollDir = useScrollDir();

  // Responsive mobile detection for Opening & layout
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const startTransformation = useCallback(() => {
    setIntroPhase((current) => {
      if (current !== 'playing') return current;
      setTimeout(() => {
        setIntroPhase('settled');
      }, 1200);
      return 'transforming';
    });
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const filteredSkills =
    activeGroup === 'همه'
      ? skills
      : skills.filter((skill) => skill.group === activeGroup);

  const navItems = [
    ['درباره من', 'about'],
    ['تجربه', 'experience'],
    ['مهارت‌ها', 'skills'],
    ['پروژه‌ها', 'projects'],
    ['تحصیلات', 'education'],
  ];

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    if (typeof window !== 'undefined' && (window as any).__portfolioNavigateTo) {
      (window as any).__portfolioNavigateTo(id);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Hero reversible entrance and exit:
  // When activeSection === 0 and introPhase !== 'playing': Hero elements are visible.
  // When activeSection > 0: Hero elements subtly exit toward the top!
  // When activeSection returns to 0: Hero elements animate back in!
  const isHeroInView = introPhase === 'settled' ? activeSection === 0 : introPhase !== 'playing';
  const heroExitY = scrollDir === 'down' ? -22 : 22;

  return (
    <div dir="rtl" className="site-shell">
      {/* Scroll progress line */}
      <div
        className="scroll-progress"
        style={{
          width: `${progress}%`,
          opacity: introPhase === 'settled' ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}
      />

      {/* Ambient background glows */}
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="ambient ambient-three" />

      {/* Navigation Topbar with motion system */}
      <header
        className="topbar"
        style={{
          transform: introPhase === 'playing' ? 'translateY(-60px)' : 'translateY(0)',
          opacity: introPhase === 'playing' ? 0 : 1,
          transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease',
          pointerEvents: introPhase === 'settled' ? 'auto' : 'none',
        }}
      >
        <div className="nav-wrap">
          <button
            className="brand"
            onClick={() => scrollTo('hero')}
            aria-label="بازگشت به ابتدای صفحه"
          >
            <motion.span
              className="brand-mark"
              whileHover={{ scale: 1.08, rotate: 50 }}
              transition={{ duration: 0.25 }}
            >
              <span />
            </motion.span>
            <span>پارسا رحمانی</span>
          </button>

          {/* Desktop Navigation with animated active pill indicator */}
          <nav className="desktop-nav" aria-label="ناوبری اصلی">
            {navItems.map(([label, id], index) => {
              const isActive = activeSection === index + 1;
              return (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`desktop-nav-link ${isActive ? 'is-active' : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span>{label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="nav-active-pill"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="nav-actions">
            <motion.a
              href="https://github.com/ParsaR082"
              target="_blank"
              rel="noreferrer"
              className="icon-button"
              aria-label="گیت‌هاب"
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={18} />
            </motion.a>
            <motion.button
              className="nav-cta"
              onClick={() => scrollTo('contact')}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              ارتباط
              <ArrowLeft size={16} />
            </motion.button>
            <motion.button
              className="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'بستن منو' : 'باز کردن منو'}
              whileTap={{ scale: 0.92 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={21} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={21} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Drawer with staggered motion */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="mobile-nav"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.3, ease: ease.smooth }}
            >
              <StaggerContainer stagger={0.06} delay={0.05} className="mobile-nav-inner">
                {navItems.map(([label, id], index) => {
                  const isActive = activeSection === index + 1;
                  return (
                    <StaggerItem key={id}>
                      <button
                        onClick={() => scrollTo(id)}
                        className={`mobile-nav-item ${isActive ? 'is-active' : ''}`}
                      >
                        <span className="mobile-nav-label">{label}</span>
                        {isActive && <span className="mobile-nav-dot" />}
                      </button>
                    </StaggerItem>
                  );
                })}
                <StaggerItem>
                  <button
                    onClick={() => scrollTo('contact')}
                    className="mobile-nav-item mobile-nav-cta-item"
                  >
                    <span className="mobile-nav-label">ارتباط</span>
                    <ArrowLeft size={16} />
                  </button>
                </StaggerItem>
              </StaggerContainer>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Controlled Section Scrolling architecture */}
      <SectionScrollController
        sectionIds={sectionIds}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isIntroActive={introPhase !== 'settled'}
      >
        <main>
          {/* ========================================================
              HERO SECTION
              1. Kinetic intro kinetic typography (one-time on page load)
              2. Single persistent motorcycle backdrop (Opening -> Hero)
              3. Fully reversible Hero content elements
              ======================================================== */}
          <section id="hero" className="hero section container">
            {/* 1. CINEMATIC INTRO (Kinetic typography backdrop during opening) */}
            <CinematicIntro phase={introPhase} onStartTransform={startTransformation} />

            {/* 2. PERSISTENT PHOTO BACKDROP (Single Shared Layer: Opening Frame -> Hero Background) */}
            <div
              className="hero-photo-stage"
              onClick={introPhase === 'playing' ? startTransformation : undefined}
              style={{
                cursor: introPhase === 'playing' ? 'pointer' : 'default',
                pointerEvents: introPhase === 'playing' ? 'auto' : 'none',
              }}
            >
              <motion.div
                className="hero-persistent-photo-wrapper"
                animate={
                  introPhase === 'playing'
                    ? {
                      width: isMobile ? 'min(90vw, 390px)' : 'min(940px, 90vw)',
                      height: isMobile ? 'clamp(340px, 56vh, 460px)' : 'min(528px, 50.6vw)',
                      borderRadius: isMobile ? '20px' : '26px',
                      boxShadow:
                        '0 35px 120px rgba(0, 0, 0, 0.95), 0 0 0 1px rgba(255, 255, 255, 0.15), 0 0 55px rgba(183, 255, 74, 0.18)',
                    }
                    : {
                      width: '100%',
                      height: '100%',
                      borderRadius: '0px',
                      boxShadow: 'none',
                    }
                }
                transition={{
                  duration: 1.35,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Image
                  src="/hero-bg.jpg"
                  alt="پارسا رحمانی - Parsa Rahmani"
                  fill
                  priority
                  sizes="100vw"
                  className="hero-persistent-photo"
                />
                <motion.div
                  className="hero-photo-overlay"
                  animate={{
                    opacity: introPhase === 'playing' ? 0.18 : 0.65,
                  }}
                  transition={{ duration: 1.35 }}
                />
              </motion.div>
            </div>

            {/* 3. HERO CONTENT (Direction-aware reversible staged entrance/exit) */}
            <motion.div
              className="hero-content"
              initial={{ opacity: 0, y: 24 }}
              animate={
                isHeroInView
                  ? { opacity: 1, y: 0, pointerEvents: 'auto' }
                  : { opacity: 0, y: heroExitY, pointerEvents: 'none' }
              }
              transition={{
                duration: isHeroInView ? 0.8 : 0.45,
                delay: introPhase === 'transforming' ? 0.45 : 0,
                ease: ease.cinematic,
              }}
            >
              {/* Eyebrow */}
              <motion.div
                className="eyebrow"
                initial={{ opacity: 0, y: 16 }}
                animate={
                  isHeroInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: heroExitY * 0.7 }
                }
                transition={{
                  duration: 0.6,
                  delay: introPhase === 'transforming' ? 0.48 : (isHeroInView ? 0.08 : 0),
                  ease: ease.cinematic,
                }}
              >
                <span className="eyebrow-dot" />
                مهندس نرم‌افزار · هوش مصنوعی
              </motion.div>

              {/* Main Heading H1 */}
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={
                  isHeroInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: heroExitY }
                }
                transition={{
                  duration: 0.75,
                  delay: introPhase === 'transforming' ? 0.6 : (isHeroInView ? 0.16 : 0),
                  ease: ease.cinematic,
                }}
              >
                ایده‌ها را به
                <span className="gradient-word"> تجربه‌های دیجیتال </span>
                تبدیل می‌کنم.
              </motion.h1>

              {/* Description Copy */}
              <motion.p
                className="hero-copy"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isHeroInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: heroExitY * 0.8 }
                }
                transition={{
                  duration: 0.7,
                  delay: introPhase === 'transforming' ? 0.72 : (isHeroInView ? 0.24 : 0),
                  ease: ease.cinematic,
                }}
              >
                توسعه‌دهنده نرم‌افزار با تمرکز بر ساخت محصولات فول‌استک و تجربه عملی
                در هوش مصنوعی و یادگیری عمیق؛ از معماری و کدنویسی تا حل مسئله و
                استقرار نهایی.
              </motion.p>

              {/* Buttons CTA */}
              <motion.div
                className="hero-actions"
                initial={{ opacity: 0, y: 18 }}
                animate={
                  isHeroInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: heroExitY * 0.8 }
                }
                transition={{
                  duration: 0.7,
                  delay: introPhase === 'transforming' ? 0.84 : (isHeroInView ? 0.32 : 0),
                  ease: ease.cinematic,
                }}
              >
                <motion.button
                  className="primary-button"
                  onClick={() => scrollTo('projects')}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  مشاهده پروژه‌ها
                  <ArrowLeft size={17} />
                </motion.button>
                <motion.a
                  href="https://github.com/ParsaR082"
                  target="_blank"
                  rel="noreferrer"
                  className="secondary-button"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Github size={17} />
                  GitHub
                </motion.a>
              </motion.div>

              {/* Secondary Metadata Tags */}
              <motion.div
                className="hero-meta"
                initial={{ opacity: 0, y: 14 }}
                animate={
                  isHeroInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: heroExitY * 0.6 }
                }
                transition={{
                  duration: 0.7,
                  delay: introPhase === 'transforming' ? 0.96 : (isHeroInView ? 0.4 : 0),
                  ease: ease.cinematic,
                }}
              >
                <span><Check size={15} /> فارغ‌التحصیل مهندسی کامپیوتر</span>
                <span><Check size={15} /> ۳ سال تجربه فریلنسری</span>
                <span><Check size={15} /> انگلیسی متوسط رو به بالا</span>
              </motion.div>
            </motion.div>

            {/* 4. HERO ART (Interactive Code Card, orbits, floating chips) */}
            <motion.div
              className="hero-art"
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={
                isHeroInView
                  ? { opacity: 1, scale: 1, y: 0, pointerEvents: 'auto' }
                  : { opacity: 0, scale: 0.95, y: heroExitY, pointerEvents: 'none' }
              }
              transition={{
                duration: isHeroInView ? 0.9 : 0.45,
                delay: introPhase === 'transforming' ? 0.65 : (isHeroInView ? 0.18 : 0),
                ease: ease.cinematic,
              }}
            >
              <div className="orbit orbit-a" />
              <div className="orbit orbit-b" />
              <div className="orbit orbit-c" />
              <motion.div
                className="code-card"
                animate={{ y: [0, -10, 0], rotate: [0, 0.6, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ y: -14, scale: 1.02 }}
              >
                <div className="code-top">
                  <span /><span /><span />
                  <small>portfolio.tsx</small>
                </div>
                <div className="code-body" dir="ltr">
                  <span className="line muted">01</span><span className="pink">const</span> <span className="blue">developer</span> = {'{'}<br />
                  <span className="line muted">02</span>&nbsp;&nbsp;name: <span className="green">&quot;Parsa&quot;</span>,<br />
                  <span className="line muted">03</span>&nbsp;&nbsp;focus: [<span className="green">&quot;AI&quot;</span>, <span className="green">&quot;Full-Stack&quot;</span>],<br />
                  <span className="line muted">04</span>&nbsp;&nbsp;build: <span className="yellow">true</span>,<br />
                  <span className="line muted">05</span>&nbsp;&nbsp;curiosity: <span className="yellow">∞</span><br />
                  <span className="line muted">06</span>{'}'}
                </div>
                <div className="code-glow" />
              </motion.div>
              <div className="floating-chip chip-one"><Code2 size={15} /> فول‌استک</div>
              <div className="floating-chip chip-two"><Sparkles size={15} /> هوش مصنوعی</div>
              <div className="floating-chip chip-three"><Zap size={15} /> حل مسئله</div>
            </motion.div>

            {/* 5. SCROLL CUE */}
            <motion.button
              className="scroll-cue"
              onClick={() => scrollTo('about')}
              aria-label="ادامه"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHeroInView && introPhase === 'settled' ? 1 : 0 }}
              transition={{ duration: 0.5, delay: isHeroInView ? 0.9 : 0 }}
              style={{ pointerEvents: isHeroInView && introPhase === 'settled' ? 'auto' : 'none' }}
            >
              <span>ادامه</span>
              <ChevronDown size={17} />
            </motion.button>
          </section>

          {/* ========================================================
              ABOUT SECTION (Fully reversible entrance & exit)
              ======================================================== */}
          <section id="about" className="section section-dark">
            <div className="container">
              <FadeUp className="section-heading" delay={0.05} margin="-6% 0px -6% 0px">
                <KineticLetterHeading
                  text="مهندسی با ذهنیت حل مسئله."
                  kicker="۰۱ / درباره من"
                  isActive={activeSection === 1}
                  highlightWords={['حل', 'مسئله.']}
                />
              </FadeUp>

              <div className="about-grid">
                <div className="about-main">
                  <ClipReveal direction="up" delay={0.1} duration={0.8} margin="-6% 0px -6% 0px">
                    <p className="large-text">
                      مسیر من از توسعه نرم‌افزار شروع شده و به ترکیب آن با هوش مصنوعی
                      رسیده است. در پروژه‌های واقعی، از طراحی رابط کاربری و منطق سمت
                      سرور تا پایگاه داده و استقرار، روی محصول به‌صورت یکپارچه کار
                      می‌کنم.
                    </p>
                  </ClipReveal>

                  <FadeUp delay={0.2} distance={18} exitDistance={14} margin="-6% 0px -6% 0px">
                    <p>
                      تجربه فریلنسری به من یاد داده است که هر پروژه فقط کدنویسی نیست؛
                      درک مسئله، پیدا کردن راه‌حل، سازگار شدن با نیازهای جدید و
                      پشتکار در برابر خطاها بخش جدایی‌ناپذیر توسعه یک محصول خوب است.
                    </p>
                  </FadeUp>
                </div>

                <StaggerContainer stagger={0.1} delay={0.15} margin="-6% 0px -6% 0px" className="about-side">
                  <StaggerItem>
                    <motion.div
                      className="stat-card"
                      whileHover={{ x: -6, borderColor: 'rgba(183, 255, 74, 0.35)' }}
                      transition={{ duration: 0.25 }}
                    >
                      <strong>۰۳+</strong>
                      <span>سال تجربه فریلنسری</span>
                    </motion.div>
                  </StaggerItem>
                  <StaggerItem>
                    <motion.div
                      className="stat-card"
                      whileHover={{ x: -6, borderColor: 'rgba(183, 255, 74, 0.35)' }}
                      transition={{ duration: 0.25 }}
                    >
                      <strong>۰۳</strong>
                      <span>پروژه واقعی تحویل‌شده</span>
                    </motion.div>
                  </StaggerItem>
                  <StaggerItem>
                    <motion.div
                      className="stat-card"
                      whileHover={{ x: -6, borderColor: 'rgba(183, 255, 74, 0.35)' }}
                      transition={{ duration: 0.25 }}
                    >
                      <strong>∞</strong>
                      <span>یادگیری و ساختن</span>
                    </motion.div>
                  </StaggerItem>
                </StaggerContainer>
              </div>
            </div>
          </section>

          {/* ========================================================
              EXPERIENCE SECTION (Fully reversible timeline & items)
              ======================================================== */}
          <section id="experience" className="section">
            <div className="container">
              <FadeUp className="section-heading" delay={0.05} margin="-6% 0px -6% 0px">
                <KineticLetterHeading
                  text="چیزهایی که در دنیای واقعی ساخته‌ام."
                  kicker="۰۲ / تجربه"
                  isActive={activeSection === 2}
                  highlightWords={['دنیای', 'واقعی']}
                />
              </FadeUp>

              <div className="timeline">
                <LineDraw className="timeline-stem-line" orientation="vertical" duration={0.85} margin="-6% 0px -6% 0px" />

                {experience.map((item) => (
                  <div key={item.period} className="timeline-item">
                    <SlideIn from="right" delay={0.08} distance={18} margin="-6% 0px -6% 0px" className="timeline-period">
                      {item.period}
                    </SlideIn>

                    <ScaleFade delay={0.16} fromScale={0.3} margin="-6% 0px -6% 0px" className="timeline-dot-wrap">
                      <div className="timeline-dot" />
                    </ScaleFade>

                    <FadeUp delay={0.15} distance={22} exitDistance={16} margin="-6% 0px -6% 0px" className="timeline-content">
                      <div className="experience-icon">
                        <Briefcase size={19} />
                      </div>
                      <h3>{item.title}</h3>
                      <div className="muted-label">{item.company}</div>
                      <StaggerContainer stagger={0.06} delay={0.18} margin="-6% 0px -6% 0px" className="experience-points">
                        {item.points.map((point) => (
                          <StaggerItem key={point}>
                            <li>{point}</li>
                          </StaggerItem>
                        ))}
                      </StaggerContainer>
                    </FadeUp>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ========================================================
              SKILLS SECTION (Fully reversible tabs & skill pills)
              ======================================================== */}
          <section id="skills" className="section section-dark">
            <div className="container">
              <FadeUp className="section-heading" delay={0.05} margin="-6% 0px -6% 0px">
                <KineticLetterHeading
                  text="ابزارهایی برای ساختن."
                  kicker="۰۳ / مهارت‌ها"
                  isActive={activeSection === 3}
                  highlightWords={['ساختن.']}
                />
              </FadeUp>

              <div className="skills-panel">
                <FadeUp delay={0.1} distance={16} margin="-6% 0px -6% 0px" className="skill-tabs-wrap">
                  <div className="skill-tabs" role="tablist">
                    {groups.map((group) => {
                      const isSelected = activeGroup === group;
                      return (
                        <button
                          key={group}
                          role="tab"
                          aria-selected={isSelected}
                          className={`skill-tab-btn ${isSelected ? 'active' : ''}`}
                          onClick={() => setActiveGroup(group)}
                        >
                          <span>{group}</span>
                          {isSelected && (
                            <motion.div
                              layoutId="activeSkillTab"
                              className="skill-tab-pill"
                              transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </FadeUp>

                <motion.div layout className="skill-cloud">
                  <AnimatePresence mode="popLayout">
                    {filteredSkills.map((skill, index) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{
                          duration: 0.35,
                          delay: index * 0.015,
                          ease: ease.smooth,
                        }}
                        key={skill.label}
                        className="skill-pill"
                        whileHover={{ y: -3, scale: 1.04 }}
                      >
                        <span className="skill-pulse" />
                        {skill.label}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ========================================================
              PROJECTS SECTION (Tall section - cards enter & exit individually)
              ======================================================== */}
          <section id="projects" className="section projects-section">
            <div className="container">
              <FadeUp className="section-heading heading-row" delay={0.05} margin="-6% 0px -6% 0px">
                <div>
                  <KineticLetterHeading
                    text="کارهایی که داستان دارند."
                    kicker="۰۴ / پروژه‌ها"
                    isActive={activeSection === 4}
                    highlightWords={['داستان', 'دارند.']}
                  />
                </div>
                <span className="heading-note">پروژه‌های منتخب</span>
              </FadeUp>

              <div className="project-list">
                {projects.map((project) => {
                  const hasLink = Boolean(project.link);
                  const CardWrapper = hasLink ? motion.a : motion.div;

                  return (
                    <FadeUp
                      key={project.title}
                      delay={0.06}
                      distance={26}
                      exitDistance={20}
                      margin="-6% 0px -6% 0px"
                      className="project-card-wrap"
                    >
                      <CardWrapper
                        className="project-card"
                        {...(hasLink
                          ? {
                            href: project.link,
                            target: '_blank',
                            rel: 'noreferrer',
                          }
                          : {})}
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.28, ease: ease.smooth }}
                      >
                        <div className="project-number">{project.number}</div>
                        <div className="project-info">
                          <div className="project-category">{project.category}</div>
                          <h3>{project.title}</h3>
                          <p>{project.description}</p>
                          <div className="project-stack">{project.stack}</div>
                        </div>
                        {project.image && (
                          <div className="project-thumb">
                            <Image
                              src={project.image}
                              alt={project.title}
                              width={240}
                              height={140}
                              className="project-thumb-img"
                            />
                          </div>
                        )}
                        <div className="project-arrow">
                          {project.placeholder ? (
                            <span className="coming-soon">در حال تکمیل</span>
                          ) : (
                            <motion.div
                              whileHover={{ x: -4, y: -4 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ArrowUpLeft size={22} />
                            </motion.div>
                          )}
                        </div>
                      </CardWrapper>
                    </FadeUp>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ========================================================
              EDUCATION SECTION (Fully reversible editorial reveal)
              ======================================================== */}
          <section id="education" className="section section-dark education-section">
            <div className="container">
              <FadeUp delay={0.08} distance={24} exitDistance={18} margin="-6% 0px -6% 0px" className="education-card-wrap">
                <motion.div
                  className="education-card"
                  whileHover={{ y: -3, borderColor: 'rgba(183, 255, 74, 0.3)' }}
                  transition={{ duration: 0.28 }}
                >
                  <ScaleFade delay={0.15} fromScale={0.7} margin="-6% 0px -6% 0px" className="education-icon-wrap">
                    <div className="education-icon">
                      <GraduationCap size={27} />
                    </div>
                  </ScaleFade>
                  <div>
                    <KineticLetterHeading
                      text="کارشناسی مهندسی کامپیوتر"
                      kicker="۰۵ / تحصیلات"
                      isActive={activeSection === 5}
                    />
                    <p>دانشگاه صنعتی ارومیه · ۱۴۰۱ — ۱۴۰۵</p>
                  </div>
                  <div className="education-thesis">
                    <span>پایان‌نامه</span>
                    <strong>بهینه‌سازی معماری شبکه‌های PINN با استفاده از جست‌وجوی معماری عصبی</strong>
                  </div>
                </motion.div>
              </FadeUp>
            </div>
          </section>

          {/* ========================================================
              CONTACT SECTION (Fully reversible conclusion)
              ======================================================== */}
          <section id="contact" className="section contact-section">
            <div className="contact-grid" />
            <div className="container">
              <div className="contact-content">
                <FadeUp delay={0.06} margin="-6% 0px -6% 0px">
                  <KineticLetterHeading
                    text="بیایید چیزی خوب بسازیم."
                    kicker="۰۶ / ارتباط"
                    isActive={activeSection === 6}
                    highlightWords={['خوب', 'بسازیم.']}
                  />
                </FadeUp>

                <FadeUp delay={0.16} distance={18} exitDistance={14} margin="-6% 0px -6% 0px">
                  <p>
                    برای همکاری روی پروژه‌های نرم‌افزاری، هوش مصنوعی یا ایده‌های جدید،
                    می‌توانید از طریق GitHub با من در ارتباط باشید.
                  </p>
                </FadeUp>

                <FadeUp delay={0.24} distance={16} exitDistance={12} margin="-6% 0px -6% 0px">
                  <motion.a
                    className="primary-button contact-button"
                    href="https://github.com/ParsaR082"
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.04, y: -3 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    مشاهده GitHub
                    <ExternalLink size={17} />
                  </motion.a>
                </FadeUp>
              </div>
            </div>
          </section>
        </main>
      </SectionScrollController>

      {/* FOOTER (Fully reversible) */}
      <footer className="footer">
        <FadeUp delay={0.1} distance={14} exitDistance={10} margin="-4% 0px -4% 0px" className="container footer-inner">
          <span>پارسا رحمانی</span>
          <span>مهندس نرم‌افزار · هوش مصنوعی</span>
          <motion.a
            href="https://github.com/ParsaR082"
            target="_blank"
            rel="noreferrer"
            whileHover={{ x: -4, color: 'var(--accent)' }}
          >
            <Github size={16} /> GitHub
          </motion.a>
        </FadeUp>
      </footer>
    </div>
  );
}

export default function HomePage() {
  return (
    <ScrollProvider>
      <PortfolioContent />
    </ScrollProvider>
  );
}
