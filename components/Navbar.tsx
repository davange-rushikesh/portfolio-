'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' }
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
        <Link href="#" className="text-lg font-semibold uppercase tracking-[0.28em] text-white">
          Rushikesh Davange
        </Link>

        <nav className="hidden items-center gap-4 lg:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-slate-300 transition hover:text-white">
              {link.label}
            </a>
          ))}
          <ThemeToggle />
          <Link href="/admin/login" className="text-sm text-cyan-300 transition hover:text-cyan-200">
            Admin
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:border-cyan-300/40 hover:bg-slate-900/80 lg:hidden"
          aria-label="Toggle menu"
        >
          <span className="relative h-5 w-5">
            <span className={`absolute left-0 top-1/2 h-0.5 w-full bg-white transition ${open ? 'rotate-45' : '-translate-y-1.5'}`} />
            <span className={`absolute left-0 top-1/2 h-0.5 w-full bg-white transition ${open ? 'opacity-0' : ''}`} />
            <span className={`absolute left-0 top-1/2 h-0.5 w-full bg-white transition ${open ? '-rotate-45' : 'translate-y-1.5'}`} />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden border-t border-white/10 bg-slate-950/95 lg:hidden"
          >
            <div className="space-y-1 px-6 py-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-300/20 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <Link
                href="/admin/login"
                onClick={() => setOpen(false)}
                className="block rounded-3xl border border-cyan-300/20 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-300 transition hover:bg-cyan-500/20"
              >
                Admin
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
