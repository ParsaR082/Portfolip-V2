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
import CinematicIntro from '../components/CinematicIntro';
import SectionScrollController from '../components/SectionScrollController';
import KineticLetterHeading from '../components/KineticLetterHeading';

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
  },
  {
    number: '۰۲',
    title: 'سامانه مدیریت مدرسه',
    category: 'پروژه واقعی · فول‌استک',
    description:
      'سامانه مدیریت مدرسه با داشبورد فارسی و راست‌به‌چپ، مدیریت اطلاعات و ارتباط با پایگاه داده. لینک و تصاویر پروژه در نسخه نهایی اضافه می‌شوند.',
    stack: 'Next.js · TypeScript · Supabase · PostgreSQL',
    placeholder: true,
  },
  {
    number: '۰۳',
    title: 'Task Manager',
    category: 'وب · فول‌استک',
    description:
      'سامانه مدیریت وظایف با احراز هویت Google، مدیریت داده‌ها و API و استقرار روی بستر ابری.',
    stack: 'Next.js · TypeScript · Prisma · MongoDB',
  },
  {
    number: '۰۴',
    title: 'NeoVoid',
    category: 'نمونه‌کار شخصی',
    description:
      'وب‌سایت شخصی و تیمی با طراحی مینیمال، بخش وبلاگ و تمرکز بر تجربه کاربری و ارائه پروژه‌ها.',
    stack: 'Next.js · TypeScript · Tailwind CSS',
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

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState('همه');
  const [progress, setProgress] = useState(0);
  const [introPhase, setIntroPhase] = useState<'playing' | 'transforming' | 'settled'>('playing');
  const [activeSection, setActiveSection] = useState(0);

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

  return (
    <div dir="rtl" className="site-shell">
      <CinematicIntro phase={introPhase} onStartTransform={startTransformation} />
      <div
        className="scroll-progress"
        style={{
          width: `${progress}%`,
          opacity: introPhase === 'settled' ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}
      />

      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="ambient ambient-three" />

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
          <button className="brand" onClick={() => scrollTo('hero')} aria-label="بازگشت به ابتدای صفحه">
            <span className="brand-mark"><span /></span>
            <span>پارسا رحمانی</span>
          </button>

          <nav className="desktop-nav">
            {navItems.map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)}>{label}</button>
            ))}
          </nav>

          <div className="nav-actions">
            <a
              href="https://github.com/ParsaR082"
              target="_blank"
              rel="noreferrer"
              className="icon-button"
              aria-label="گیت‌هاب"
            >
              <Github size={18} />
            </a>
            <button className="nav-cta" onClick={() => scrollTo('contact')}>
              ارتباط
              <ArrowLeft size={16} />
            </button>
            <button
              className="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="منو"
            >
              {menuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="mobile-nav"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              {navItems.map(([label, id]) => (
                <button key={id} onClick={() => scrollTo(id)}>{label}</button>
              ))}
              <button onClick={() => scrollTo('contact')}>ارتباط</button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <SectionScrollController
        sectionIds={sectionIds}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isIntroActive={introPhase !== 'settled'}
      >
        <main>
          <section id="hero" className="hero section">
          <div className="hero-grid" />
          <div className="hero-content">
            <motion.div
              className="eyebrow"
              initial={{ opacity: 0, y: 15 }}
              animate={{
                opacity: introPhase === 'playing' ? 0 : 1,
                y: introPhase === 'playing' ? 15 : 0,
              }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="eyebrow-dot" />
              مهندس نرم‌افزار · هوش مصنوعی
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{
                opacity: introPhase === 'playing' ? 0 : 1,
                y: introPhase === 'playing' ? 35 : 0,
              }}
              transition={{ duration: 0.85, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
            >
              ایده‌ها را به
              <span className="gradient-word"> تجربه‌های دیجیتال </span>
              تبدیل می‌کنم.
            </motion.h1>

            <motion.p
              className="hero-copy"
              initial={{ opacity: 0, y: 25 }}
              animate={{
                opacity: introPhase === 'playing' ? 0 : 1,
                y: introPhase === 'playing' ? 25 : 0,
              }}
              transition={{ duration: 0.75, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
            >
              توسعه‌دهنده نرم‌افزار با تمرکز بر ساخت محصولات فول‌استک و تجربه عملی
              در هوش مصنوعی و یادگیری عمیق؛ از معماری و کدنویسی تا حل مسئله و
              استقرار نهایی.
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: introPhase === 'playing' ? 0 : 1,
                y: introPhase === 'playing' ? 20 : 0,
              }}
              transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <button className="primary-button" onClick={() => scrollTo('projects')}>
                مشاهده پروژه‌ها
                <ArrowLeft size={17} />
              </button>
              <a
                href="https://github.com/ParsaR082"
                target="_blank"
                rel="noreferrer"
                className="secondary-button"
              >
                <Github size={17} />
                GitHub
              </a>
            </motion.div>

            <motion.div
              className="hero-meta"
              initial={{ opacity: 0 }}
              animate={{ opacity: introPhase === 'playing' ? 0 : 1 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              <span><Check size={15} /> فارغ‌التحصیل مهندسی کامپیوتر</span>
              <span><Check size={15} /> ۳ سال تجربه فریلنسری</span>
              <span><Check size={15} /> انگلیسی متوسط رو به بالا</span>
            </motion.div>
          </div>

          <motion.div
            className="hero-art"
            initial={{ opacity: 0 }}
            animate={{ opacity: introPhase === 'playing' ? 0 : 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="orbit orbit-a" />
            <div className="orbit orbit-b" />
            <div className="orbit orbit-c" />

            <div className="hero-art-composite">
              {introPhase !== 'playing' && (
                <motion.div
                  layoutId="parsa-portrait-card"
                  className="hero-docked-portrait"
                  transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="hero-docked-portrait-img-wrap">
                    <motion.div
                      layoutId="parsa-portrait-img-inner"
                      className="hero-docked-portrait-img-inner"
                    >
                      <img
                        src="/parsa.jpg"
                        alt="پارسا رحمانی - Parsa Rahmani"
                        className="hero-docked-portrait-img"
                      />
                    </motion.div>
                  </div>
                  <div className="hero-docked-portrait-info">
                    <div className="hero-docked-portrait-top">
                      <span className="hero-docked-portrait-name">پارسا رحمانی</span>
                      <span className="hero-status-pill">
                        <span className="hero-status-dot" />
                        آماده همکاری
                      </span>
                    </div>
                    <span className="hero-docked-portrait-role">مهندس نرم‌افزار · هوش مصنوعی و فول‌استک</span>
                  </div>
                </motion.div>
              )}

              <motion.div
                className="code-card"
                animate={{ y: [0, -10, 0], rotate: [0, 0.6, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
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
            </div>

            <div className="floating-chip chip-one"><Code2 size={15} /> فول‌استک</div>
            <div className="floating-chip chip-two"><Sparkles size={15} /> هوش مصنوعی</div>
            <div className="floating-chip chip-three"><Zap size={15} /> حل مسئله</div>
          </motion.div>

          <button className="scroll-cue" onClick={() => scrollTo('about')} aria-label="ادامه">
            <span>ادامه</span>
            <ChevronDown size={17} />
          </button>
        </section>

        <section id="about" className="section section-dark">
          <div className="container">
            <Reveal className="section-heading">
              <KineticLetterHeading
                text="مهندسی با ذهنیت حل مسئله."
                kicker="۰۱ / درباره من"
                isActive={activeSection === 1}
                highlightWords={['حل', 'مسئله.']}
              />
            </Reveal>

            <div className="about-grid">
              <Reveal className="about-main">
                <p className="large-text">
                  مسیر من از توسعه نرم‌افزار شروع شده و به ترکیب آن با هوش مصنوعی
                  رسیده است. در پروژه‌های واقعی، از طراحی رابط کاربری و منطق سمت
                  سرور تا پایگاه داده و استقرار، روی محصول به‌صورت یکپارچه کار
                  می‌کنم.
                </p>
                <p>
                  تجربه فریلنسری به من یاد داده است که هر پروژه فقط کدنویسی نیست؛
                  درک مسئله، پیدا کردن راه‌حل، سازگار شدن با نیازهای جدید و
                  پشتکار در برابر خطاها بخش جدایی‌ناپذیر توسعه یک محصول خوب است.
                </p>
              </Reveal>

              <Reveal delay={0.1} className="about-side">
                <div className="stat-card">
                  <strong>۰۳+</strong>
                  <span>سال تجربه فریلنسری</span>
                </div>
                <div className="stat-card">
                  <strong>۰۳</strong>
                  <span>پروژه واقعی تحویل‌شده</span>
                </div>
                <div className="stat-card">
                  <strong>∞</strong>
                  <span>یادگیری و ساختن</span>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="experience" className="section">
          <div className="container">
            <Reveal className="section-heading">
              <KineticLetterHeading
                text="چیزهایی که در دنیای واقعی ساخته‌ام."
                kicker="۰۲ / تجربه"
                isActive={activeSection === 2}
                highlightWords={['دنیای', 'واقعی']}
              />
            </Reveal>

            <div className="timeline">
              {experience.map((item) => (
                <Reveal key={item.period} className="timeline-item">
                  <div className="timeline-period">{item.period}</div>
                  <div className="timeline-dot" />
                  <div className="timeline-content">
                    <div className="experience-icon"><Briefcase size={19} /></div>
                    <h3>{item.title}</h3>
                    <div className="muted-label">{item.company}</div>
                    <ul>
                      {item.points.map((point) => <li key={point}>{point}</li>)}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="section section-dark">
          <div className="container">
            <Reveal className="section-heading">
              <KineticLetterHeading
                text="ابزارهایی برای ساختن."
                kicker="۰۳ / مهارت‌ها"
                isActive={activeSection === 3}
                highlightWords={['ساختن.']}
              />
            </Reveal>

            <Reveal className="skills-panel">
              <div className="skill-tabs">
                {groups.map((group) => (
                  <button
                    key={group}
                    className={activeGroup === group ? 'active' : ''}
                    onClick={() => setActiveGroup(group)}
                  >
                    {group}
                  </button>
                ))}
              </div>
              <motion.div layout className="skill-cloud">
                {filteredSkills.map((skill) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    key={skill.label}
                    className="skill-pill"
                  >
                    <span className="skill-pulse" />
                    {skill.label}
                  </motion.div>
                ))}
              </motion.div>
            </Reveal>
          </div>
        </section>

        <section id="projects" className="section projects-section">
          <div className="container">
            <Reveal className="section-heading heading-row">
              <div>
                <KineticLetterHeading
                  text="کارهایی که داستان دارند."
                  kicker="۰۴ / پروژه‌ها"
                  isActive={activeSection === 4}
                  highlightWords={['داستان', 'دارند.']}
                />
              </div>
              <span className="heading-note">پروژه‌های منتخب</span>
            </Reveal>

            <div className="project-list">
              {projects.map((project, index) => (
                <Reveal key={project.title} delay={index * 0.06} className="project-card">
                  <div className="project-number">{project.number}</div>
                  <div className="project-info">
                    <div className="project-category">{project.category}</div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-stack">{project.stack}</div>
                  </div>
                  <div className="project-arrow">
                    {project.placeholder ? <span className="coming-soon">در حال تکمیل</span> : <ArrowUpLeft size={22} />}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="education" className="section section-dark education-section">
          <div className="container">
            <Reveal className="education-card">
              <div className="education-icon"><GraduationCap size={27} /></div>
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
            </Reveal>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="contact-grid" />
          <div className="container">
            <Reveal className="contact-content">
              <KineticLetterHeading
                text="بیایید چیزی خوب بسازیم."
                kicker="۰۶ / ارتباط"
                isActive={activeSection === 6}
                highlightWords={['خوب', 'بسازیم.']}
              />
              <p>
                برای همکاری روی پروژه‌های نرم‌افزاری، هوش مصنوعی یا ایده‌های جدید،
                می‌توانید از طریق GitHub با من در ارتباط باشید.
              </p>
              <a
                className="primary-button contact-button"
                href="https://github.com/ParsaR082"
                target="_blank"
                rel="noreferrer"
              >
                مشاهده GitHub
                <ExternalLink size={17} />
              </a>
            </Reveal>
          </div>
        </section>
      </main>
    </SectionScrollController>

      <footer className="footer">
        <div className="container footer-inner">
          <span>پارسا رحمانی</span>
          <span>مهندس نرم‌افزار · هوش مصنوعی</span>
          <a href="https://github.com/ParsaR082" target="_blank" rel="noreferrer">
            <Github size={16} /> GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
