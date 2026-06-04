import Link from 'next/link'
import { FiMail, FiHeart, FiGithub, FiLinkedin, FiDatabase } from 'react-icons/fi'

const quickLinks = [
  { href: '/projects', label: 'Projects' },
  { href: '/skills', label: 'Skills' },
  { href: '/blog', label: 'Blog' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/ai-projects', label: 'AI/LLM' },
  { href: '/resume', label: 'Resume' },
  { href: '/contact', label: 'Contact' },
]

const socials = [
  { icon: FiGithub, href: 'https://github.com/davange-rushikesh', label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://www.linkedin.com/in/rushikeshdavange/', label: 'LinkedIn' },
  { icon: FiDatabase, href: 'https://www.kaggle.com/rushidavange', label: 'Kaggle' },
  { icon: FiMail, href: 'mailto:rushikeshdavange9@gmail.com', label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-900/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm">
                RD
              </div>
              <span className="font-bold text-white">Rushikesh Davange</span>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Data Analyst · ML Engineer · Full Stack Data Scientist.<br />
              Turning raw data into impactful products.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-cyan-500/20 hover:border-cyan-500/30 border border-transparent transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-zinc-400 hover:text-cyan-400 text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Open to Work */}
          <div>
            <h3 className="text-white font-semibold mb-4">Open to Work</h3>
            <div className="glass-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                <span className="text-violet-400 text-sm font-semibold">Available for roles</span>
              </div>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Actively looking for Data Analyst, ML Engineer & Data Science roles. Open to full-time, internship, and remote opportunities.
              </p>
              <Link href="/contact" className="btn-primary mt-4 text-xs px-4 py-2">
                Hire Me
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} Rushikesh Davange. All rights reserved.
          </p>
          <p className="text-zinc-500 text-sm flex items-center gap-1">
            Built with <FiHeart className="text-red-400" size={12} /> using Next.js + FastAPI
          </p>
        </div>
      </div>
    </footer>
  )
}
