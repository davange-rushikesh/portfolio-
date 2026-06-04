'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FiPlus, FiEdit2, FiTrash2, FiStar, FiGithub } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { getProjects, createProject, updateProject, deleteProject, isAdminLoggedIn } from '@/lib/api'

const EMPTY = { title:'', slug:'', summary:'', description:'', problem_statement:'', approach:'', outcome:'', image_url:'', github_url:'', demo_url:'', category:'Machine Learning', stack:'', is_featured:false, sort_order:0 }

export default function AdminProjectsPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<any[]>([])
  const [form, setForm] = useState<any>(EMPTY)
  const [editing, setEditing] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isAdminLoggedIn()) { router.push('/admin/login'); return }
    load()
  }, [])

  const load = () => getProjects().then(setProjects).catch(() => {})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title || !form.slug) { toast.error('Title and slug are required'); return }
    setLoading(true)
    try {
      if (editing) { await updateProject(editing, form); toast.success('Project updated!') }
      else { await createProject(form); toast.success('Project created!') }
      setForm(EMPTY); setEditing(null); setShowForm(false); load()
    } catch (err: any) {
      toast.error(err?.response?.data?.detail || 'Failed to save project')
    } finally { setLoading(false) }
  }

  const handleEdit = (p: any) => { setForm(p); setEditing(p.id); setShowForm(true); window.scrollTo(0, 0) }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this project?')) return
    try { await deleteProject(id); toast.success('Deleted'); load() }
    catch { toast.error('Failed to delete') }
  }

  const generateSlug = (title: string) => title.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-')

  const CATEGORIES = ['Machine Learning', 'Data Analysis', 'NLP / ML', 'Full Stack', 'AI / LLM', 'Other']

  return (
    <div className="min-h-screen bg-dark-900 pt-6 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-white">Manage Projects</h1>
            <p className="text-zinc-400 text-sm">{projects.length} projects total</p>
          </div>
          <button onClick={() => { setForm(EMPTY); setEditing(null); setShowForm(!showForm) }}
            className="btn-primary">
            <FiPlus /> {showForm ? 'Cancel' : 'Add Project'}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="glass-card p-6 mb-8 space-y-4">
            <h2 className="text-white font-bold text-xl mb-2">{editing ? 'Edit Project' : 'New Project'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-zinc-400 text-sm mb-1 block">Title *</label>
                <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value, slug: generateSlug(e.target.value) })}
                  className="input-field" placeholder="My Project" required />
              </div>
              <div>
                <label className="text-zinc-400 text-sm mb-1 block">Slug *</label>
                <input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })}
                  className="input-field font-mono" placeholder="my-project" required />
              </div>
              <div>
                <label className="text-zinc-400 text-sm mb-1 block">Category</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                  className="input-field">
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-zinc-400 text-sm mb-1 block">Tech Stack (comma separated)</label>
                <input value={form.stack} onChange={e => setForm({ ...form, stack: e.target.value })}
                  className="input-field font-mono" placeholder="Python,Pandas,Scikit-learn" />
              </div>
              <div>
                <label className="text-zinc-400 text-sm mb-1 block">GitHub URL</label>
                <input value={form.github_url} onChange={e => setForm({ ...form, github_url: e.target.value })}
                  className="input-field" placeholder="https://github.com/..." />
              </div>
              <div>
                <label className="text-zinc-400 text-sm mb-1 block">Demo URL</label>
                <input value={form.demo_url} onChange={e => setForm({ ...form, demo_url: e.target.value })}
                  className="input-field" placeholder="https://..." />
              </div>
              <div className="md:col-span-2">
                <label className="text-zinc-400 text-sm mb-1 block">Thumbnail Image URL</label>
                <input value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })}
                  className="input-field" placeholder="https://images.unsplash.com/..." />
              </div>
              <div className="md:col-span-2">
                <label className="text-zinc-400 text-sm mb-1 block">Summary</label>
                <textarea value={form.summary} onChange={e => setForm({ ...form, summary: e.target.value })}
                  rows={2} className="input-field resize-none" placeholder="One-line description for cards..." />
              </div>
              <div className="md:col-span-2">
                <label className="text-zinc-400 text-sm mb-1 block">Problem Statement</label>
                <textarea value={form.problem_statement} onChange={e => setForm({ ...form, problem_statement: e.target.value })}
                  rows={3} className="input-field resize-none" />
              </div>
              <div className="md:col-span-2">
                <label className="text-zinc-400 text-sm mb-1 block">Approach</label>
                <textarea value={form.approach} onChange={e => setForm({ ...form, approach: e.target.value })}
                  rows={3} className="input-field resize-none" />
              </div>
              <div className="md:col-span-2">
                <label className="text-zinc-400 text-sm mb-1 block">Outcome / Impact</label>
                <textarea value={form.outcome} onChange={e => setForm({ ...form, outcome: e.target.value })}
                  rows={3} className="input-field resize-none" />
              </div>
              <div>
                <label className="text-zinc-400 text-sm mb-1 block">Sort Order</label>
                <input type="number" value={form.sort_order} onChange={e => setForm({ ...form, sort_order: +e.target.value })}
                  className="input-field" />
              </div>
              <div className="flex items-center gap-3 mt-6">
                <input type="checkbox" id="featured" checked={form.is_featured}
                  onChange={e => setForm({ ...form, is_featured: e.target.checked })}
                  className="w-4 h-4 accent-cyan-500" />
                <label htmlFor="featured" className="text-zinc-300 text-sm">Mark as Featured</label>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary disabled:opacity-50">
              {loading ? 'Saving...' : (editing ? 'Update Project' : 'Create Project')}
            </button>
          </form>
        )}

        {/* Projects Table */}
        <div className="glass-card overflow-hidden">
          <table className="w-full">
            <thead className="bg-zinc-800/50 border-b border-zinc-700">
              <tr>
                <th className="text-left px-4 py-3 text-zinc-400 text-sm font-semibold">Project</th>
                <th className="text-left px-4 py-3 text-zinc-400 text-sm font-semibold hidden md:table-cell">Category</th>
                <th className="text-left px-4 py-3 text-zinc-400 text-sm font-semibold hidden lg:table-cell">Stack</th>
                <th className="text-center px-4 py-3 text-zinc-400 text-sm font-semibold hidden sm:table-cell">Featured</th>
                <th className="text-right px-4 py-3 text-zinc-400 text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-700/50">
              {projects.map(p => (
                <tr key={p.id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="text-white font-medium text-sm">{p.title}</div>
                    <div className="text-zinc-500 text-xs font-mono">{p.slug}</div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="tag text-xs">{p.category}</span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-zinc-500 text-xs font-mono truncate max-w-xs">
                    {p.stack}
                  </td>
                  <td className="px-4 py-3 text-center hidden sm:table-cell">
                    {p.is_featured ? <FiStar className="text-yellow-400 mx-auto" size={16} /> : <span className="text-zinc-700">—</span>}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleEdit(p)} className="p-1.5 rounded-lg text-zinc-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors">
                        <FiEdit2 size={14} />
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr><td colSpan={5} className="text-center py-10 text-zinc-500">No projects yet. Add your first project!</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
