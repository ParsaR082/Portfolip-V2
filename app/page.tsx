'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUpLeft,
  Briefcase,
  Check,
  ChevronDown,
  Code2,
  ExternalLink,
  Github,
  Mail,
  Phone,
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
    category: 'هوش مصنوعی / پایان‌نامه',
    description: 'بهینه‌سازی معماری شبکه‌های Physics-Informed Neural Networks با جست‌وجوی خودکار معماری و ارزیابی مدل‌ها بر اساس خطا.',
    stack: 'Python · PyTorch · Optuna · PINNs',
    featured: true,
  },
  {
    number: '۰۲',
    title: 'سامانه مدیریت مدرسه',
    category: 'فول‌استک / پروژه واقعی',
    description: 'سامانه مدیریت مدرسه با رابط فارسی و راست‌به‌چپ، داشبورد و مدیریت داده‌ها.',
    stack: 'Next.js · TypeScript · Supabase · PostgreSQL',
    placeholder: true,
  },
  {
    number: '۰۳',
    title: 'Task Manager',
    category: 'فول‌استک / وب',
    description: 'سامانه مدیریت وظایف با احراز هویت Google، API و مدیریت داده‌ها روی زیرساخت ابری.',
    stack: 'Next.js · TypeScript · Prisma · MongoDB',
  },
  {
    number: '۰۴',
    title: 'NeoVoid',
    category: 'وب / پورتفولیو',
    description: 'وب‌سایت شخصی و تیمی با طراحی مینیمال، وبلاگ و تمرکز بر تجربه کاربری.',
    stack: 'Next.js · TypeScript · Tailwind CSS',
  },
];

const groups = ['همه', 'برنامه‌نویسی', 'توسعه وب', 'هوش مصنوعی', 'پایگاه داده', 'ابزارها'];

function Reveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState('همه');

  const filteredSkills = activeGroup === 'همه' ? skills : skills.filter((skill) => skill.group === activeGroup);
  const navItems = [['درباره من', 'about'], ['تجربه', 'experience'], ['مهارت‌ها', 'skills'], ['پروژه‌ها', 'projects'], ['تحصیلات', 'education']];

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="site-shell" dir="rtl">
      <div className="grain" />
      <header className="topbar">
        <div className="nav-wrap">
          <button className="brand" onClick={() => scrollTo('hero')} aria-label="ابتدای صفحه">
            <span className="brand-mark">پ</span>
            <span>پارسا رحمانی</span>
          </button>
          <nav className="desktop-nav">
            {navItems.map(([label, id]) => <button key={id} onClick={() => scrollTo(id)}>{label}</button>)}
          </nav>
          <div className="nav-actions">
            <a className="nav-github" href="https://github.com/ParsaR082" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a>
            <button className="nav-contact" onClick={() => scrollTo('contact')}>ارتباط <ArrowLeft size={15} /></button>
            <button className="mobile-menu" onClick={() => setMenuOpen((v) => !v)} aria-label="منو">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
          </div>
        </div>
        {menuOpen && (
          <div className="mobile-nav">
            {navItems.map(([label, id]) => <button key={id} onClick={() => scrollTo(id)}>{label}</button>)}
            <button onClick={() => scrollTo('contact')}>ارتباط</button>
          </div>
        )}
      </header>

      <main>
        <section id="hero" className="hero">
          <div className="hero-bg">
            <span className="hero-orb hero-orb-one" />
            <span className="hero-orb hero-orb-two" />
          </div>
          <div className="container hero-inner">
            <div className="hero-copy">
              <Reveal className="hero-kicker"><span /> مهندس نرم‌افزار · هوش مصنوعی</Reveal>
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }}>
                نرم‌افزار می‌سازم؛<br /><em>مسئله حل می‌کنم.</em>
              </motion.h1>
              <motion.p className="hero-description" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .25, duration: .7 }}>
                توسعه‌دهنده نرم‌افزار با تمرکز بر محصولات فول‌استک و تجربه عملی در هوش مصنوعی و یادگیری عمیق؛ از ایده و معماری تا پیاده‌سازی و استقرار.
              </motion.p>
              <div className="hero-actions">
                <button className="button button-dark" onClick={() => scrollTo('projects')}>پروژه‌ها <ArrowLeft size={16} /></button>
                <a className="button button-ghost" href="https://github.com/ParsaR082" target="_blank" rel="noreferrer"><Github size={16} /> GitHub</a>
              </div>
              <div className="hero-facts">
                <span><Check size={14} /> کارشناسی مهندسی کامپیوتر</span>
                <span><Check size={14} /> ۳ سال تجربه فریلنسری</span>
              </div>
            </div>
            <div className="hero-visual">
              <div className="visual-frame">
                <div className="visual-top"><span>۰۱</span><span>PARSA / SOFTWARE</span></div>
                <div className="visual-center">
                  <div className="monogram">پ<span>.</span></div>
                  <div className="visual-caption">ساختن، آزمودن، بهتر کردن.</div>
                </div>
                <div className="visual-bottom"><span>AI × WEB</span><span>۱۴۰۵</span></div>
              </div>
              <div className="visual-tag tag-a"><Code2 size={14} /> فول‌استک</div>
              <div className="visual-tag tag-b"><Sparkles size={14} /> هوش مصنوعی</div>
            </div>
          </div>
          <button className="hero-scroll" onClick={() => scrollTo('about')} aria-label="ادامه"><span>اسکرول کنید</span><ChevronDown size={16} /></button>
        </section>

        <section id="about" className="section about-section">
          <div className="container">
            <Reveal className="section-label">۰۱ — درباره من</Reveal>
            <div className="about-grid">
              <Reveal><h2>ترکیب <em>مهندسی</em> و کنجکاوی.</h2></Reveal>
              <Reveal delay={.08} className="about-text">
                <p>مسیر من از توسعه نرم‌افزار شروع شده و به ترکیب آن با هوش مصنوعی رسیده است. در پروژه‌های واقعی، از رابط کاربری و منطق سمت سرور تا پایگاه داده و استقرار، روی محصول به‌صورت یکپارچه کار می‌کنم.</p>
                <p>فریلنسری به من یاد داده است که توسعه خوب فقط نوشتن کد نیست؛ درک مسئله، پیدا کردن راه‌حل و پشتکار در برابر خطاها بخش مهمی از ساختن یک محصول خوب است.</p>
              </Reveal>
            </div>
            <div className="stats">
              <div><strong>۰۳+</strong><span>سال تجربه فریلنسری</span></div>
              <div><strong>۰۳</strong><span>پروژه واقعی تحویل‌شده</span></div>
              <div><strong>∞</strong><span>یادگیری مداوم</span></div>
            </div>
          </div>
        </section>

        <section id="experience" className="section experience-section">
          <div className="container">
            <div className="section-head"><Reveal className="section-label">۰۲ — تجربه</Reveal><Reveal><h2>تجربه‌ای که روی <em>محصول واقعی</em> شکل گرفته.</h2></Reveal></div>
            <Reveal className="experience-card">
              <div className="experience-year">۱۴۰۲ — ۱۴۰۵</div>
              <div className="experience-main">
                <div className="experience-icon"><Briefcase size={18} /></div>
                <div><span className="eyebrow-small">فریلنسر</span><h3>توسعه‌دهنده نرم‌افزار و فول‌استک</h3></div>
                <p>توسعه و تحویل سه پروژه واقعی شامل دو سامانه فروشگاهی و یک سامانه مدیریت مدرسه، به‌همراه توسعه و بهبود پروژه‌های موجود.</p>
              </div>
              <ul>
                <li>پیاده‌سازی کامل رابط کاربری، API و پایگاه داده</li>
                <li>رفع خطا و شخصی‌سازی قابلیت‌ها بر اساس نیاز مشتری</li>
                <li>استقرار و نگهداری پروژه‌های وب</li>
              </ul>
            </Reveal>
          </div>
        </section>

        <section id="skills" className="section skills-section">
          <div className="container">
            <Reveal className="section-label">۰۳ — مهارت‌ها</Reveal>
            <div className="skills-head"><h2>ابزارهایی که با آن‌ها <em>می‌سازم.</em></h2><Zap size={23} /></div>
            <div className="skill-tabs">{groups.map((group) => <button key={group} className={activeGroup === group ? 'active' : ''} onClick={() => setActiveGroup(group)}>{group}</button>)}</div>
            <motion.div layout className="skill-cloud">{filteredSkills.map((skill) => <motion.div layout initial={{ opacity: 0, scale: .95 }} animate={{ opacity: 1, scale: 1 }} key={skill.label} className="skill-pill">{skill.label}<span /></motion.div>)}</motion.div>
          </div>
        </section>

        <section id="projects" className="section projects-section">
          <div className="container">
            <Reveal className="section-label">۰۴ — پروژه‌ها</Reveal>
            <div className="projects-title"><h2>چند نمونه از <em>کارها.</em></h2><span>منتخب پروژه‌ها</span></div>
            <div className="project-grid">
              {projects.map((project, index) => (
                <Reveal key={project.title} delay={index * .05} className={project.featured ? 'project-card featured' : 'project-card'}>
                  <div className="project-top"><span>{project.number}</span><span>{project.category}</span></div>
                  <div className="project-body"><h3>{project.title}</h3><p>{project.description}</p></div>
                  <div className="project-bottom"><span>{project.stack}</span>{project.placeholder ? <small>در حال تکمیل</small> : <ArrowUpLeft size={18} />}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="education" className="section education-section">
          <div className="container education-layout">
            <Reveal className="section-label">۰۵ — تحصیلات</Reveal>
            <Reveal className="education-main">
              <div className="education-icon"><GraduationCap size={24} /></div>
              <span>دانشگاه صنعتی ارومیه · ۱۴۰۱ — ۱۴۰۵</span>
              <h2>کارشناسی مهندسی کامپیوتر</h2>
              <p>پایان‌نامه: بهینه‌سازی معماری شبکه‌های PINN با استفاده از جست‌وجوی معماری عصبی</p>
            </Reveal>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="container contact-inner">
            <Reveal className="section-label">۰۶ — ارتباط</Reveal>
            <Reveal><h2>ایده‌ای دارید؟<br /><em>بیایید بسازیم.</em></h2></Reveal>
            <Reveal delay={.08}><p>برای همکاری روی پروژه‌های نرم‌افزاری، هوش مصنوعی یا ایده‌های جدید، می‌توانید مستقیماً از طریق تلفن یا ایمیل با من در ارتباط باشید.</p></Reveal>
            <Reveal delay={.12} className="contact-methods">
              <a className="contact-method" href="tel:+989145120736" aria-label="تماس با پارسا رحمانی">
                <span className="contact-method-icon"><Phone size={18} /></span>
                <span><small>تلفن</small><strong dir="ltr">+98 914 512 0736</strong></span>
                <ArrowLeft size={16} />
              </a>
              <a className="contact-method" href="mailto:Prahmani082@gmail.com?subject=درخواست همکاری&body=سلام پارسا،%0A%0Aدر مورد یک پروژه یا فرصت همکاری با شما تماس گرفته‌ام.%0A%0A" aria-label="ارسال ایمیل به پارسا رحمانی">
                <span className="contact-method-icon"><Mail size={18} /></span>
                <span><small>ایمیل</small><strong dir="ltr">Prahmani082@gmail.com</strong></span>
                <ArrowLeft size={16} />
              </a>
            </Reveal>
            <a className="button button-dark" href="https://github.com/ParsaR082" target="_blank" rel="noreferrer">مشاهده GitHub <ExternalLink size={16} /></a>
          </div>
        </section>
      </main>

      <footer className="footer"><div className="container footer-inner"><span>پارسا رحمانی</span><span>مهندس نرم‌افزار · هوش مصنوعی</span><a href="https://github.com/ParsaR082" target="_blank" rel="noreferrer"><Github size={15} /> GitHub</a></div></footer>
    </div>
  );
}
