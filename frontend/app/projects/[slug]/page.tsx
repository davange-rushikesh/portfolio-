'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { FiGithub, FiExternalLink, FiArrowLeft, FiCheckCircle } from 'react-icons/fi'
import { getProject } from '@/lib/api'

export default function ProjectDetailPage() {
  const { slug } = useParams() as { slug: string }
  const [project, setProject] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProject(slug).then(p => { setProject(p); setLoading(false) })
      .catch(() => setLoading(false))
  }, [slug])

  if (loading) return (
    <div className="min-h-screen pt-28 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!project) return (
    <div className="min-h-screen pt-28 text-center">
      <div className="text-5xl mb-4"></div>
      <h2 className="text-white text-2xl font-bold mb-2">Project not found</h2>
      <Link href="/projects" className="btn-primary mt-4">← Back to Projects</Link>
    </div>
  )

  const tags = project.stack ? project.stack.split(',') : []

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Image */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        {project.image_url ? (
          <img src={project.image_url} alt={project.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-cyan-900 to-zinc-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 max-w-6xl mx-auto">
          <Link href="/projects" className="inline-flex items-center gap-1 text-zinc-400 hover:text-white text-sm mb-4 transition-colors">
            <FiArrowLeft size={14} /> Back to Projects
          </Link>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="tag">{project.category}</span>
            {project.is_featured && <span className="tag-emerald">⭐ Featured</span>}
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">{project.title}</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {project.summary && (
              <div className="glass-card p-6 border-l-4 border-cyan-500">
                <p className="text-zinc-300 text-lg leading-relaxed">{project.summary}</p>
              </div>
            )}
            {[
              { label: ' Problem Statement', content: project.problem_statement },
              { label: ' Approach & Methodology', content: project.approach },
              { label: ' Full Description', content: project.description },
              { label: ' Outcome & Impact', content: project.outcome },
            ].map(({ label, content }) =>
              content ? (
                <section key={label}>
                  <h2 className="text-white font-bold text-xl mb-3 flex items-center gap-2">
                    {label}
                  </h2>
                  <div className="glass-card p-6">
                    <p className="text-zinc-400 leading-relaxed whitespace-pre-line">{content}</p>
                  </div>
                </section>
              ) : null
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Action buttons */}
            <div className="glass-card p-5 space-y-3">
              <h3 className="text-white font-bold mb-1">Links</h3>
              {project.github_url && (
                <a href={project.github_url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 w-full btn-ghost justify-center text-sm">
                  <FiGithub /> View on GitHub
                </a>
              )}
              {project.demo_url && (
                <a href={project.demo_url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 w-full btn-primary justify-center text-sm">
                  <FiExternalLink /> Live Demo
                </a>
              )}
              {!project.github_url && !project.demo_url && (
                <p className="text-zinc-500 text-sm text-center">Links coming soon...</p>
              )}
            </div>

            {/* Tech Stack */}
            <div className="glass-card p-5">
              <h3 className="text-white font-bold mb-3">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((t: string) => (
                  <span key={t} className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-mono">
                    {t.trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* Key highlights */}
            <div className="glass-card p-5">
              <h3 className="text-white font-bold mb-3">Key Highlights</h3>
              <ul className="space-y-2">
                {[
                  'End-to-end implementation',
                  'Real-world dataset used',
                  'Business impact focused',
                  'Clean, documented code',
                ].map(point => (
                  <li key={point} className="flex items-center gap-2 text-sm text-zinc-400">
                    <FiCheckCircle className="text-violet-400 flex-shrink-0" size={14} />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
