'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { SectionHeading } from '../components/SectionHeading';
import { SkillCard } from '../components/SkillCard';
import { ProjectCard } from '../components/ProjectCard';
import { ServiceCard } from '../components/ServiceCard';
import { SocialIcons } from '../components/SocialIcons';
import { CertificationCard } from '../components/CertificationCard';
import { EducationCard } from '../components/EducationCard';
import { Typewriter } from '../components/Typewriter';
import { CursorGlow } from '../components/CursorGlow';
import { AvailabilityBanner } from '../components/AvailabilityBanner';
const Hero3D = dynamic(
  () => import('../components/Hero3D').then((mod) => mod.Hero3D),
  {
    ssr: false,
    loading: () => <div className="h-full w-full" />,
  }
);

import { loadAdminData } from '../lib/adminStorage';
import { defaultAdminData } from '../lib/dummyAdminData';
import { AdminData } from '../types/admin';

const servicesList = [
  {
    title: 'Data Analysis & Visualization',
    description: 'Transform raw data into compelling stories with interactive dashboards and advanced analytics.'
  },
  {
    title: 'Machine Learning Solutions',
    description: 'Build predictive models and AI solutions to solve complex business problems.'
  },
  {
    title: 'Business Intelligence',
    description: 'Create comprehensive BI solutions with Power BI, Excel, and custom analytics platforms.'
  }
];

const sectionFade = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
};

export default function Home() {
  const [portfolioData, setPortfolioData] = useState<AdminData | null>(null);
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [profileTiltX, setProfileTiltX] = useState(0);
  const [profileTiltY, setProfileTiltY] = useState(0);

  const handleProfileMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const maxTilt = 10;
    setProfileTiltX(-(y / (rect.height / 2)) * maxTilt);
    setProfileTiltY((x / (rect.width / 2)) * maxTilt);
  };

  const handleProfileMouseLeave = () => {
    setProfileTiltX(0);
    setProfileTiltY(0);
  };

  useEffect(() => {
    // Load from localStorage, fallback to defaultAdminData
    const data = loadAdminData(defaultAdminData);
    setPortfolioData(data);
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const activeData = mounted && portfolioData ? portfolioData : defaultAdminData;
  const profileData = activeData.profile;
  const socialsData = activeData.socials;
  const skillsData = activeData.skills;
  const projectsData = activeData.projects;
  const certificationsData = activeData.certifications;
  const educationData = activeData.education;

  // Group skills dynamically by category
  const categoriesList = ['Data Analysis', 'Machine Learning', 'Backend', 'Frontend'] as const;
  const groupedSkills = categoriesList.map((category) => ({
    category,
    skills: skillsData.filter((s) => s.category === category)
  }));

  return (
    <div className="relative overflow-hidden min-h-screen bg-slate-950">
      <CursorGlow />
      <Navbar />

      {/* Mouse Follow Radial Light Effect */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 opacity-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(700px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(34, 211, 238, 0.12), rgba(139, 92, 246, 0.12), transparent 80%)`,
        }}
      />

      {/* Animated Background Mesh Gradients */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 h-[400px] w-[400px] animate-pulse rounded-full bg-cyan-500/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[500px] w-[500px] animate-bounce rounded-full bg-purple-500/5 blur-[150px] [animation-duration:15s]" />
      </div>

      <main className="mx-auto max-w-7xl px-6 pb-24 pt-24 sm:px-8 lg:px-12 relative z-10">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden pb-28 pt-10">
          
          {/* Subtle Grid Background inside the Hero Container */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-60" />

          {/* Floating Data Science Visual Decorations */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            {/* Floating Model Accuracy Chart */}
            <motion.div
              animate={{ y: [0, -12, 0], x: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              className="absolute top-16 right-12 z-20 hidden md:block rounded-2xl border border-cyan-500/20 bg-slate-950/90 p-4 shadow-[0_0_20px_rgba(34,211,238,0.15)] backdrop-blur-md"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-300">Model Learning Rate</span>
              </div>
              <svg className="h-8 w-24 text-cyan-400" viewBox="0 0 100 40" fill="none">
                <path d="M5 35 Q 25 15, 45 25 T 85 5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="5" cy="35" r="2.5" fill="#22d3ee" />
                <circle cx="45" cy="25" r="2.5" fill="#a855f7" />
                <circle cx="85" cy="5" r="2.5" fill="#22d3ee" />
              </svg>
            </motion.div>

            {/* Floating Neural Network Nodes */}
            <motion.div
              animate={{ y: [0, 15, 0], x: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
              className="absolute bottom-16 left-8 z-20 hidden md:block rounded-2xl border border-purple-500/20 bg-slate-950/90 p-4 shadow-[0_0_20px_rgba(169,85,247,0.15)] backdrop-blur-md"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-300">Layers Activation</span>
              </div>
              <svg className="h-10 w-24 text-purple-400/90" viewBox="0 0 100 40" fill="currentColor">
                <circle cx="15" cy="12" r="3.5" />
                <circle cx="15" cy="28" r="3.5" />
                <circle cx="50" cy="8" r="3.5" />
                <circle cx="50" cy="20" r="3.5" />
                <circle cx="50" cy="32" r="3.5" />
                <circle cx="85" cy="20" r="3.5" />
                <line x1="15" y1="12" x2="50" y2="8" stroke="currentColor" strokeWidth="1" opacity="0.4" />
                <line x1="15" y1="12" x2="50" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.4" />
                <line x1="15" y1="28" x2="50" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.4" />
                <line x1="15" y1="28" x2="50" y2="32" stroke="currentColor" strokeWidth="1" opacity="0.4" />
                <line x1="50" y1="8" x2="85" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.4" />
                <line x1="50" y1="20" x2="85" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.4" />
                <line x1="50" y1="32" x2="85" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.4" />
              </svg>
            </motion.div>
          </div>

          <div className="relative grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="space-y-8 relative z-10"
            >
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-slate-900/50 px-4 py-2.5 text-sm text-slate-200 shadow-soft backdrop-blur-lg">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan-500"></span>
                </span>
                Data Science Portfolio
              </div>
              
              <div className="space-y-4">
                <h1 className="max-w-3xl text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400 leading-none">
                  Hi, I’m <span className="bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 text-transparent drop-shadow-glow">Rushikesh Davange</span>
                </h1>
                
                <h2 className="text-xl sm:text-2xl font-semibold tracking-wide text-slate-300 flex items-center gap-2">
                  <span className="text-cyan-400 font-bold">&gt;_</span>
                  <Typewriter 
                    texts={[
                      'Data Analyst', 
                      'Data Scientist', 
                      'ML Enthusiast'
                    ]} 
                  />
                </h2>

                <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-slate-300">
                  {profileData.bio}
                </p>
              </div>
              
              {/* Stylish Social Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <a 
                  href={profileData.resume} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-500 px-7 py-3.5 text-sm font-bold text-slate-950 shadow-glow hover:scale-[1.03] active:scale-[0.97] transition-all"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                  </svg>
                  Download Resume
                </a>
                
                <a 
                  href="#contact" 
                  className="inline-flex items-center gap-2.5 rounded-full border border-cyan-400/30 bg-slate-900/40 px-7 py-3.5 text-sm font-bold text-cyan-300 backdrop-blur-md shadow-soft hover:bg-cyan-400/10 hover:border-cyan-300/60 hover:scale-[1.03] active:scale-[0.97] transition-all"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  Contact Me
                </a>

                <div className="flex items-center gap-3 pl-2 border-l border-white/10">
                  <a 
                    href={socialsData.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-slate-900/60 text-slate-300 hover:text-white hover:border-cyan-400/40 hover:bg-slate-800/80 transition-all hover:scale-105"
                    aria-label="GitHub"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                  </a>
                  
                  <a 
                    href={socialsData.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-slate-900/60 text-slate-300 hover:text-white hover:border-cyan-400/40 hover:bg-slate-800/80 transition-all hover:scale-105"
                    aria-label="LinkedIn"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Right Content - 3D Blobs & Profile Preview with Tilt */}
            <div className="relative mx-auto w-full max-w-md lg:max-w-none h-[450px] flex items-center justify-center">
              
              {/* 3D Canvas Elements Background */}
              <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
                <Hero3D />
              </div>
              
              {/* Floating Profile Card with 3D Hover Tilt */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                onMouseMove={handleProfileMouseMove}
                onMouseLeave={handleProfileMouseLeave}
                style={{
                  transform: `perspective(1000px) rotateX(${profileTiltX}deg) rotateY(${profileTiltY}deg)`,
                  transition: 'transform 0.1s ease',
                  transformStyle: 'preserve-3d',
                }}
                className="relative z-10 w-full max-w-sm"
              >
                <div className="glass-card relative overflow-hidden rounded-[2.5rem] border border-white/10 p-7 text-center shadow-glow backdrop-blur-xl bg-slate-950/80">
                  <div className="absolute -top-10 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />
                  
                  {/* Circular Premium Image Frame with Rotating Gradient Border and Shadow Glow */}
                  <div className="relative mx-auto mb-6 h-52 w-52 rounded-full p-[3px] bg-slate-950 overflow-hidden shadow-[0_0_35px_rgba(34,211,238,0.3)] group cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-indigo-500 animate-[spin_8s_linear_infinite] rounded-full pointer-events-none" />
                    <div className="absolute inset-[3px] bg-slate-950 rounded-full pointer-events-none" />
                    <img 
                      src={profileData.profileImage} 
                      alt="Rushikesh Davange" 
                      className="absolute inset-[6px] h-[calc(100%-12px)] w-[calc(100%-12px)] rounded-full object-cover z-10 transition duration-500 group-hover:scale-105" 
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.32em] text-cyan-400 font-bold">Rushikesh Davange</p>
                    <h2 className="text-xl font-bold text-white tracking-tight">{profileData.role}</h2>
                    <p className="mx-auto max-w-xs text-xs leading-5 text-slate-400">{profileData.careerObjective}</p>
                  </div>
                </div>
              </motion.div>

            </div>

          </div>
        </section>

        {/* Availability Banner */}
        <AvailabilityBanner 
          resume={profileData.resume} 
          role={profileData.role} 
          bio={profileData.bio} 
        />

        {/* About Section */}
        <motion.section 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.2 }} 
          variants={sectionFade} 
          className="mb-32" 
          id="about"
        >
          <SectionHeading pretitle="About Me" title="Transforming data into actionable business insights." />
          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="glass-card p-8 shadow-soft flex flex-col justify-center">
              <p className="text-base leading-8 text-slate-300">
                {profileData.bio}
              </p>
              {profileData.currentLearning && (
                <div className="mt-6 border-t border-white/5 pt-6 text-sm text-slate-400">
                  <span className="font-semibold text-cyan-400">Currently building and exploring:</span> {profileData.currentLearning}
                </div>
              )}
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 text-center shadow-soft backdrop-blur-xl">
                  <div className="text-3xl font-bold text-cyan-300">Fresher</div>
                  <div className="text-xs text-slate-400 mt-1">Ready to Impact</div>
                </div>
                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 text-center shadow-soft backdrop-blur-xl">
                  <div className="text-3xl font-bold text-cyan-300">{projectsData.length}</div>
                  <div className="text-xs text-slate-400 mt-1">Projects Done</div>
                </div>
                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 text-center shadow-soft backdrop-blur-xl">
                  <div className="text-3xl font-bold text-cyan-300">{certificationsData.length}</div>
                  <div className="text-xs text-slate-400 mt-1">Certifications</div>
                </div>
                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 text-center shadow-soft backdrop-blur-xl">
                  <div className="text-3xl font-bold text-cyan-300">{skillsData.length}</div>
                  <div className="text-xs text-slate-400 mt-1">Skills Mastered</div>
                </div>
              </div>
              <a 
                href={profileData.resume} 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center rounded-full border border-cyan-400/30 bg-slate-900/50 py-4 text-sm font-bold text-cyan-300 hover:bg-cyan-400/10 hover:scale-[1.01] transition-all"
              >
                Download Resume
              </a>
            </div>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.1 }} 
          variants={sectionFade} 
          className="mb-32" 
          id="skills"
        >
          <SectionHeading pretitle="Skills & Expertise" title="Interactive tools and technologies I master." />
          <div className="space-y-12">
            {groupedSkills.map((group) => {
              if (group.skills.length === 0) return null;
              return (
                <div key={group.category} className="space-y-6">
                  <h3 className="text-2xl font-bold text-white border-l-4 border-cyan-400 pl-4 tracking-tight">
                    {group.category}
                  </h3>
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {group.skills.map((skill) => (
                      <SkillCard key={skill.id || skill.name} skill={skill} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.1 }} 
          variants={sectionFade} 
          className="mb-32" 
          id="projects"
        >
          <SectionHeading pretitle="Projects" title="Data analytics applications with real business impact." />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projectsData.map((project) => (
              <ProjectCard key={project.id || project.title} project={project} />
            ))}
          </div>
        </motion.section>

        {/* Services Section */}
        <motion.section 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.2 }} 
          variants={sectionFade} 
          className="mb-32" 
          id="services"
        >
          <SectionHeading pretitle="Services" title="Data analytics services I provide." />
          <div className="grid gap-6 md:grid-cols-3">
            {servicesList.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </motion.section>

        {/* Certifications Section */}
        {certificationsData.length > 0 && (
          <motion.section 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, amount: 0.2 }} 
            variants={sectionFade} 
            className="mb-32" 
            id="certifications"
          >
            <SectionHeading pretitle="Certifications" title="Professional credentials and achievements." />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {certificationsData.map((cert) => (
                <CertificationCard key={cert.id || cert.title} certification={cert} />
              ))}
            </div>
          </motion.section>
        )}

        {/* Education Section */}
        {educationData.length > 0 && (
          <motion.section 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, amount: 0.2 }} 
            variants={sectionFade} 
            className="mb-32" 
            id="education"
          >
            <SectionHeading pretitle="Education" title="Academic background and qualifications." />
            <div className="grid gap-6 md:grid-cols-2">
              {educationData.map((edu) => (
                <EducationCard key={edu.id || edu.degree} education={edu} />
              ))}
            </div>
          </motion.section>
        )}

        {/* Contact Section */}
        <motion.section 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.2 }} 
          variants={sectionFade} 
          className="mb-20" 
          id="contact"
        >
          <SectionHeading pretitle="Contact" title="Let’s connect and launch your next project." />
          <div className="grid gap-8 lg:grid-cols-[0.9fr_0.8fr]">
            <div className="glass-card rounded-[2.5rem] p-8 shadow-soft bg-slate-950/70 border border-white/5">
              <h3 className="mb-3 text-2xl font-bold text-white tracking-tight">Send a message</h3>
              <p className="mb-8 text-slate-300 text-sm leading-relaxed">Reach out for collaborations, contract work, or internship positions.</p>
              <div className="space-y-4 text-sm text-slate-300">
                <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-5">
                  <p className="font-semibold text-cyan-400">Email</p>
                  <p className="mt-1 font-medium">{socialsData.email}</p>
                </div>
                {profileData.phone && (
                  <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-5">
                    <p className="font-semibold text-cyan-400">Phone</p>
                    <p className="mt-1 font-medium">{profileData.phone}</p>
                  </div>
                )}
                {profileData.location && (
                  <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-5">
                    <p className="font-semibold text-cyan-400">Location</p>
                    <p className="mt-1 font-medium">{profileData.location}</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-8 shadow-soft backdrop-blur-xl flex flex-col justify-between">
              <div>
                <h3 className="mb-6 text-2xl font-bold text-white tracking-tight">Connect on socials</h3>
                <SocialIcons socials={socialsData} />
              </div>
              <a 
                href={`mailto:${socialsData.email}`} 
                className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-500 py-4 text-sm font-bold text-slate-950 shadow-glow hover:scale-[1.01] transition-transform"
              >
                Email Me Directly
              </a>
            </div>
          </div>
        </motion.section>

      </main>

      <footer className="border-t border-white/10 bg-slate-950/40 py-8 relative z-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <p>© {new Date().getFullYear()} {profileData.name}. Crafted for data analytics & visualization excellence.</p>
          <SocialIcons socials={socialsData} minimal />
        </div>
      </footer>
    </div>
  );
}
