'use client';

import { motion } from 'framer-motion';
import { useTheme } from '../../components/ThemeProvider';

export function ThemeSettings() {
  const { theme, setTheme } = useTheme();

  return (
    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div className="rounded-[2rem] border border-white/5 bg-gradient-to-b from-slate-900/80 to-slate-950/80 p-8 shadow-soft backdrop-blur-xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Theme Settings</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Select a premium experience for the live portfolio and save it globally.
            </p>
          </div>
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
            <span className="h-3.5 w-3.5 rounded-full bg-green-400 shadow-[0_0_16px_rgba(34,197,94,0.22)]" />
            {theme === 'dark' ? 'Pure Dark Black' : 'White + Dark'}
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {(
            [
              { key: 'dark', label: 'Pure Dark Black', description: 'Deep black glass, white typography, and soft neon highlights.', accent: 'from-slate-900 via-slate-950 to-slate-800' },
              { key: 'light', label: 'White + Dark', description: 'Bright section cards with dark contrast and polished SaaS styling.', accent: 'from-slate-100 via-slate-200 to-slate-100' }
            ] as const
          ).map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => setTheme(option.key)}
              className={`group rounded-[1.75rem] border px-6 py-6 text-left transition-shadow duration-300 ${
                theme === option.key
                  ? 'border-cyan-300/30 bg-cyan-400/10 shadow-[0_0_30px_rgba(34,211,238,0.18)]'
                  : 'border-white/10 bg-white/5 hover:border-cyan-300/30 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{option.label}</h3>
                  <p className="mt-2 text-sm text-slate-400">{option.description}</p>
                </div>
                {theme === option.key ? (
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-3xl bg-cyan-400/20 text-cyan-300">✓</span>
                ) : (
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-3xl bg-slate-900/60 text-slate-300 transition group-hover:bg-cyan-400/10">{option.key === 'dark' ? '🌙' : '☀️'}</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="rounded-[2rem] border border-white/5 bg-slate-900/80 p-6 shadow-soft backdrop-blur-xl">
        <p className="text-sm text-slate-400">
          Theme choice is saved on every page load. This is the central control for your recruiter-facing portfolio experience.
        </p>
      </div>
    </motion.div>
  );
}
