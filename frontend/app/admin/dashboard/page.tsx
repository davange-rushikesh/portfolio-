'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FiGrid, FiFolder, FiBook, FiMail, FiUser, FiCpu, FiLogOut, FiMessageSquare } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { getStats, adminLogout, isAdminLoggedIn } from '@/lib/api'

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    if (!isAdminLoggedIn()) { router.push('/admin/login'); return }
    getStats().then(setStats).catch(() => router.push('/admin/login'))
  }, [router])

  const handleLogout = () => {
    adminLogout()
    toast.success('Logged out')
    router.push('/admin/login')
  }

  const cards = [
    { label: 'Total Projects', value: stats?.total_projects ?? '–', icon: FiFolder, color: 'from-cyan-500 to-cyan-700', href: '/admin/projects' },
    { label: 'Total Skills', value: stats?.total_skills ?? '–', icon: FiGrid, color: 'from-blue-500 to-blue-700', href: '/admin/skills' },
    { label: 'Blog Posts', value: stats?.total_blogs ?? '–', icon: FiBook, color: 'from-blue-500 to-blue-700', href: '/admin/blogs' },
    { label: 'Case Studies', value: stats?.total_case_studies ?? '–', icon: FiGrid, color: 'from-violet-500 to-violet-700', href: '/admin/case-studies' },
    { label: 'AI Projects', value: stats?.total_ai_projects ?? '–', icon: FiCpu, color: 'from-cyan-500 to-cyan-700', href: '/admin/ai-projects' },
    { label: 'Unread Messages', value: stats?.unread_messages ?? '–', icon: FiMessageSquare, color: 'from-cyan-500 to-cyan-700', href: '/admin/messages' },
  ]

  const quickLinks = [
    { label: 'Manage Projects', href: '/admin/projects', icon: FiFolder },
    { label: 'Manage Skills', href: '/admin/skills', icon: FiGrid },
    { label: 'Manage Blogs', href: '/admin/blogs', icon: FiBook },
    { label: 'Edit Profile', href: '/admin/profile', icon: FiUser },
    { label: 'View Messages', href: '/admin/messages', icon: FiMail },
  ]

  return (
    <div className="min-h-screen bg-dark-900 pt-6 pb-16">
      {/* Top bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-white">Admin Dashboard</h1>
          <p className="text-zinc-400 text-sm mt-1">Manage your portfolio content</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" target="_blank" className="btn-ghost text-sm px-4 py-2">
            View Site
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-xl text-zinc-400 hover:text-red-400 hover:bg-red-500/10 border border-zinc-700 hover:border-red-500/30 transition-all text-sm font-medium">
            <FiLogOut size={14} /> Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {cards.map(({ label, value, icon: Icon, color, href }) => (
            <Link key={label} href={href} className="glass-card-hover p-5 text-center group">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                <Icon className="text-white" size={18} />
              </div>
              <div className="text-3xl font-black text-white mb-1">{value}</div>
              <div className="text-zinc-500 text-xs">{label}</div>
            </Link>
          ))}
        </div>

        {/* Quick actions */}
        <div className="glass-card p-6">
          <h2 className="text-white font-bold text-xl mb-5">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {quickLinks.map(({ label, href, icon: Icon }) => (
              <Link key={label} href={href}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-zinc-800/50 border border-zinc-700 hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all text-center group">
                <Icon className="text-cyan-400 group-hover:text-cyan-300" size={22} />
                <span className="text-zinc-400 text-xs font-medium group-hover:text-white transition-colors">{label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="glass-card p-6 bg-cyan-500/5 border-cyan-500/20">
          <h2 className="text-white font-bold mb-3"> Admin Tips</h2>
          <ul className="space-y-2 text-zinc-400 text-sm">
            <li>• Add new projects from <Link href="/admin/projects" className="text-cyan-400 hover:underline">Manage Projects</Link></li>
            <li>• Update your profile info from <Link href="/admin/profile" className="text-cyan-400 hover:underline">Edit Profile</Link></li>
            <li>• Write new blog posts from <Link href="/admin/blogs" className="text-cyan-400 hover:underline">Manage Blogs</Link></li>
            <li>• Change your admin password from <Link href="/admin/settings" className="text-cyan-400 hover:underline">Settings</Link></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
