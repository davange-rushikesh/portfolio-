'use client';

import { SectionKey } from '../../types/admin';

type SidebarProps = {
  active: SectionKey;
  onSelect: (value: SectionKey) => void;
};

const items: { key: SectionKey; label: string; icon: string }[] = [
  { key: 'profile', label: 'Profile', icon: '👤' },
  { key: 'skills', label: 'Skills', icon: '⚡' },
  { key: 'projects', label: 'Projects', icon: '🚀' },
  { key: 'certifications', label: 'Certifications', icon: '🏆' },
  { key: 'education', label: 'Education', icon: '🎓' },
  { key: 'socials', label: 'Socials', icon: '🔗' },
  { key: 'theme', label: 'Theme Settings', icon: '🎛️' }
];

export function Sidebar({ active, onSelect }: SidebarProps) {
  return (
    <aside className="sticky top-6 hidden min-h-[calc(100vh-4rem)] w-full max-w-xs space-y-4 rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-soft backdrop-blur-xl lg:block">
      <div className="space-y-3 rounded-[1.75rem] bg-slate-900/70 p-4 text-sm text-slate-300 shadow-inner">
        <p className="text-xs uppercase tracking-[0.32em] text-cyan-300/80">Admin Panel</p>
        <h2 className="text-xl font-semibold text-white">Dashboard Navigation</h2>
        <p className="text-sm leading-6 text-slate-400">Edit profile data, skills, projects, and social links instantly.</p>
      </div>
      <nav className="space-y-2">
        {items.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => onSelect(item.key)}
            className={`flex w-full items-center gap-3 rounded-3xl px-4 py-3 text-left text-sm transition ${
              active === item.key
                ? 'bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-300/20'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-400">
        <p className="font-semibold text-slate-200">Quick tips</p>
        <ul className="mt-3 space-y-2 list-disc pl-5 text-slate-500">
          <li>Data persists after refresh.</li>
          <li>Search projects by title.</li>
          <li>Preview image links instantly.</li>
        </ul>
      </div>
    </aside>
  );
}
