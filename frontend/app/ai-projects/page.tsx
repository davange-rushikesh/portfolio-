'use client'
import { useEffect, useState } from 'react'
import { FiGithub, FiExternalLink, FiCpu } from 'react-icons/fi'
import { getAIProjects } from '@/lib/api'

const FALLBACK = [
  { id:1, title:'AI Resume Analyzer & ATS Optimizer', slug:'ai-resume-analyzer', category:'LLM',
    summary:'GPT-powered resume analyzer that scores ATS compatibility, extracts skills, and provides improvement suggestions.',
    description:'End-to-end LLM application using GPT-4 for resume analysis. Parses PDFs, scores ATS compatibility, identifies missing keywords, and gives formatting recommendations.',
    tools:'Python,OpenAI GPT-4,Streamlit,PyPDF2,LangChain',
    architecture:'PDF Upload → Text Extraction (PyPDF2) → Prompt Engineering → GPT-4 API → Structured JSON → Streamlit UI',
    github_url:'https://github.com/davange-rushikesh', demo_url:'',
    image_url:'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800' },
  { id:2, title:'Spam Email Classifier (NLP)', slug:'spam-nlp', category:'NLP',
    summary:'Fine-tuned NLP pipeline for email classification using TF-IDF + Naive Bayes achieving 97.2% accuracy.',
    description:'Text preprocessing → TF-IDF Vectorization → Naive Bayes → Streamlit UI for real-time prediction.',
    tools:'Python,NLTK,Scikit-learn,TF-IDF,Streamlit',
    architecture:'Raw Email → Preprocessing → TF-IDF → Naive Bayes → Prediction API → Streamlit',
    github_url:'https://github.com/davange-rushikesh', demo_url:'',
    image_url:'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800' },
]

const categoryColors: Record<string, string> = {
  LLM: 'from-blue-500 to-cyan-600',
  NLP: 'from-blue-500 to-cyan-600',
  CV: 'from-pink-500 to-cyan-600',
  Recommendation: 'from-violet-500 to-teal-600',
}

export default function AIProjectsPage() {
  const [projects, setProjects] = useState<any[]>([])

  useEffect(() => {
    getAIProjects().then(d => setProjects(d.length ? d : FALLBACK)).catch(() => setProjects(FALLBACK))
  }, [])

  return (
    <div className="min-h-screen pt-20">
      <section className="relative py-20 px-4 text-center border-b border-zinc-800 bg-gradient-to-b from-blue-900/10 to-transparent overflow-hidden">
        <div className="orb orb-blue w-[400px] h-[400px] top-0 right-0 opacity-10" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="tag mb-4 inline-block"> Artificial Intelligence</span>
          <h1 className="text-5xl font-black text-white mb-4">AI / LLM <span className="gradient-text">Projects</span></h1>
          <p className="text-zinc-400 text-xl">NLP, LLMs, and AI-powered applications built with Python.</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map(p => {
            const tools = p.tools ? p.tools.split(',') : []
            const gradient = categoryColors[p.category] || 'from-cyan-500 to-blue-600'
            return (
              <div key={p.id} className="glass-card-hover overflow-hidden flex flex-col">
                {/* Top gradient banner */}
                <div className={`h-2 bg-gradient-to-r ${gradient}`} />

                {/* Image */}
                {p.image_url && (
                  <div className="h-44 overflow-hidden">
                    <img src={p.image_url} alt={p.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                )}

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${gradient} text-white`}>{p.category}</span>
                  </div>
                  <h2 className="text-white font-black text-xl mb-2">{p.title}</h2>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-4 flex-1">{p.summary}</p>

                  {/* Architecture */}
                  {p.architecture && (
                    <div className="bg-zinc-800/50 rounded-xl p-3 mb-4">
                      <div className="text-xs text-cyan-400 font-bold mb-1.5 flex items-center gap-1">
                        <FiCpu size={11} /> Architecture
                      </div>
                      <p className="text-zinc-400 text-xs font-mono leading-relaxed">{p.architecture}</p>
                    </div>
                  )}

                  {/* Tools */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {tools.slice(0, 5).map((t: string) => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-mono">{t.trim()}</span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-2 mt-auto pt-4 border-t border-zinc-700/50">
                    {p.github_url && (
                      <a href={p.github_url} target="_blank" rel="noopener noreferrer" className="btn-ghost text-xs px-4 py-2">
                        <FiGithub size={13} /> GitHub
                      </a>
                    )}
                    {p.demo_url && (
                      <a href={p.demo_url} target="_blank" rel="noopener noreferrer" className="btn-primary text-xs px-4 py-2">
                        <FiExternalLink size={13} /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
