import { useEffect, useMemo, useState } from 'react';
import portraitUrl from '../assets/ahmed-adel.jpg';

const projects = [
  {
    id: 'educommunity',
    title: 'EduCommunity Egypt',
    category: 'Full Stack · Node.js',
    tags: ['backend', 'full-stack'],
    repo: 'https://github.com/Ahmedadel33/EduCommunity-Egypt',
    date: 'May — Sep 2026',
    color: 'cyan',
    summary: 'An educational community platform connecting students and teachers through recommendations, submissions, and gamified learning.',
    stack: ['Node.js', 'MongoDB', 'REST APIs'],
    highlights: [
      'Built backend modules and 15+ REST endpoints for platform interactions.',
      'Implemented teacher recommendations and soft-skills assignment submissions for 100+ students.',
      'Added rewards, achievements, and badges; engagement increased by 35%.',
      'Optimized database queries and indexes, reducing response times by 25%.',
    ],
  },
  {
    id: 'ecommerce-cicd',
    title: 'E-Commerce Platform · CI/CD',
    category: 'Full Stack · DevOps',
    tags: ['full-stack', 'cloud'],
    repo: 'https://github.com/Ahmedadel33/git-github',
    date: 'Jun — Jul 2026',
    color: 'green',
    summary: 'A full-stack storefront with separate frontend and backend services, supported by automated build and deployment checks.',
    stack: ['React', 'Node.js', 'GitHub Actions'],
    highlights: [
      'Created two GitHub Actions workflows for automated build, test, and deployment checks.',
      'Separated frontend and backend dependencies, reducing deployment build times by 25%.',
      'Managed environment configuration and version control across 10+ release branches.',
    ],
  },
  {
    id: 'courses-api',
    title: 'Courses API',
    category: 'Backend · REST API',
    tags: ['backend'],
    repo: 'https://github.com/Ahmedadel33/courses_api',
    date: 'May — Jul 2026',
    color: 'violet',
    summary: 'An MVC-style REST API for course management, with validation, authentication, containerization, and automated tests.',
    stack: ['Node.js', 'Express', 'MongoDB', 'Docker'],
    highlights: [
      'Implemented 10+ endpoints with separate controller, model, route, and middleware layers.',
      'Added request validation, password hashing, CORS policies, and two user roles.',
      'Containerized the API and added GitHub Actions builds plus Jest unit tests.',
    ],
  },
  {
    id: 'eduflex',
    title: 'EduFlex School Management System',
    category: 'Full Stack · .NET',
    tags: ['full-stack', 'backend'],
    repo: 'https://github.com/Ahmedadel33/EduFlex',
    date: 'Aug — Oct 2024',
    color: 'amber',
    summary: 'A school management system built for 500+ users as a Digital Egypt Pioneers Initiative graduation project.',
    stack: ['ASP.NET Core MVC', 'C#', 'Entity Framework Core'],
    highlights: [
      'Implemented secure authentication, authorization, and role management with ASP.NET Identity.',
      'Structured the system with MVC and built 15+ dedicated controllers and models.',
      'Optimized database queries and schema management, improving response times by 25%.',
    ],
  },
];

const skillGroups = [
  {
    title: 'Languages',
    subtitle: 'Programming & web fundamentals',
    color: 'cyan',
    icon: '</>',
    skills: ['JavaScript (ES6+)', 'TypeScript', 'C#', 'C++', 'SQL', 'HTML5', 'CSS3'],
  },
  {
    title: 'Frameworks & libraries',
    subtitle: 'Frontend, backend & data access',
    color: 'green',
    icon: '{ }',
    skills: ['Node.js', 'Express.js', 'React', 'ASP.NET Core', 'Entity Framework Core', 'Mongoose'],
  },
  {
    title: 'Databases & infrastructure',
    subtitle: 'Data, deployment & operations',
    color: 'violet',
    icon: '⌘',
    skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'AWS', 'Docker', 'Nginx', 'PM2', 'Linux', 'Git', 'GitHub Actions'],
  },
  {
    title: 'Core competencies',
    subtitle: 'Architecture, delivery & security',
    color: 'amber',
    icon: '↗',
    skills: ['Object-oriented programming', 'RESTful APIs', 'CI/CD pipelines', 'Cloud infrastructure', 'Web security'],
  },
];

const credentials = [
  {
    label: 'AWS CERTIFIED · OCT 2026',
    title: 'AWS Certified AI Practitioner',
    detail: 'AIF-C01 · Exam passed October 27, 2026.',
    preview: '/certificates/aws-certified-ai-practitioner.jpg',
    pdf: '/certificates/aws-certified-ai-practitioner.pdf',
    color: 'amber',
  },
  {
    label: 'AWS CERTIFIED · OCT 2026',
    title: 'AWS Certified Developer – Associate',
    detail: 'DVA-C02 · Exam passed October 16, 2026.',
    preview: '/certificates/aws-certified-developer-associate.jpg',
    pdf: '/certificates/aws-certified-developer-associate.pdf',
    color: 'cyan',
  },
  {
    label: 'AWS CERTIFIED · JUL 2026',
    title: 'AWS Certified Cloud Practitioner',
    detail: 'Issued July 22, 2026 · Valid through October 16, 2029.',
    preview: '/certificates/aws-certified-cloud-practitioner.jpg',
    pdf: '/certificates/aws-certified-cloud-practitioner.pdf',
    color: 'violet',
  },
  {
    label: 'DARWISH & CO · SEP—OCT 2026',
    title: 'Digilians Backend Developer Internship',
    detail: 'Training completion certificate · September 13 – October 26, 2026.',
    preview: '/certificates/darwish-internship-completion.jpg',
    color: 'green',
  },
  {
    label: 'NTI · EGYPTIAN MILITARY ACADEMY',
    title: 'Digilians Full Stack Development Program',
    detail: 'Full Stack Development track.',
    icon: '</>',
    color: 'cyan',
  },
  {
    label: 'MCIT · DEPI · 2024',
    title: 'Software Development – .NET Web Developer',
    detail: 'Digital Egypt Pioneers Program · April–October 2024.',
    preview: '/certificates/depi-dotnet-developer.jpg',
    pdf: '/certificates/depi-dotnet-developer.pdf',
    color: 'amber',
  },
];

const experience = [
  {
    role: 'Software Engineering (Backend) Intern',
    company: 'Darwish & Co',
    period: 'Sep — Oct 2026',
    location: 'Cairo, Egypt',
    points: [
      'Contributed to 4+ scalable web applications, working across 10+ modules and participating in peer code reviews.',
      'Resolved 15+ software bugs and automated 5+ routine deployment tasks.',
      'Built .NET Core microservices and REST APIs, contributing to 20% faster backend response times; used xUnit and Azure DevOps pipelines.',
    ],
  },
  {
    role: 'Freelance Full Stack Developer',
    company: 'Self-employed',
    period: 'Nov 2025 — Oct 2026',
    location: 'Cairo, Egypt',
    points: [
      'Delivered full-stack healthcare and e-commerce applications with Node.js, Express, and React; built MongoDB-backed APIs with JWT authentication and Socket.io.',
      'Built a .NET medical inventory system for five clinics, improving order processing time by 37%.',
      'Deployed Dockerized .NET microservices with Azure DevOps, reducing platform downtime by 60%.',
      'Led a four-person team on a fintech reconciliation solution with zero critical errors across 9,000+ transactions.',
    ],
  },
];

const filters = [
  ['all', 'All projects'],
  ['backend', 'Backend'],
  ['full-stack', 'Full Stack'],
  ['cloud', 'Cloud & CI/CD'],
];

const githubProfile = 'https://github.com/Ahmedadel33';
const linkedinProfile = 'https://linkedin.com/in/ahmed-adel-5199972b9';
const contactEmail = 'ahmed.a.tantawi@gmail.com';
const contactPhone = '+201065013789';

function ArrowIcon({ diagonal = false }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      {diagonal ? (
        <path d="M5 15 15 5M6 5h9v9" />
      ) : (
        <path d="M3.5 10h12m-5-5 5 5-5 5" />
      )}
    </svg>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function Header({ theme, onThemeToggle }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    ['About', '#about'],
    ['Skills', '#skills'],
    ['Projects', '#projects'],
    ['Experience', '#experience'],
    ['Education', '#education'],
  ];

  return (
    <header className="site-header">
      <div className="nav-shell">
        <a className="brand" href="#home" aria-label="Ahmed Adel, home">
          <span className="brand-mark">A<span>.</span></span>
          <span className="brand-name">Ahmed<span> Adel</span></span>
        </a>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <a className="mobile-contact" href="#contact" onClick={() => setMenuOpen(false)}>Let&apos;s talk <ArrowIcon /></a>
        </nav>
        <div className="nav-actions">
          <button className="theme-toggle" onClick={onThemeToggle} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
            {theme === 'dark' ? '☼' : '☾'}
          </button>
          <a className="button button-small button-outline desktop-contact" href="#contact">Let&apos;s talk <ArrowIcon /></a>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}

function ProjectCard({ project, onOpen, index }) {
  return (
    <article className={`project-card accent-${project.color}`} style={{ '--card-index': index }}>
      <button className="project-art-button" onClick={() => onOpen(project)} aria-label={`View ${project.title} details`}>
        <div className="project-art">
          <div className="project-art-toolbar"><span /><span /><span /><small>{project.stack[0]}</small></div>
          <div className="project-art-code" aria-hidden="true">
            <span><i>01</i><b>const</b> project = <em>&apos;{project.id}&apos;</em>;</span>
            <span><i>02</i><b>stack</b>.build(<em>{project.stack[1]}</em>);</span>
            <span><i>03</i><b>status</b>: <em>project</em></span>
            <span><i>04</i><b>focus</b>: <em>{project.category}</em></span>
          </div>
          <span className="image-label">{project.category}</span>
          <span className="image-arrow"><ArrowIcon diagonal /></span>
        </div>
      </button>
      <div className="project-copy">
        <div className="project-title-row">
          <h3>{project.title}</h3>
          <span className="project-index">0{index + 1}</span>
        </div>
        <span className="project-date">{project.date}</span>
        <p>{project.summary}</p>
        <div className="tag-list">
          {project.stack.map((tool) => <span key={tool}>{tool}</span>)}
        </div>
        <div className="project-actions">
          <button className="text-link" onClick={() => onOpen(project)}>Project details <ArrowIcon /></button>
          <a className="text-link" href={project.repo} target="_blank" rel="noreferrer">GitHub <ArrowIcon diagonal /></a>
        </div>
      </div>
    </article>
  );
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.classList.add('modal-open');
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('modal-open');
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="modal-backdrop" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button className="modal-close" onClick={onClose} aria-label="Close project details">×</button>
        <div className={`modal-project-art accent-${project.color}`}>
          <span className="eyebrow">{project.category}</span>
          <strong>{project.stack[0]}</strong>
          <span>{project.stack.slice(1).join(' · ')}</span>
        </div>
        <div className="modal-content">
          <span className="eyebrow">{project.date}</span>
          <h2 id="modal-title">{project.title}</h2>
          <p>{project.summary}</p>
          <h3>Project highlights</h3>
          <ul className="highlight-list">
            {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
          </ul>
          <div className="tag-list">
            {project.stack.map((tool) => <span key={tool}>{tool}</span>)}
          </div>
          <a className="button button-primary modal-repo-link" href={project.repo} target="_blank" rel="noreferrer">View repository <ArrowIcon diagonal /></a>
        </div>
      </section>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('ahmed_portfolio_theme') === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  useEffect(() => {
    try {
      localStorage.setItem('ahmed_portfolio_theme', theme);
    } catch {
      // The selected theme still works for this session when storage is unavailable.
    }
  }, [theme]);

  const filteredProjects = useMemo(
    () => projects.filter((project) => activeFilter === 'all' || project.tags.includes(activeFilter)),
    [activeFilter],
  );

  function handleContactSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Portfolio inquiry: ${formData.get('service')}`);
    const body = encodeURIComponent(
      `Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\nTopic: ${formData.get('service')}\n\n${formData.get('message')}`,
    );
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  }

  return (
    <div className={`app theme-${theme}`}>
      <Header theme={theme} onThemeToggle={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')} />

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="availability"><span /> Full Stack Software Engineer · Cairo, Egypt</div>
            <p className="hero-kicker">SOFTWARE ENGINEER <span>·</span> BACKEND & CLOUD</p>
            <h1>Building software<br />from backend to <span>browser.</span></h1>
            <p className="hero-description">
              I&apos;m Ahmed Adel Tantawi Atwa, a Full Stack Software Engineer building scalable web applications, reliable APIs, and cloud-ready services.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">Explore my work <ArrowIcon /></a>
              <a className="button button-quiet" href={`mailto:${contactEmail}`}>Get in touch <ArrowIcon diagonal /></a>
            </div>
            <div className="hero-proof">
              <div><strong>15<span>+</span></strong><small>REST API endpoints</small></div>
              <div><strong>9k<span>+</span></strong><small>Transactions supported</small></div>
              <div><strong>5</strong><small>Clinics supported</small></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="portrait-frame">
              <img src={portraitUrl} alt="Ahmed Adel Tantawi Atwa" />
              <div className="portrait-caption">
                <span className="caption-icon">A.</span>
                <span><strong>Ahmed Adel Tantawi Atwa</strong><small>Full Stack Software Engineer</small></span>
              </div>
            </div>
            <div className="visual-orbit orbit-one" />
            <div className="visual-orbit orbit-two" />
            <div className="floating-note"><span className="note-dot" /> APIs · Cloud · Full Stack</div>
          </div>
          <a className="scroll-cue" href="#about"><span /> Scroll to explore</a>
        </section>

        <section className="about-section section-wrap section-block" id="about">
          <div className="about-intro">
            <span className="eyebrow">ABOUT ME</span>
            <h2>Engineering for<br /><span>real-world impact.</span></h2>
          </div>
          <div className="about-detail">
            <p>Full Stack Software Engineer specializing in scalable web applications, backend development, and cloud infrastructure. I work across Node.js, ASP.NET Core, and React, with a focus on object-oriented design, REST APIs, database performance, and dependable CI/CD workflows.</p>
            <div className="process-list">
              {[
                ['01', 'Architect', 'Design maintainable services, data models, and clear API boundaries.'],
                ['02', 'Build', 'Develop complete features across backend services and user interfaces.'],
                ['03', 'Deliver', 'Automate testing and deployment for reliable production releases.'],
              ].map(([number, title, text]) => (
                <div className="process-item" key={number}><span>{number}</span><strong>{title}</strong><p>{text}</p></div>
              ))}
            </div>
          </div>
        </section>

        <section className="skills-section section-wrap section-block" id="skills">
          <SectionHeading
            eyebrow="TECHNICAL SKILLS"
            title="Tools to build from the ground up."
            description="A full-stack toolkit spanning application development, data, and cloud operations."
          />
          <div className="skills-grid">
            {skillGroups.map((group) => (
              <article className={`skill-card accent-${group.color}`} key={group.title}>
                <div className="skill-card-heading">
                  <span className="skill-icon">{group.icon}</span>
                  <div><h3>{group.title}</h3><p>{group.subtitle}</p></div>
                </div>
                <div className="tag-list skill-tags">{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="projects-section section-block" id="projects">
          <div className="section-wrap">
            <SectionHeading
              eyebrow="SELECTED WORK"
              title="A few things I’ve built."
              description="Exploring real business questions through thoughtful analytics and clear visual storytelling."
            />
            <div className="project-toolbar" role="group" aria-label="Filter projects">
              {filters.map(([id, label]) => (
                <button
                  className={activeFilter === id ? 'filter-chip is-active' : 'filter-chip'}
                  key={id}
                  onClick={() => setActiveFilter(id)}
                  aria-pressed={activeFilter === id}
                >{label}</button>
              ))}
              <span className="project-count">{filteredProjects.length} projects</span>
            </div>
            <div className="projects-grid">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} onOpen={setSelectedProject} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="experience-section section-wrap section-block" id="experience">
          <SectionHeading
            eyebrow="EXPERIENCE"
            title="Where I’ve put the work in."
            description="Building and delivering software with product teams and clients."
          />
          <div className="experience-list">
            {experience.map((position, index) => (
              <article className="experience-item" key={position.role}>
                <span className="experience-index">0{index + 1}</span>
                <div className="experience-main">
                  <div className="experience-heading">
                    <div><h3>{position.role}</h3><span>{position.company}</span></div>
                    <div className="experience-dates"><strong>{position.period}</strong><span>{position.location}</span></div>
                  </div>
                  <ul>{position.points.map((point) => <li key={point}>{point}</li>)}</ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="credentials-section section-wrap section-block" id="education">
          <SectionHeading
            eyebrow="EDUCATION, CERTIFICATIONS & TRAINING"
            title="A foundation for continuous learning."
            description="Formal education, intensive developer training, and cloud certifications."
          />
          <article className="education-card">
            <span className="education-icon">B.Sc.</span>
            <div>
              <span className="credential-label">DELTA UNIVERSITY · EGYPT · 2023</span>
              <h3>B.Sc. in Computer Systems and Information</h3>
              <p>Graduation project: an election showcase platform with a Node.js backend and secure user voting system.</p>
            </div>
          </article>
          <h3 className="subsection-title">Certifications & professional programs</h3>
          <div className="credentials-grid">
            {credentials.map((credential) => (
              <article className={`credential-card accent-${credential.color}`} key={credential.title}>
                {credential.preview ? (
                  <a className="credential-preview" href={credential.preview} target="_blank" rel="noreferrer" aria-label={`View image of ${credential.title}`}>
                    <img src={credential.preview} alt={`${credential.title} document preview`} loading="lazy" />
                    <span>View image <ArrowIcon diagonal /></span>
                  </a>
                ) : (
                  <div className="credential-placeholder" aria-hidden="true">
                    <strong>{credential.icon}</strong>
                    <span>{credential.label}</span>
                  </div>
                )}
                <div className="credential-content">
                  <span className="credential-label">{credential.label}</span>
                  <h3>{credential.title}</h3>
                  <p>{credential.detail}</p>
                  {(credential.preview || credential.pdf) && (
                    <div className="credential-actions">
                      {credential.preview && <a href={credential.preview} target="_blank" rel="noreferrer">Image <ArrowIcon diagonal /></a>}
                      {credential.pdf && <a href={credential.pdf} download>Download PDF <ArrowIcon diagonal /></a>}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact-section section-block" id="contact">
          <div className="section-wrap contact-layout">
            <div className="contact-copy">
              <span className="eyebrow">HAVE A PROJECT IN MIND?</span>
              <h2>Let’s build something that works.</h2>
              <p>Interested in full-stack development, backend systems, or cloud infrastructure? Get in touch and tell me what you’re building.</p>
              <a className="contact-email" href={`mailto:${contactEmail}`}>{contactEmail} <ArrowIcon diagonal /></a>
              <a className="contact-phone" href={`tel:${contactPhone}`}>{contactPhone}</a>
              <span className="location-note">Based in Cairo, Egypt</span>
              <div className="social-links">
                <a href={linkedinProfile} target="_blank" rel="noreferrer">LinkedIn <ArrowIcon diagonal /></a>
                <a href={githubProfile} target="_blank" rel="noreferrer">GitHub <ArrowIcon diagonal /></a>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="form-heading"><span>01 / START A CONVERSATION</span><h3>Tell me a little about it.</h3></div>
              <div className="form-row">
                <label>Your name<input name="name" type="text" placeholder="Name" autoComplete="name" required /></label>
                <label>Email address<input name="email" type="email" placeholder="you@company.com" autoComplete="email" required /></label>
              </div>
              <label>What are you reaching out about?
                <select name="service" defaultValue="Full Stack Development">
                  <option>Full Stack Development</option>
                  <option>Backend / API Development</option>
                  <option>Cloud & CI/CD</option>
                  <option>Other</option>
                </select>
              </label>
              <label>Message<textarea name="message" rows="4" placeholder="A little context about your project…" required /></label>
              <button className="button button-primary submit-button" type="submit">Continue with email <ArrowIcon /></button>
              <p className="form-note">Your email app will open with your message ready to send.</p>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer section-wrap">
        <a className="brand" href="#home"><span className="brand-mark">A<span>.</span></span><span className="brand-name">Ahmed<span> Adel</span></span></a>
        <span>Full Stack Software Engineer · Cairo, Egypt</span>
        <a href="#home" className="back-top">Back to top ↑</a>
      </footer>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}

export default App;
