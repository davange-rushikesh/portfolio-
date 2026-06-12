'use client';

import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(nextTheme)}
      className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-slate-900/60 px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:border-cyan-300/20 hover:bg-slate-900/80"
    >
      <motion.span
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 360 }}
        className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-cyan-300"
      >
        {theme === 'dark' ? '🌙' : '☀️'}
      </motion.span>
      <span className="hidden sm:inline">{theme === 'dark' ? 'Pure Dark' : 'White + Dark'}</span>
    </button>
  );
}
