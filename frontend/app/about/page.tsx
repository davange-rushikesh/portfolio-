'use client'
import { useEffect, useState } from 'react'
import { FiBriefcase, FiBook, FiTarget } from 'react-icons/fi'
import { getSkills } from '@/lib/api'

export default function AboutPage() {
  const [grouped, setGrouped] = useState<Record<string, any[]>>({})

  useEffect(() => { getSkills().then(setGrouped).catch(() => {}) }, [])

  const timeline = [
    { year: '2026', title: 'Full Stack Data Science + AI', sub: 'Currently learning — FastAPI, Next.js, LLMs, MLOps', icon: '', color: 'text-cyan-400' },
    { year: '2026', title: 'Customer Segmentation Project', sub: 'End-to-end KMeans clustering pipeline with Scikit-learn', icon: '', color: 'text-violet-400' },
    { year: '2025', title: 'Contact Management App (Streamlit)', sub: 'Full CRUD application with file-based persistence', icon: '', color: 'text-blue-400' },
    { year: '2025', title: 'Started Data Science Journey', sub: 'Mastered Python, Pandas, NumPy, EDA, Scikit-learn', icon: '', color: 'text-blue-400' },
    { year: '2022', title: 'BCA — Computer Science', sub: 'Shivaji Arts, Commerce & Science College — Kannad | BAM University', icon: '', color: 'text-yellow-400' },
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="relative py-20 px-4 sm:px-6 bg-gradient-to-b from-cyan-900/20 to-transparent border-b border-zinc-800 text-center overflow-hidden">
        <div className="orb orb-cyan w-[400px] h-[400px] -top-20 left-1/2 -translate-x-1/2" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="tag mb-4 inline-block">‍ About Me</span>
          <h1 className="text-5xl font-black text-white mb-4">
            The Story <span className="gradient-text">Behind the Data</span>
          </h1>
          <p className="text-zinc-400 text-xl">
            From a curious CS student to a Full Stack Data Scientist in the making.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-20">

        {/* Bio */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="section-title">Who Am I?</h2>
            <div className="space-y-4 text-zinc-400 leading-relaxed">
              <p>
                I'm <strong className="text-white">Rushikesh Davange</strong>, a Data Analyst and Machine Learning enthusiast 
                with a strong foundation in Python, data science, and building end-to-end analytical solutions.
              </p>
              <p>
                My journey began with a <strong className="text-white">BCA in Computer Science</strong> at Shivaji Arts, 
                Commerce & Science College (BAM University, Aurangabad). During my studies, I discovered 
                my passion for data — specifically how data can tell powerful stories and drive real business decisions.
              </p>
              <p>
                I specialize in the <strong className="text-cyan-400">complete data science pipeline</strong>: 
                from raw data cleaning and exploratory analysis to building ML models and deploying interactive 
                web apps with Streamlit.
              </p>
              <p>
                Currently I'm expanding my skills into <strong className="text-violet-400">Full Stack Data Science with AI</strong> — 
                learning FastAPI, Next.js, MLOps, and LLM integration to build production-ready AI products.
              </p>
            </div>
          </div>

          {/* Key facts */}
          <div className="space-y-4">
            {[
              { icon: FiBriefcase, label: 'Looking For', value: 'Data Analyst / ML Engineer / Data Scientist roles', color: 'indigo' },
              { icon: FiBook, label: 'Education', value: 'BCA in Computer Science — CGPA: 68.5%', color: 'purple' },
              { icon: FiTarget, label: 'Mission', value: 'Build end-to-end AI-powered data products that solve real problems', color: 'emerald' },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className={`glass-card p-5 border-l-4 border-${color}-500`}>
                <div className="flex items-start gap-3">
                  <Icon className={`text-${color}-400 mt-0.5 flex-shrink-0`} size={20} />
                  <div>
                    <div className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-1">{label}</div>
                    <div className="text-white font-medium">{value}</div>
                  </div>
                </div>
              </div>
            ))}

            {/* Open to work badge */}
            <div className="glass-card p-5 bg-violet-500/5 border-violet-500/30">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2.5 h-2.5 rounded-full bg-violet-400 animate-pulse" />
                <span className="text-violet-400 font-semibold">Open to Work</span>
              </div>
              <p className="text-zinc-400 text-sm">Actively looking for full-time, internship, and remote Data Science / ML opportunities.</p>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section>
          <h2 className="section-title mb-10">My <span className="gradient-text">Learning Journey</span></h2>
          <div className="relative pl-10">
            <div className="timeline-line" />
            <div className="space-y-8">
              {timeline.map(({ year, title, sub, icon, color }, i) => (
                <div key={i} className="relative">
                  <div className="timeline-dot" style={{ top: '6px' }} />
                  <div className="glass-card-hover p-5 ml-4">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl flex-shrink-0">{icon}</div>
                      <div>
                        <div className={`text-xs font-mono font-bold ${color} mb-1`}>{year}</div>
                        <h3 className="text-white font-bold mb-1">{title}</h3>
                        <p className="text-zinc-400 text-sm">{sub}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Preview */}
        <section>
          <h2 className="section-title mb-10">Technical <span className="gradient-text">Skills</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(grouped).length > 0
              ? Object.entries(grouped).map(([cat, skills]) => (
                <div key={cat} className="glass-card p-5">
                  <h3 className="text-cyan-400 font-bold text-sm uppercase tracking-wider mb-4">{cat}</h3>
                  <div className="space-y-3">
                    {(skills as any[]).map((s: any) => (
                      <div key={s.name}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-zinc-300">{s.icon} {s.name}</span>
                          <span className="text-zinc-500 font-mono">{s.level}%</span>
                        </div>
                        <div className="skill-bar">
                          <div className="skill-bar-fill" style={{ width: `${s.level}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
              : [
                { cat: 'Programming', skills: [{ name: 'Python', level: 88 }, { name: 'SQL', level: 75 }] },
                { cat: 'Data & ML', skills: [{ name: 'Pandas', level: 90 }, { name: 'Scikit-learn', level: 82 }, { name: 'EDA', level: 90 }] },
                { cat: 'Tools', skills: [{ name: 'Streamlit', level: 88 }, { name: 'Git & GitHub', level: 80 }] },
              ].map(({ cat, skills }) => (
                <div key={cat} className="glass-card p-5">
                  <h3 className="text-cyan-400 font-bold text-sm uppercase tracking-wider mb-4">{cat}</h3>
                  <div className="space-y-3">
                    {skills.map(s => (
                      <div key={s.name}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-zinc-300">{s.name}</span>
                          <span className="text-zinc-500 font-mono">{s.level}%</span>
                        </div>
                        <div className="skill-bar">
                          <div className="skill-bar-fill" style={{ width: `${s.level}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            }
          </div>
        </section>
      </div>
    </div>
  )
}
