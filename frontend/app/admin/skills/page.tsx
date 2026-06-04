'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi'
import toast from 'react-hot-toast'
import api, { isAdminLoggedIn } from '@/lib/api'

const EMPTY = { name: '', category: 'Data & ML', level: 80, icon: '', sort_order: 0 }
const CATEGORIES = ['Programming', 'Data & ML', 'Visualization', 'Tools & Deployment', 'Statistics', 'Cloud', 'Other']

export default function AdminSkillsPage() {
  const router = useRouter()
  const [skills, setSkills] = useState<any[]>([])
  const [form, setForm] = useState<any>(EMPTY)
  const [editing, setEditing] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isAdminLoggedIn()) { router.push('/admin/login'); return }
    load()
  }, [router])

  const load = () => {
    api.get('/api/skills').then(res => {
      if (Array.isArray(res.data)) {
        setSkills(res.data)
      } else {
        // if API returns grouped, flatten them for table or update API to just return array
        const raw = Object.values(res.data).flat()
        setSkills(raw)
      }
    }).catch(() => {})
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name) return toast.error('Name is required')
    setLoading(true)
    try {
      if (editing) {
        await api.put(`/api/admin/skills/${editing}`, form)
        toast.success('Skill updated')
      } else {
        await api.post('/api/admin/skills', form)
        toast.success('Skill added')
      }
      setForm(EMPTY); setEditing(null); setShowForm(false); load()
    } catch (err: any) {
      toast.error('Failed to save skill')
    } finally { setLoading(false) }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this skill?')) return
    try { await api.delete(`/api/admin/skills/${id}`); toast.success('Deleted'); load() }
    catch { toast.error('Failed to delete') }
  }

  return (
    <div className="min-h-screen bg-dark-900 pt-6 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-white">Manage Skills</h1>
            <p className="text-zinc-400 text-sm">{skills.length} skills total</p>
          </div>
          <button onClick={() => { setForm(EMPTY); setEditing(null); setShowForm(!showForm) }}
            className="btn-primary">
            <FiPlus /> {showForm ? 'Cancel' : 'Add Skill'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="glass-card p-6 mb-8 space-y-4">
            <h2 className="text-white font-bold text-xl mb-2">{editing ? 'Edit Skill' : 'New Skill'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-zinc-400 text-sm mb-1">Name</label>
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="input-field" required />
              </div>
              <div>
                <label className="block text-zinc-400 text-sm mb-1">Category</label>
                <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="input-field">
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-zinc-400 text-sm mb-1">Level (0-100)</label>
                <input type="number" min="0" max="100" value={form.level} onChange={e => setForm({...form, level: +e.target.value})} className="input-field" />
              </div>
              <div>
                <label className="block text-zinc-400 text-sm mb-1">Icon (Emoji or URL)</label>
                <input value={form.icon} onChange={e => setForm({...form, icon: e.target.value})} className="input-field" />
              </div>
              <div>
                <label className="block text-zinc-400 text-sm mb-1">Sort Order</label>
                <input type="number" value={form.sort_order} onChange={e => setForm({...form, sort_order: +e.target.value})} className="input-field" />
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Saving...' : 'Save Skill'}
            </button>
          </form>
        )}

        <div className="glass-card overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-zinc-800/50 border-b border-zinc-700">
              <tr>
                <th className="p-4 text-zinc-400 text-sm font-semibold">Name/Icon</th>
                <th className="p-4 text-zinc-400 text-sm font-semibold">Category</th>
                <th className="p-4 text-zinc-400 text-sm font-semibold">Level</th>
                <th className="p-4 text-zinc-400 text-sm font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-700/50">
              {skills.map(s => (
                <tr key={s.id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="p-4">
                    <span className="text-white font-medium">{s.icon && `${s.icon} `}{s.name}</span>
                  </td>
                  <td className="p-4"><span className="tag">{s.category}</span></td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-zinc-700 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-500" style={{ width: `${s.level}%` }} />
                      </div>
                      <span className="text-xs text-zinc-400 font-mono">{s.level}%</span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => { setForm(s); setEditing(s.id); setShowForm(true) }} className="p-1.5 text-zinc-400 hover:text-cyan-400">
                      <FiEdit2 />
                    </button>
                    <button onClick={() => handleDelete(s.id)} className="p-1.5 text-zinc-400 hover:text-red-400 ml-2">
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
              {skills.length === 0 && <tr><td colSpan={4} className="p-4 text-center text-zinc-500">No skills added yet</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
