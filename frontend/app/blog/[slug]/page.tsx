'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { FiArrowLeft, FiClock } from 'react-icons/fi'
import { getBlog } from '@/lib/api'

export default function BlogPostPage() {
  const { slug } = useParams() as { slug: string }
  const [blog, setBlog] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getBlog(slug).then(b => { setBlog(b); setLoading(false) }).catch(() => setLoading(false))
  }, [slug])

  if (loading) return (
    <div className="min-h-screen pt-28 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!blog) return (
    <div className="min-h-screen pt-28 text-center">
      <div className="text-5xl mb-4"></div>
      <h2 className="text-white text-2xl font-bold mb-4">Blog post not found</h2>
      <Link href="/blog" className="btn-primary">← Back to Blog</Link>
    </div>
  )

  const tags = blog.tags ? blog.tags.split(',') : []

  return (
    <div className="min-h-screen pt-20">
      {/* Cover */}
      {blog.cover_image && (
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img src={blog.cover_image} alt={blog.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent" />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {/* Back link */}
        <Link href="/blog" className="inline-flex items-center gap-1 text-zinc-400 hover:text-white text-sm mb-6 transition-colors">
          <FiArrowLeft size={14} /> Back to Blog
        </Link>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {tags.map((t: string) => (
            <span key={t} className="text-xs text-cyan-400 font-mono bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded">
              #{t.trim()}
            </span>
          ))}
        </div>

        <h1 className="text-3xl md:text-4xl font-black text-white leading-snug mb-4">{blog.title}</h1>

        <div className="flex items-center gap-4 text-zinc-500 text-sm mb-8 pb-8 border-b border-zinc-700">
          <span className="flex items-center gap-1"><FiClock size={13} /> {blog.read_time} min read</span>
          {blog.published_at && (
            <span>{new Date(blog.published_at).toLocaleDateString('en-IN', { year:'numeric', month:'long', day:'numeric' })}</span>
          )}
          <span className="text-cyan-400 font-semibold">Rushikesh Davange</span>
        </div>

        {/* Summary */}
        {blog.summary && (
          <div className="glass-card p-5 mb-8 border-l-4 border-cyan-500">
            <p className="text-zinc-300 italic">{blog.summary}</p>
          </div>
        )}

        {/* Content */}
        <div className="pcyan-dark">
          <ReactMarkdown>{blog.content || ''}</ReactMarkdown>
        </div>

        {/* Author card */}
        <div className="mt-12 glass-card p-6 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center text-white font-black text-xl flex-shrink-0">
            RD
          </div>
          <div>
            <div className="text-white font-bold">Rushikesh Davange</div>
            <div className="text-zinc-400 text-sm">Data Scientist · ML Engineer · Full Stack Data Science learner</div>
            <Link href="/about" className="text-cyan-400 text-xs hover:text-cyan-300 transition-colors">View Profile →</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
