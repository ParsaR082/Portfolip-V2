'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUpLeft,
  BriefcaseBusiness,
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
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div dir="rtl" className="site-shell">
      <div className="scroll-progress" style={{ width: `${progress}%` }} />

      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="ambient ambient-three" />

      <header className="topbar">
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

      <main>
        <section id="hero" className="hero section">
          <div className="hero-grid" />
          <div className="hero-content">
            <motion.div
              className="eyebrow"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="eyebrow-dot" />
              مهندس نرم‌افزار · هوش مصنوعی
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              ایده‌ها را به
              <span className="gradient-word"> تجربه‌های دیجیتال </span>
              تبدیل می‌کنم.
            </motion.h1>

            <motion.p
              className="hero-copy"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              توسعه‌دهنده نرم‌افزار با تمرکز بر ساخت محصولات فول‌استک و تجربه عملی
              در هوش مصنوعی و یادگیری عمیق؛ از معماری و کدنویسی تا حل مسئله و
              استقرار نهایی.
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
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
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <span><Check size={15} /> فارغ‌التحصیل مهندسی کامپیوتر</span>
              <span><Check size={15} /> ۳ سال تجربه فریلنسری</span>
              <span><Check size={15} /> انگلیسی متوسط رو به بالا</span>
            </motion.div>
          </div>

          <motion.div
            className="hero-art"
            initial={{ opacity: 0, scale: 0.88, rotate: 4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="orbit orbit-a" />
            <div className="orbit orbit-b" />
            <div className="orbit orbit-c" />
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
              <span className="section-kicker">۰۱ / درباره من</span>
              <h2>مهندسی با ذهنیت <em>حل مسئله.</em></h2>
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
              <span className="section-kicker">۰۲ / تجربه</span>
              <h2>چیزهایی که در <em>دنیای واقعی</em> ساخته‌ام.</h2>
            </Reveal>

            <div className="timeline">
              {experience.map((item) => (
                <Reveal key={item.period} className="timeline-item">
                  <div className="timeline-period">{item.period}</div>
                  <div className="timeline-dot" />
                  <div className="timeline-content">
                    <div className="experience-icon"><BriefcaseBusiness size={19} /></div>
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
              <span className="section-kicker">۰۳ / مهارت‌ها</span>
              <h2>ابزارهایی برای <em>ساختن.</em></h2>
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
                <span className="section-kicker">۰۴ / پروژه‌ها</span>
                <h2>کارهایی که <em>داستان دارند.</em></h2>
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
                <span className="section-kicker">۰۵ / تحصیلات</span>
                <h2>کارشناسی مهندسی کامپیوتر</h2>
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
              <span className="section-kicker">۰۶ / ارتباط</span>
              <h2>بیایید چیزی <em>خوب بسازیم.</em></h2>
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
