'use client';

import { motion } from 'framer-motion';

type SkillItem = {
  id?: string;
  name: string;
  progress: number;
  category?: string;
  isBeginner?: boolean;
  description?: string;
};

type SkillCardProps = {
  skill: SkillItem;
};

// Custom SVG Icons for each skill to maintain rich aesthetic
function getSkillIcon(name: string) {
  const normName = name.toLowerCase();

  if (normName.includes('python')) {
    return (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.5h-1v-3h2v1c0 1.1-.9 2-1 2zm3-3.5H9v-2h5v2zm-2-3.5H9v-1c0-1.1.9-2 2-2h1v3z" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="9" r="0.5" fill="currentColor"/>
        <circle cx="15" cy="15" r="0.5" fill="currentColor"/>
      </svg>
    );
  }
  if (normName.includes('pandas') || normName.includes('numpy') || normName.includes('scikit')) {
    return (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 3h18v18H3V3z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 3v18M15 3v18M3 9h18M3 15h18" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (normName.includes('machine learning') || normName.includes('ml')) {
    return (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="M12 6v12M6 12h12M7.5 7.5l9 9M16.5 7.5l-9 9" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="3" fill="currentColor"/>
      </svg>
    );
  }
  if (normName.includes('visualization') || normName.includes('matplotlib') || normName.includes('seaborn')) {
    return (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 20V10M12 20V4M6 20v-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (normName.includes('analysis') || normName.includes('sql') || normName.includes('power bi')) {
    return (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M212 12c0-5.52-4.48-10-10-10S2 6.48 2 12s4.48 10 10 10 10-4.48 10-10z" />
        <path d="M12 2a10 10 0 0 1 10 10H12V2z" fill="currentColor" opacity="0.3" />
        <path d="M12 12L2.5 9.5M12 12l7.5 5.5M12 12V22" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (normName.includes('streamlit') || normName.includes('crud') || normName.includes('file')) {
    return (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (normName.includes('react')) {
    return (
      <svg className="h-6 w-6 animate-[spin_8s_linear_infinite]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(90 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(150 12 12)" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    );
  }
  if (normName.includes('html') || normName.includes('javascript') || normName.includes('js') || normName.includes('css')) {
    return (
      <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10 20l4-16m2 4l4 4-4 4M8 8l-4 4 4 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // Fallback icon
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SkillCard({ skill }: SkillCardProps) {
  const defaultDesc = `Proficient application and modeling using ${skill.name}.`;

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="group relative overflow-hidden rounded-[2.2rem] bg-gradient-to-br from-slate-900/80 to-slate-950/90 p-5 shadow-soft border border-white/5 hover:border-cyan-400/30 hover:shadow-[0_0_25px_rgba(34,211,238,0.15)] transition-all duration-300"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      <div className="relative z-10 flex items-start justify-between mb-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-cyan-300 shadow-glow group-hover:bg-cyan-400/10 group-hover:text-cyan-200 transition-colors duration-300">
          {getSkillIcon(skill.name)}
        </div>
        <div className="flex items-center gap-2">
          {skill.isBeginner && (
            <span className="rounded-full bg-purple-500/20 px-2.5 py-0.5 text-[10px] font-bold text-purple-300 border border-purple-500/30">
              FRESHER
            </span>
          )}
          <span className="text-sm font-bold text-cyan-300/90">{skill.progress}%</span>
        </div>
      </div>
      
      <div className="relative z-10">
        <h3 className="text-lg font-bold text-white group-hover:text-cyan-100 transition-colors duration-300">
          {skill.name}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-slate-400 min-h-[2.5rem] line-clamp-2">
          {skill.description || defaultDesc}
        </p>
        
        {/* Progress Bar */}
        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-800/80 border border-white/5">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.progress}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.1 }}
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-teal-400 to-purple-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
          />
        </div>
      </div>
    </motion.div>
  );
}
