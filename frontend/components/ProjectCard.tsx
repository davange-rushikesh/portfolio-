import Link from 'next/link'
import Image from 'next/image'
import { FiGithub, FiExternalLink, FiArrowRight } from 'react-icons/fi'

interface Project {
  id: number
  title: string
  slug: string
  summary: string
  image_url: string
  github_url: string
  demo_url: string
  category: string
  stack: string
  is_featured: boolean
}

export default function ProjectCard({ project }: { project: Project }) {
  const tags = project.stack ? project.stack.split(',').slice(0, 4) : []

  return (
    <div className="glass-card-hover group flex flex-col overflow-hidden">
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden bg-zinc-800">
        {project.image_url ? (
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-cyan-900/50 to-violet-900/30 flex items-center justify-center">
            <span className="text-5xl"></span>
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="tag text-xs">{project.category}</span>
        </div>
        {project.is_featured && (
          <div className="absolute top-3 right-3">
            <span className="tag-emerald text-xs">⭐ Featured</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-white font-bold text-lg mb-2 group-hover:text-cyan-300 transition-colors line-clamp-2">
          {project.title}
        </h3>
        <p className="text-zinc-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
          {project.summary}
        </p>

        {/* Stack tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags.map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded bg-zinc-700/50 text-zinc-400 font-mono">
              {tag.trim()}
            </span>
          ))}
          {project.stack && project.stack.split(',').length > 4 && (
            <span className="text-xs px-2 py-0.5 rounded bg-zinc-700/50 text-zinc-500">
              +{project.stack.split(',').length - 4} more
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-2 mt-auto pt-4 border-t border-zinc-700/50">
          <div className="flex items-center gap-2">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all"
                title="GitHub"
              >
                <FiGithub size={16} />
              </a>
            )}
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-zinc-400 hover:text-violet-400 hover:bg-violet-500/10 transition-all"
                title="Live Demo"
              >
                <FiExternalLink size={16} />
              </a>
            )}
          </div>
          <Link
            href={`/projects/${project.slug}`}
            className="flex items-center gap-1.5 text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors group/btn"
          >
            View Details
            <FiArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}
