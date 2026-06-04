'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FiPlus, FiEdit2, FiTrash2, FiExternalLink } from 'react-icons/fi'
import toast from 'react-hot-toast'
import ReactMarkdown from 'react-markdown'
import { getAdminBlogs, createBlog, updateBlog, deleteBlog, isAdminLoggedIn } from '@/lib/api'

const EMPTY = { title: '', slug: '', summary: '', content: '', cover_image: '', tags: '', is_published: true, read_time: 5 }

export default function AdminBlogsPage() {
  const router = useRouter()
  const [blogs, setBlogs] = useState<any[]>([])
  const [form, setForm] = useState<any>(EMPTY)
  const [editing, setEditing] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [viewMode, setViewMode] = useState<'write' | 'preview'>('write')

  useEffect(() => {
    if (!isAdminLoggedIn()) { router.push('/admin/login'); return }
    load()
  }, [router])

  const load = () => getAdminBlogs().then(setBlogs).catch(() => {})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title || !form.slug) return toast.error('Title and slug are required')
    setLoading(true)
    try {
      if (editing) await updateBlog(editing, form)
      else await createBlog(form)
      toast.success(editing ? 'Blog updated' : 'Blog created')
      setForm(EMPTY); setEditing(null); setShowForm(false); load()
    } catch { toast.error('Failed to save blog') }
    finally { setLoading(false) }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this blog post?')) return
    try { await deleteBlog(id); toast.success('Deleted'); load() }
    catch { toast.error('Failed to delete') }
  }

  const generateSlug = (t: string) => t.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-')

  return (
    <div className="min-h-screen bg-dark-900 pt-6 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-white">Manage Blogs</h1>
            <p className="text-zinc-400 text-sm">{blogs.length} posts</p>
          </div>
          <button onClick={() => { setForm(EMPTY); setEditing(null); setShowForm(!showForm) }} className="btn-primary">
            <FiPlus /> {showForm ? 'Cancel' : 'New Post'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="glass-card p-6 mb-8 space-y-4">
            <h2 className="text-white font-bold text-xl mb-4">{editing ? 'Edit Post' : 'New Post'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-zinc-400 text-sm mb-1">Title *</label>
                <input value={form.title} onChange={e => setForm({...form, title: e.target.value, slug: generateSlug(e.target.value)})} className="input-field" required /></div>
              <div><label className="block text-zinc-400 text-sm mb-1">Slug *</label>
                <input value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} className="input-field font-mono" required /></div>
              <div className="md:col-span-2"><label className="block text-zinc-400 text-sm mb-1">Cover Image URL</label>
                <input value={form.cover_image} onChange={e => setForm({...form, cover_image: e.target.value})} className="input-field" /></div>
              <div className="md:col-span-2"><label className="block text-zinc-400 text-sm mb-1">Summary</label>
                <textarea value={form.summary} onChange={e => setForm({...form, summary: e.target.value})} className="input-field" rows={2}/></div>
              
              <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-zinc-400 text-sm">Markdown Content</label>
                  <div className="flex bg-zinc-800/50 rounded-lg p-1 border border-zinc-700/50">
                    <button type="button" onClick={() => setViewMode('write')} className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${viewMode === 'write' ? 'bg-cyan-500 text-white' : 'text-zinc-400 hover:text-white'}`}>Write</button>
                    <button type="button" onClick={() => setViewMode('preview')} className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${viewMode === 'preview' ? 'bg-cyan-500 text-white' : 'text-zinc-400 hover:text-white'}`}>Preview</button>
                  </div>
                </div>
                {viewMode === 'write' ? (
                  <textarea value={form.content} onChange={e => setForm({...form, content: e.target.value})} className="input-field font-mono text-sm" rows={12}/>
                ) : (
                  <div className="p-4 bg-dark-800 border border-zinc-700 rounded-lg overflow-y-auto pcyan-dark max-w-none text-left" style={{ minHeight: '18rem' }}>
                    {form.content ? <ReactMarkdown>{form.content}</ReactMarkdown> : <span className="text-zinc-500 italic">Nothing to preview...</span>}
                  </div>
                )}
              </div>
              <div><label className="block text-zinc-400 text-sm mb-1">Tags (comma separated)</label>
                <input value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} className="input-field" /></div>
              <div><label className="block text-zinc-400 text-sm mb-1">Read Time (minutes)</label>
                <input type="number" value={form.read_time} onChange={e => setForm({...form, read_time: +e.target.value})} className="input-field" /></div>
              <div className="flex items-center gap-2 md:col-span-2 mt-2">
                <input type="checkbox" id="pub" checked={form.is_published} onChange={e => setForm({...form, is_published: e.target.checked})} className="w-4 h-4 accent-cyan-500" />
                <label htmlFor="pub" className="text-white text-sm">Published</label>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary mt-4">
              {loading ? 'Saving...' : 'Save Post'}
            </button>
          </form>
        )}

        <div className="glass-card overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-zinc-800/50 border-b border-zinc-700">
              <tr>
                <th className="p-4 text-zinc-400 text-sm font-semibold">Title</th>
                <th className="p-4 text-zinc-400 text-sm font-semibold">Status</th>
                <th className="p-4 text-zinc-400 text-sm font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-700/50">
              {blogs.map(b => (
                <tr key={b.id} className="hover:bg-zinc-800/30">
                  <td className="p-4">
                    <div className="text-white font-medium">{b.title}</div>
                    <div className="text-zinc-500 text-xs font-mono">{b.slug}</div>
                  </td>
                  <td className="p-4">
                    {b.is_published ? <span className="tag-emerald text-xs">Published</span> : <span className="tag text-xs bg-zinc-500/10 text-zinc-400">Draft</span>}
                  </td>
                  <td className="p-4 text-right">
                    <a href={`/blog/${b.slug}`} target="_blank" className="p-1.5 text-zinc-400 hover:text-violet-400 mr-2 inline-block"><FiExternalLink /></a>
                    <button onClick={() => { setForm(b); setEditing(b.id); setShowForm(true) }} className="p-1.5 text-zinc-400 hover:text-cyan-400 mr-2"><FiEdit2 /></button>
                    <button onClick={() => handleDelete(b.id)} className="p-1.5 text-zinc-400 hover:text-red-400"><FiTrash2 /></button>
                  </td>
                </tr>
              ))}
              {blogs.length === 0 && <tr><td colSpan={3} className="p-4 text-center text-zinc-500">No blog posts found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
