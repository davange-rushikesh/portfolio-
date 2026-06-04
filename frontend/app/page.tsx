'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { TypeAnimation } from 'react-type-animation'
import { FiArrowRight, FiDownload, FiGithub, FiMail, FiStar, FiCode, FiBriefcase } from 'react-icons/fi'
import { FiLinkedin, FiDatabase } from 'react-icons/fi'
import ProjectCard from '@/components/ProjectCard'
import Photo3D from '@/components/Photo3D'
import { getProfile, getProjects } from '@/lib/api'

export default function HomePage() {
  const [profile, setProfile] = useState<any>(null)
  const [projects, setProjects] = useState<any[]>([])

  useEffect(() => {
    getProfile().then(setProfile).catch(() => {})
    getProjects({ featured: true }).then(setProjects).catch(() => {})
  }, [])

  const stats = [
    { label: 'Projects Built', value: '6+', icon: FiCode },
    { label: 'ML Models', value: '10+', icon: FiStar },
    { label: 'Open to Work', value: 'Yes', icon: FiBriefcase },
  ]

  const skills = ['Python', 'Machine Learning', 'Pandas & NumPy', 'Scikit-learn', 'Streamlit', 'SQL', 'EDA', 'Data Visualization', 'FastAPI', 'Git & GitHub']

  return (
    <div className="min-h-screen">

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg pt-16">
        {/* Orbs */}
        <div className="orb orb-cyan w-[600px] h-[600px] -top-32 -left-32" />
        <div className="orb orb-violet w-[400px] h-[400px] top-1/2 -right-20" />
        <div className="orb orb-blue w-[300px] h-[300px] bottom-0 left-1/3" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-sm font-medium mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            Available for Data Science & ML roles
          </div>

          {/* 3D Photo */}
          <Photo3D />

          {/* Name */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-4 animate-slide-up">
            Hi, I'm{' '}
            <span className="gradient-text">Rushikesh Davange</span>
          </h1>

          {/* Animated role */}
          <div className="text-2xl sm:text-3xl font-bold text-zinc-300 mb-6 h-12">
            <TypeAnimation
              sequence={[
                'Data Analyst ', 2000,
                'ML Engineer ', 2000,
                'AI Developer ', 2000,
                'Full Stack Data Scientist ', 2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>

          {/* Tagline */}
          <p className="text-zinc-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            I transform raw data into <span className="text-cyan-400 font-semibold">actionable insights</span> and build 
            end-to-end data products — from EDA to ML models to deployed web apps.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
            <Link href="/projects" className="btn-primary text-base px-8 py-3.5">
              View My Projects <FiArrowRight />
            </Link>
            <Link href="/resume" className="btn-ghost text-base px-8 py-3.5">
              <FiDownload /> Download Resume
            </Link>
            <Link href="/contact" className="btn-ghost text-base px-8 py-3.5">
              <FiMail /> Hire Me
            </Link>
          </div>

          {/* Social Row */}
          <div className="flex items-center justify-center gap-5 mb-16">
            {[
              { icon: FiGithub, href: 'https://github.com/davange-rushikesh', label: 'GitHub' },
              { icon: FiLinkedin, href: 'https://www.linkedin.com/in/rushikeshdavange/', label: 'LinkedIn' },
              { icon: FiDatabase, href: 'https://www.kaggle.com/rushidavange', label: 'Kaggle' },
              { icon: FiMail, href: 'mailto:rushikeshdavange9@gmail.com', label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer" aria-label={label}
                className="p-3 rounded-xl bg-zinc-800/80 border border-zinc-700 text-zinc-400 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-200 hover:-translate-y-1">
                <Icon size={20} />
              </a>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="glass-card p-4 text-center">
                <Icon className="text-cyan-400 mx-auto mb-1" size={20} />
                <div className="text-2xl font-black text-white">{value}</div>
                <div className="text-zinc-500 text-xs">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-zinc-600 to-transparent" />
        </div>
      </section>

      {/* ── Skills Strip ─────────────────────────────────────────────────── */}
      <section className="border-y border-zinc-800 py-6 bg-zinc-900/30 overflow-hidden">
        <div className="flex gap-6 animate-pulse-slow">
          {[...skills, ...skills].map((s, i) => (
            <span key={i} className="whitespace-nowrap text-zinc-500 text-sm font-mono px-4 py-1.5 rounded-full bg-zinc-800/50 border border-zinc-700/50 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors cursor-default flex-shrink-0">
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* ── About Snapshot ───────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left text */}
          <div>
            <span className="tag mb-4 inline-block"> About Me</span>
            <h2 className="section-title">
              From Data to <span className="gradient-text">Decisions</span>
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              I'm a <strong className="text-white">Data Analyst and aspiring ML Engineer</strong> with a BCA in Computer Science. 
              I specialize in building end-to-end data pipelines — from raw data cleaning and EDA to 
              training ML models and deploying them as interactive Streamlit web apps.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Currently learning <strong className="text-cyan-400">Full Stack Data Science with AI</strong>, 
              I'm on a mission to bridge the gap between data science and software engineering — 
              building products that are not just smart, but also usable.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/about" className="btn-primary">
                My Journey <FiArrowRight />
              </Link>
              <Link href="/skills" className="btn-ghost">
                View Skills
              </Link>
            </div>
          </div>

          {/* Right cards */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: 'BCA in Computer Science', sub: 'Shivaji Arts, Commerce & Science College', icon: '' },
              { title: 'Python Expert', sub: 'Pandas, NumPy, Sklearn, Streamlit', icon: '' },
              { title: 'ML & AI', sub: 'Classification, Clustering, NLP', icon: '' },
              { title: 'Open to Work', sub: 'Remote & On-site Positions', icon: '' },
            ].map(({ title, sub, icon }) => (
              <div key={title} className="glass-card-hover p-5">
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="text-white font-semibold text-sm mb-1">{title}</h3>
                <p className="text-zinc-500 text-xs">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Projects ─────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 bg-zinc-900/30 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="tag mb-4 inline-block"> Portfolio</span>
            <h2 className="section-title">Featured <span className="gradient-text">Projects</span></h2>
            <p className="section-subtitle">Real-world data science and ML projects with end-to-end implementation</p>
          </div>
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.slice(0, 3).map(p => <ProjectCard key={p.id} project={p} />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { id:1, title:'Customer Segmentation', slug:'customer-segmentation', summary:'KMeans clustering pipeline identifying 3 distinct customer groups to drive targeted marketing.', image_url:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800', category:'Machine Learning', stack:'Python,Pandas,Scikit-learn,Matplotlib', is_featured:true, github_url:'#', demo_url:'' },
                { id:2, title:'Spam Email Classifier', slug:'spam-email-classifier', summary:'NLP-based classifier achieving 97.2% accuracy using TF-IDF and Naive Bayes.', image_url:'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800', category:'NLP / ML', stack:'Python,NLTK,Scikit-learn,Streamlit', is_featured:true, github_url:'#', demo_url:'' },
                { id:3, title:'Sales Analytics Dashboard', slug:'sales-analytics-dashboard', summary:'Interactive Power BI + Python dashboard with KPIs and trend analysis for business decisions.', image_url:'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800', category:'Data Analysis', stack:'Python,Pandas,Power BI,Seaborn', is_featured:true, github_url:'#', demo_url:'' },
              ].map(p => <ProjectCard key={p.id} project={p} />)}
            </div>
          )}
          <div className="text-center mt-10">
            <Link href="/projects" className="btn-ghost">
              See All Projects <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Pipeline Section ─────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="tag mb-4 inline-block">️ My Process</span>
          <h2 className="section-title">End-to-End <span className="gradient-text">Data Science Pipeline</span></h2>
          <p className="section-subtitle">How I turn raw data into deployed, production-ready solutions</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {[
            { step: '01', label: 'Data Collection', icon: '', color: 'from-cyan-500 to-cyan-700' },
            { step: '02', label: 'Cleaning', icon: '', color: 'from-blue-500 to-blue-700' },
            { step: '03', label: 'EDA', icon: '', color: 'from-violet-500 to-violet-700' },
            { step: '04', label: 'Feature Eng.', icon: '️', color: 'from-blue-500 to-blue-700' },
            { step: '05', label: 'Modeling', icon: '', color: 'from-cyan-500 to-cyan-700' },
            { step: '06', label: 'Evaluation', icon: '', color: 'from-teal-500 to-teal-700' },
            { step: '07', label: 'API / Backend', icon: '', color: 'from-violet-500 to-violet-700' },
            { step: '08', label: 'Deployment', icon: '', color: 'from-green-500 to-green-700' },
          ].map(({ step, label, icon, color }) => (
            <div key={step} className="glass-card p-3 text-center hover:border-cyan-500/40 transition-all group">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-xl mx-auto mb-2 group-hover:scale-110 transition-transform`}>
                {icon}
              </div>
              <div className="text-xs text-cyan-400 font-mono mb-1">{step}</div>
              <div className="text-xs text-zinc-300 font-medium leading-tight">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 bg-gradient-to-br from-cyan-900/30 via-zinc-900 to-violet-900/20 border-y border-zinc-800">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-4">
            Ready to <span className="gradient-text">build something great</span> together?
          </h2>
          <p className="text-zinc-400 text-lg mb-8">
            I'm actively seeking Data Analyst, ML Engineer, and Full Stack Data Science roles. 
            Let's connect and discuss how I can add value to your team.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact" className="btn-primary text-base px-8 py-3.5">
              <FiMail /> Get In Touch
            </Link>
            <Link href="/resume" className="btn-ghost text-base px-8 py-3.5">
              <FiDownload /> Download Resume
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
