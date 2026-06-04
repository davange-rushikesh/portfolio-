'use client'
import { useState } from 'react'
import { FiMail, FiPhone, FiMapPin, FiSend, FiLinkedin, FiGithub, FiDatabase } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { submitContact } from '@/lib/api'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields')
      return
    }
    setLoading(true)
    try {
      await submitContact(form)
      toast.success('Message sent! I\'ll get back to you soon. ')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      toast.error('Failed to send message. Try emailing me directly.')
    } finally {
      setLoading(false)
    }
  }

  const contacts = [
    { icon: FiMail, label: 'Email', value: 'rushikeshdavange9@gmail.com', href: 'mailto:rushikeshdavange9@gmail.com' },
    { icon: FiPhone, label: 'Phone', value: '+91 9423880393', href: 'tel:+919423880393' },
    { icon: FiMapPin, label: 'Location', value: 'Aurangabad, Maharashtra, India', href: null },
  ]

  const socials = [
    { icon: FiGithub, label: 'GitHub', href: 'https://github.com/davange-rushikesh', color: 'hover:text-white' },
    { icon: FiLinkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/rushikeshdavange/', color: 'hover:text-blue-400' },
    { icon: FiDatabase, label: 'Kaggle', href: 'https://www.kaggle.com/rushidavange', color: 'hover:text-cyan-400' },
  ]

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="relative py-20 px-4 text-center border-b border-zinc-800 bg-gradient-to-b from-violet-900/10 to-transparent overflow-hidden">
        <div className="orb orb-violet w-[300px] h-[300px] top-0 right-0 opacity-10" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="tag mb-4 inline-block"> Get In Touch</span>
          <h1 className="text-5xl font-black text-white mb-4">
            Let's <span className="gradient-text">Connect</span>
          </h1>
          <p className="text-zinc-400 text-xl">
            Open to Data Science, ML, and AI roles. Let's build something great together.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Left side */}
          <div>
            <div className="glass-card p-6 mb-6 border border-violet-500/20 bg-violet-500/5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-violet-400 animate-pulse" />
                <span className="text-violet-400 font-bold">Available for Opportunities</span>
              </div>
              <p className="text-zinc-400 text-sm">
                Actively seeking Data Analyst, ML Engineer, and Full Stack Data Science roles. 
                Open to full-time, internship, and remote positions.
              </p>
            </div>

            <h2 className="text-white font-bold text-2xl mb-6">Contact Info</h2>
            <div className="space-y-4 mb-8">
              {contacts.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="glass-card p-4 flex items-center gap-4 hover:border-cyan-500/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 flex-shrink-0">
                    <Icon size={18} />
                  </div>
                  <div>
                    <div className="text-zinc-500 text-xs uppercase tracking-wider mb-0.5">{label}</div>
                    {href ? (
                      <a href={href} className="text-white font-medium hover:text-cyan-400 transition-colors">{value}</a>
                    ) : (
                      <span className="text-white font-medium">{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-white font-bold text-xl mb-4">Find Me Online</h2>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, label, href, color }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-4 py-2.5 glass-card rounded-xl text-zinc-400 ${color} transition-all text-sm font-medium hover:border-cyan-500/30`}>
                  <Icon size={16} /> {label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="glass-card p-8">
            <h2 className="text-white font-bold text-2xl mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-zinc-400 text-sm mb-1.5 block">Name <span className="text-red-400">*</span></label>
                  <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name" className="input-field" required />
                </div>
                <div>
                  <label className="text-zinc-400 text-sm mb-1.5 block">Email <span className="text-red-400">*</span></label>
                  <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com" className="input-field" required />
                </div>
              </div>
              <div>
                <label className="text-zinc-400 text-sm mb-1.5 block">Subject</label>
                <input value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                  placeholder="Hiring for Data Science role..." className="input-field" />
              </div>
              <div>
                <label className="text-zinc-400 text-sm mb-1.5 block">Message <span className="text-red-400">*</span></label>
                <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about the opportunity or just say hi!" rows={5}
                  className="input-field resize-none" required />
              </div>
              <button type="submit" disabled={loading}
                className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : <FiSend size={16} />}
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
