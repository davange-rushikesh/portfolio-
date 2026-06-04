'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FiCheck, FiTrash2, FiMail } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { getMessages, markMsgRead, deleteMsg, isAdminLoggedIn } from '@/lib/api'

export default function AdminMessagesPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<any[]>([])

  useEffect(() => {
    if (!isAdminLoggedIn()) { router.push('/admin/login'); return }
    load()
  }, [router])

  const load = () => getMessages().then(setMessages).catch(() => {})

  const handleMarkRead = async (id: number) => {
    try { await markMsgRead(id); load() }
    catch { toast.error('Failed to mark read') }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this message?')) return
    try { await deleteMsg(id); toast.success('Deleted'); load() }
    catch { toast.error('Failed to delete') }
  }

  return (
    <div className="min-h-screen bg-dark-900 pt-6 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-white">Contact Messages</h1>
          <p className="text-zinc-400 text-sm">You have {messages.filter(m => !m.is_read).length} unread messages</p>
        </div>

        <div className="space-y-4">
          {messages.map(m => (
            <div key={m.id} className={`glass-card p-6 ${!m.is_read ? 'border-l-4 border-cyan-500 bg-cyan-500/5' : ''}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-bold text-lg leading-none">{m.name}</h3>
                    {!m.is_read && <span className="w-2 h-2 rounded-full bg-cyan-500"></span>}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <a href={`mailto:${m.email}`} className="flex items-center gap-1 text-zinc-400 hover:text-cyan-400">
                      <FiMail /> {m.email}
                    </a>
                    <span className="text-zinc-500">&bull;</span>
                    <span className="text-zinc-500">{new Date(m.created_at).toLocaleString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {!m.is_read && (
                    <button onClick={() => handleMarkRead(m.id)} className="btn-ghost text-xs px-3 py-1.5" title="Mark as read">
                      <FiCheck size={14} /> Mark Read
                    </button>
                  )}
                  <button onClick={() => handleDelete(m.id)} className="btn-ghost text-xs px-3 py-1.5 hover:text-red-400 hover:border-red-400" title="Delete">
                    <FiTrash2 size={14} />
                  </button>
                </div>
              </div>
              
              {m.subject && <h4 className="text-white font-medium mb-2">{m.subject}</h4>}
              <div className="bg-zinc-800/40 rounded-xl p-4 text-zinc-300 text-sm whitespace-pre-wrap leading-relaxed border border-zinc-700/50">
                {m.message}
              </div>
            </div>
          ))}

          {messages.length === 0 && (
            <div className="glass-card p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-500 mx-auto mb-4">
                <FiMail size={24} />
              </div>
              <h3 className="text-white font-medium mb-1">No messages yet</h3>
              <p className="text-zinc-500 text-sm">When someone contacts you via the contact form, it will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
