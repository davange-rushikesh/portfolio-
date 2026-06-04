'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import api, { isAdminLoggedIn, getProfile } from '@/lib/api'

export default function AdminProfile() {
  const router = useRouter()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isAdminLoggedIn()) { router.push('/admin/login'); return }
    getProfile().then(p => {
      // transform socials into string for simple editing
      const d = { ...p }
      if (p.social_links) {
         p.social_links.forEach((link: any) => {
             if (link.platform === 'github') d.github = link.url
             if (link.platform === 'linkedin') d.linkedin = link.url
         })
      }
      setProfile(d)
    })
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.put('/api/admin/profile', {
          full_name: profile.full_name,
          title: profile.title,
          bio: profile.bio,
          resume_url: profile.resume_url,
          email: profile.email
      })
      toast.success('Profile Settings Saved! (Homepage & Contact logic will sync dynamically if integrated)')
    } catch {
      toast.error('Failed to update')
    } finally { setLoading(false) }
  }

  if (!profile) return null

  return (
    <div className="min-h-screen bg-dark-900 pt-6 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-black text-white mb-8">Homepage & Profile Setup</h1>

        <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
               <label className="block text-zinc-400 text-sm mb-1">Full Name</label>
               <input value={profile.full_name || ''} onChange={e => setProfile({...profile, full_name: e.target.value})} className="input-field" />
            </div>
            <div>
               <label className="block text-zinc-400 text-sm mb-1">Title / Tagline</label>
               <input value={profile.title || ''} onChange={e => setProfile({...profile, title: e.target.value})} className="input-field" />
            </div>
            <div className="md:col-span-2">
               <label className="block text-zinc-400 text-sm mb-1">Bio (About Section)</label>
               <textarea value={profile.bio || ''} onChange={e => setProfile({...profile, bio: e.target.value})} className="input-field" rows={5} />
            </div>
            <div>
               <label className="block text-zinc-400 text-sm mb-1">Public Email</label>
               <input value={profile.email || ''} onChange={e => setProfile({...profile, email: e.target.value})} className="input-field" />
            </div>
            <div>
               <label className="block text-zinc-400 text-sm mb-1">Resume File URL (PDF)</label>
               <input value={profile.resume_url || ''} onChange={e => setProfile({...profile, resume_url: e.target.value})} className="input-field" placeholder="/static/resume.pdf" />
            </div>
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
            {loading ? 'Saving...' : 'Update Settings'}
          </button>
        </form>
      </div>
    </div>
  )
}
