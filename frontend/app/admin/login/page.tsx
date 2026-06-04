'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FiLock, FiUser, FiEye, FiEyeOff } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { adminLogin } from '@/lib/api'

export default function AdminLoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ username: '', password: '' })
  const [showPwd, setShowPwd] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.username || !form.password) { toast.error('Enter credentials'); return }
    setLoading(true)
    try {
      await adminLogin(form.username, form.password)
      toast.success('Welcome back, Rushikesh! ')
      router.push('/admin/dashboard')
    } catch {
      toast.error('Invalid username or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-900 grid-bg flex items-center justify-center px-4">
      {/* Orbs */}
      <div className="orb orb-cyan w-[400px] h-[400px] -top-20 -left-20" />
      <div className="orb orb-violet w-[300px] h-[300px] bottom-0 right-0" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center text-white font-black text-2xl mx-auto mb-4 shadow-xl shadow-cyan-500/20">
            RD
          </div>
          <h1 className="text-2xl font-black text-white mb-1">Admin Dashboard</h1>
          <p className="text-zinc-500 text-sm">Portfolio management system</p>
        </div>

        {/* Card */}
        <div className="glass-card p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-zinc-400 text-sm mb-1.5 block">Username</label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                <input
                  value={form.username}
                  onChange={e => setForm({ ...form, username: e.target.value })}
                  placeholder="admin"
                  className="input-field pl-10"
                  autoComplete="username"
                />
              </div>
            </div>
            <div>
              <label className="text-zinc-400 text-sm mb-1.5 block">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="input-field pl-10 pr-10"
                  autoComplete="current-password"
                />
                <button type="button" onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors">
                  {showPwd ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center mt-2 disabled:opacity-50">
              {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <FiLock size={15} />}
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-zinc-700 text-center">
            <p className="text-zinc-600 text-xs">Default: admin / admin123 — change after first login</p>
          </div>
        </div>
      </div>
    </div>
  )
}
