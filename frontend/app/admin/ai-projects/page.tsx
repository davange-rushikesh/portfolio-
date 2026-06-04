'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi'
import toast from 'react-hot-toast'
import api, { isAdminLoggedIn } from '@/lib/api'

const EMPTY = { title: '', slug: '', category: 'LLM', summary: '', description: '', tools: '', architecture: '', image_url: '', github_url: '', demo_url: '', sort_order: 0 }

export default function AdminAIProjects() {
  const router = useRouter()
  const [projs, setProjs] = useState<any[]>([])
  const [form, setForm] = useState<any>(EMPTY)
  const [editing, setEditing] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isAdminLoggedIn()) { router.push('/admin/login'); return }
    load()
  }, [router])

  const load = () => api.get('/api/ai-projects').then(res => setProjs(res.data)).catch(() => {})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title) return toast.error('Title required')
    setLoading(true)
    try {
      if (editing) await api.put(`/api/admin/ai-projects/${editing}`, form)
      else await api.post('/api/admin/ai-projects', form)
      toast.success(editing ? 'Updated' : 'Created')
      setForm(EMPTY); setEditing(null); setShowForm(false); load()
    } catch { toast.error('Failed to save') }
    finally { setLoading(false) }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this AI project?')) return
    try { await api.delete(`/api/admin/ai-projects/${id}`); toast.success('Deleted'); load() }
    catch { toast.error('Failed to delete') }
  }

  return (
    <div className="min-h-screen bg-dark-900 pt-6 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-black text-white">Manage AI/LLM Projects</h1>
          <button onClick={() => { setForm(EMPTY); setEditing(null); setShowForm(!showForm) }} className="btn-primary">
            <FiPlus /> {showForm ? 'Cancel' : 'Add Project'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="glass-card p-6 mb-8 space-y-4">
            <h2 className="text-white font-bold text-xl mb-4">{editing ? 'Edit' : 'New'} AI Project</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-zinc-400 text-sm mb-1">Title</label><input value={form.title} onChange={e => setForm({...form, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^\w\s]/g,'').replace(/\s+/g,'-')})} className="input-field" required /></div>
              <div><label className="block text-zinc-400 text-sm mb-1">Slug</label><input value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} className="input-field font-mono" required /></div>
              <div><label className="block text-zinc-400 text-sm mb-1">Category (e.g., LLM, NLP, CV)</label><input value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="input-field" /></div>
              <div><label className="block text-zinc-400 text-sm mb-1">Tools (comma separated)</label><input value={form.tools} onChange={e => setForm({...form, tools: e.target.value})} className="input-field" /></div>
              <div className="md:col-span-2"><label className="block text-zinc-400 text-sm mb-1">Architecture details</label><input value={form.architecture} onChange={e => setForm({...form, architecture: e.target.value})} className="input-field" placeholder="PDF Upload -> Text Extraction -> GPT-4..." /></div>
              <div className="md:col-span-2"><label className="block text-zinc-400 text-sm mb-1">Summary</label><textarea value={form.summary} onChange={e => setForm({...form, summary: e.target.value})} className="input-field" rows={2}/></div>
              <div className="md:col-span-2"><label className="block text-zinc-400 text-sm mb-1">Description</label><textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="input-field" rows={3}/></div>
              <div><label className="block text-zinc-400 text-sm mb-1">GitHub URL</label><input value={form.github_url} onChange={e => setForm({...form, github_url: e.target.value})} className="input-field" /></div>
              <div><label className="block text-zinc-400 text-sm mb-1">Demo URL</label><input value={form.demo_url} onChange={e => setForm({...form, demo_url: e.target.value})} className="input-field" /></div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary mt-2">{loading ? 'Saving...' : 'Save'}</button>
          </form>
        )}

        <div className="glass-card overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-zinc-800/50 border-b border-zinc-700"><tr><th className="p-4 text-zinc-400 text-sm font-semibold">Title</th><th className="p-4 text-zinc-400 text-sm font-semibold">Category</th><th className="p-4 text-right">Actions</th></tr></thead>
            <tbody className="divide-y divide-zinc-700/50">
              {projs.map(p => (
                <tr key={p.id} className="hover:bg-zinc-800/30">
                  <td className="p-4"><p className="text-white text-sm font-medium">{p.title}</p></td>
                  <td className="p-4"><span className="tag">{p.category}</span></td>
                  <td className="p-4 text-right">
                    <button onClick={() => { setForm(p); setEditing(p.id); setShowForm(true) }} className="p-1.5 text-zinc-400 hover:text-cyan-400 mr-2"><FiEdit2 /></button>
                    <button onClick={() => handleDelete(p.id)} className="p-1.5 text-zinc-400 hover:text-red-400"><FiTrash2 /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
