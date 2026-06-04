'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FiClock, FiArrowRight, FiTag } from 'react-icons/fi'
import { getBlogs } from '@/lib/api'

const FALLBACK = [
  { id:1, title:'KNN Algorithm Explained Simply — With Python Code', slug:'knn-explained-simply', summary:'Break down KNN with clear intuition, visualizations, and complete Python implementation from scratch.', cover_image:'https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=800', tags:'machine-learning,python,knn', read_time:6, published_at:'2026-03-15' },
  { id:2, title:'Bias vs Variance — The Tradeoff Every Data Scientist Must Know', slug:'bias-vs-variance-tradeoff', summary:'The most fundamental concept in ML: the bias-variance tradeoff with practical examples and solutions.', cover_image:'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800', tags:'machine-learning,bias,variance', read_time:8, published_at:'2026-02-28' },
  { id:3, title:'Feature Engineering Tips That Improved My Model by 15%', slug:'feature-engineering-tips', summary:'Practical feature engineering techniques from real projects — handling missing values to interaction features.', cover_image:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800', tags:'feature-engineering,pandas,python', read_time:7, published_at:'2026-02-10' },
]

export default function BlogPage() {
  const [blogs, setBlogs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getBlogs().then(d => { setBlogs(d.length ? d : FALLBACK); setLoading(false) })
      .catch(() => { setBlogs(FALLBACK); setLoading(false) })
  }, [])

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="relative py-20 px-4 text-center border-b border-zinc-800 bg-gradient-to-b from-blue-900/10 to-transparent overflow-hidden">
        <div className="orb orb-cyan w-[300px] h-[300px] top-0 right-1/4 opacity-10" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="tag mb-4 inline-block"> Learning Notes</span>
          <h1 className="text-5xl font-black text-white mb-4">
            Blog & <span className="gradient-text">Insights</span>
          </h1>
          <p className="text-zinc-400 text-xl">
            Notes, tutorials, and deep-dives on Data Science, ML, and AI concepts.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        {loading ? (
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="glass-card h-40 animate-pulse flex gap-6 p-6">
                <div className="w-32 h-28 bg-zinc-800 rounded-xl flex-shrink-0" />
                <div className="flex-1 space-y-3">
                  <div className="h-5 bg-zinc-800 rounded w-3/4" />
                  <div className="h-3 bg-zinc-800 rounded w-full" />
                  <div className="h-3 bg-zinc-800 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {blogs.map(blog => {
              const tags = blog.tags ? blog.tags.split(',') : []
              return (
                <article key={blog.id} className="glass-card-hover p-0 overflow-hidden flex flex-col sm:flex-row gap-0">
                  {/* Thumbnail */}
                  {blog.cover_image && (
                    <div className="sm:w-56 h-48 sm:h-auto flex-shrink-0 overflow-hidden">
                      <img src={blog.cover_image} alt={blog.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  {/* Content */}
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {tags.slice(0, 3).map((t: string) => (
                          <span key={t} className="text-xs text-cyan-400 font-mono bg-cyan-500/10 px-2 py-0.5 rounded">
                            #{t.trim()}
                          </span>
                        ))}
                      </div>
                      <h2 className="text-white font-bold text-xl mb-2 hover:text-cyan-300 transition-colors leading-snug">
                        <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                      </h2>
                      <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">{blog.summary}</p>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-700/50">
                      <div className="flex items-center gap-3 text-xs text-zinc-500">
                        <span className="flex items-center gap-1">
                          <FiClock size={12} /> {blog.read_time} min read
                        </span>
                        {blog.published_at && (
                          <span>{new Date(blog.published_at).toLocaleDateString('en-IN', { year:'numeric', month:'short', day:'numeric' })}</span>
                        )}
                      </div>
                      <Link href={`/blog/${blog.slug}`}
                        className="text-cyan-400 hover:text-cyan-300 text-sm font-medium flex items-center gap-1 transition-colors group">
                        Read More <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
