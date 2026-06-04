'use client'
import { useEffect, useState } from 'react'
import { getSkills } from '@/lib/api'

const FALLBACK: Record<string, any[]> = {
  'Programming': [
    { name: 'Python', level: 88, icon: '' }, { name: 'SQL', level: 75, icon: '️' }, { name: 'JavaScript', level: 55, icon: '' }
  ],
  'Data & ML': [
    { name: 'Pandas', level: 90, icon: '' }, { name: 'NumPy', level: 85, icon: '' },
    { name: 'Scikit-learn', level: 82, icon: '' }, { name: 'EDA', level: 90, icon: '' },
    { name: 'Feature Engineering', level: 80, icon: '️' }, { name: 'Machine Learning', level: 78, icon: '' }
  ],
  'Visualization': [
    { name: 'Matplotlib', level: 85, icon: '' }, { name: 'Seaborn', level: 85, icon: '' }, { name: 'Power BI', level: 70, icon: '' }
  ],
  'Tools & Deployment': [
    { name: 'Streamlit', level: 88, icon: '' }, { name: 'FastAPI', level: 72, icon: '' },
    { name: 'Git & GitHub', level: 80, icon: '' }, { name: 'Jupyter Notebook', level: 92, icon: '' }
  ],
  'Statistics': [
    { name: 'Hypothesis Testing', level: 75, icon: '' }, { name: 'Statistical Analysis', level: 78, icon: '' }
  ],
}

const pipeline = [
  { step: 'Data Collection', icon: '', desc: 'Web scraping, APIs, Kaggle, CSV/Excel datasets' },
  { step: 'Data Cleaning', icon: '', desc: 'Handle nulls, outliers, duplicates, type casting' },
  { step: 'EDA', icon: '', desc: 'Statistical summaries, distributions, correlations' },
  { step: 'Feature Engineering', icon: '️', desc: 'Encoding, scaling, interaction features, transformations' },
  { step: 'Model Building', icon: '', desc: 'Train/test split, cross-validation, hyperparameter tuning' },
  { step: 'Evaluation', icon: '', desc: 'Accuracy, F1, AUC-ROC, Silhouette Score, MAE/RMSE' },
  { step: 'Deployment', icon: '', desc: 'Streamlit apps, FastAPI endpoints, cloud hosting' },
]

export default function SkillsPage() {
  const [grouped, setGrouped] = useState<Record<string, any[]>>(FALLBACK)

  useEffect(() => { getSkills().then(d => { if (Object.keys(d).length) setGrouped(d) }).catch(() => {}) }, [])

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="relative py-20 px-4 text-center border-b border-zinc-800 bg-gradient-to-b from-blue-900/10 to-transparent overflow-hidden">
        <div className="orb orb-blue w-[400px] h-[400px] -top-10 left-1/4 opacity-10" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="tag mb-4 inline-block">️ Tech Stack</span>
          <h1 className="text-5xl font-black text-white mb-4">
            My <span className="gradient-text">Skills</span>
          </h1>
          <p className="text-zinc-400 text-xl">Tools and technologies I use to build data-driven solutions.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">

        {/* Skills Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {Object.entries(grouped).map(([cat, skills]) => (
              <div key={cat} className="glass-card p-6">
                <h3 className="text-cyan-400 font-bold uppercase tracking-wider text-sm mb-5">{cat}</h3>
                <div className="space-y-4">
                  {skills.map((s: any) => (
                    <div key={s.name}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-white font-medium">{s.icon} {s.name}</span>
                        <span className="text-zinc-500 font-mono text-xs">{s.level}%</span>
                      </div>
                      <div className="skill-bar">
                        <div className="skill-bar-fill" style={{ width: `${s.level}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pipeline — Skills in Action */}
        <section>
          <div className="text-center mb-12">
            <span className="tag mb-4 inline-block"> Skills in Action</span>
            <h2 className="section-title">How I Approach <span className="gradient-text">Every Project</span></h2>
            <p className="section-subtitle">My end-to-end data science workflow</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pipeline.map(({ step, icon, desc }, i) => (
              <div key={step} className="glass-card-hover p-5 relative">
                <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-cyan-600 text-white text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </div>
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="text-white font-bold mb-2 text-sm">{step}</h3>
                <p className="text-zinc-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Currently Learning */}
        <section className="glass-card p-8 bg-gradient-to-br from-cyan-900/20 to-violet-900/10">
          <h2 className="text-white font-black text-2xl mb-6"> Currently Learning</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {[
              { name: 'Next.js', icon: '️' }, { name: 'LangChain', icon: '' },
              { name: 'MLflow', icon: '' }, { name: 'Docker', icon: '' }, { name: 'LLMs / GPT', icon: '' },
            ].map(({ name, icon }) => (
              <div key={name} className="glass-card p-4 text-center hover:border-cyan-500/40 transition-colors">
                <div className="text-3xl mb-2">{icon}</div>
                <div className="text-zinc-300 text-sm font-medium">{name}</div>
                <div className="text-zinc-600 text-xs mt-1">Learning</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
