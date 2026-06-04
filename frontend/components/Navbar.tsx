'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiMenu, FiX, FiDownload } from 'react-icons/fi'
import { SiGithub } from 'react-icons/si'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/skills', label: 'Skills' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/ai-projects', label: 'AI/LLM' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-zinc-900/95 backdrop-blur-lg border-b border-cyan-500/10 shadow-xl' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:shadow-cyan-500/30 transition-shadow">
              RD
            </div>
            <span className="font-bold text-white hidden sm:block">
              Rushikesh<span className="text-cyan-400"> Davange</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === href
                    ? 'text-white bg-cyan-500/20 border border-cyan-500/30'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://github.com/davange-rushikesh"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-zinc-400 hover:text-white transition-colors"
            >
              <SiGithub size={20} />
            </a>
            <Link href="/resume" className="btn-primary text-sm px-4 py-2">
              <FiDownload size={14} /> Resume
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-zinc-400 hover:text-white transition-colors"
          >
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-zinc-900/98 backdrop-blur-xl border-b border-zinc-700 px-4 py-4 space-y-1">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                pathname === href
                  ? 'text-white bg-cyan-500/20'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {label}
            </Link>
          ))}
          <div className="pt-3 border-t border-zinc-700">
            <Link href="/resume" onClick={() => setOpen(false)} className="btn-primary w-full justify-center text-sm">
              <FiDownload size={14} /> Download Resume
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
