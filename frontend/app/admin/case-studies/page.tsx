'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi'
import toast from 'react-hot-toast'
import api, { isAdminLoggedIn } from '@/lib/api'

const EMPTY = { title: '', slug: '', client_industry: '', problem: '', approach: '', insights: '', impact: '', tools_used: '', image_url: '', is_featured: false, sort_order: 0 }

export default function AdminCaseStudies() {
  const router = useRouter()
  const [cases, setCases] = useState<any[]>([])
  const [form, setForm] = useState<any>(EMPTY)
  const [editing, setEditing] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isAdminLoggedIn()) { router.push('/admin/login'); return }
    load()
  }, [router])

  const load = () => api.get('/api/case-studies').then(res => setCases(res.data)).catch(() => {})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title) return toast.error('Title is required')
    setLoading(true)
    try {
      if (editing) await api.put(`/api/admin/case-studies/${editing}`, form)
      else await api.post('/api/admin/case-studies', form)
      toast.success(editing ? 'Updated' : 'Created')
      setForm(EMPTY); setEditing(null); setShowForm(false); load()
    } catch { toast.error('Failed to save') }
    finally { setLoading(false) }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this case study?')) return
    try { await api.delete(`/api/admin/case-studies/${id}`); toast.success('Deleted'); load() }
    catch { toast.error('Failed to delete') }
  }

  return (
    <div className="min-h-screen bg-dark-900 pt-6 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-black text-white">Manage Case Studies</h1>
          <button onClick={() => { setForm(EMPTY); setEditing(null); setShowForm(!showForm) }} className="btn-primary">
            <FiPlus /> {showForm ? 'Cancel' : 'Add Case Study'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="glass-card p-6 mb-8 space-y-4">
            <h2 className="text-white font-bold text-xl mb-4">{editing ? 'Edit Case Study' : 'New Case Study'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-zinc-400 text-sm mb-1">Title</label><input value={form.title} onChange={e => setForm({...form, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^\w\s]/g,'').replace(/\s+/g,'-')})} className="input-field" required /></div>
              <div><label className="block text-zinc-400 text-sm mb-1">Slug</label><input value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} className="input-field font-mono" required /></div>
              <div><label className="block text-zinc-400 text-sm mb-1">Client/Industry</label><input value={form.client_industry} onChange={e => setForm({...form, client_industry: e.target.value})} className="input-field" /></div>
              <div><label className="block text-zinc-400 text-sm mb-1">Tools Used (comma separated)</label><input value={form.tools_used} onChange={e => setForm({...form, tools_used: e.target.value})} className="input-field" /></div>
              <div className="md:col-span-2"><label className="block text-zinc-400 text-sm mb-1">Image URL</label><input value={form.image_url} onChange={e => setForm({...form, image_url: e.target.value})} className="input-field" /></div>
              <div className="md:col-span-2"><label className="block text-zinc-400 text-sm mb-1">The Problem</label><textarea value={form.problem} onChange={e => setForm({...form, problem: e.target.value})} className="input-field" rows={2}/></div>
              <div className="md:col-span-2"><label className="block text-zinc-400 text-sm mb-1">The Approach</label><textarea value={form.approach} onChange={e => setForm({...form, approach: e.target.value})} className="input-field" rows={2}/></div>
              <div className="md:col-span-2"><label className="block text-zinc-400 text-sm mb-1">Key Insights</label><textarea value={form.insights} onChange={e => setForm({...form, insights: e.target.value})} className="input-field" rows={2}/></div>
              <div className="md:col-span-2"><label className="block text-zinc-400 text-sm mb-1">Business Impact</label><textarea value={form.impact} onChange={e => setForm({...form, impact: e.target.value})} className="input-field" rows={2}/></div>
              <div className="flex items-center gap-2"><input type="checkbox" id="fcv" checked={form.is_featured} onChange={e => setForm({...form, is_featured: e.target.checked})} className="accent-cyan-500 w-4 h-4"/><label htmlFor="fcv" className="text-white text-sm">Featured</label></div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary mt-2">{loading ? 'Saving...' : 'Save'}</button>
          </form>
        )}

        <div className="glass-card overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-zinc-800/50 border-b border-zinc-700"><tr><th className="p-4 text-zinc-400 text-sm font-semibold">Title</th><th className="p-4 text-zinc-400 text-sm font-semibold">Industry</th><th className="p-4 text-right">Actions</th></tr></thead>
            <tbody className="divide-y divide-zinc-700/50">
              {cases.map(c => (
                <tr key={c.id} className="hover:bg-zinc-800/30">
                  <td className="p-4"><p className="text-white text-sm font-medium">{c.title}</p></td>
                  <td className="p-4"><span className="tag">{c.client_industry}</span></td>
                  <td className="p-4 text-right">
                    <button onClick={() => { setForm(c); setEditing(c.id); setShowForm(true) }} className="p-1.5 text-zinc-400 hover:text-cyan-400 mr-2"><FiEdit2 /></button>
                    <button onClick={() => handleDelete(c.id)} className="p-1.5 text-zinc-400 hover:text-red-400"><FiTrash2 /></button>
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
