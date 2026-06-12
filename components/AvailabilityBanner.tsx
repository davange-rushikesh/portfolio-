'use client';

import { motion } from 'framer-motion';

type AvailabilityBannerProps = {
  resume?: string;
  role?: string;
  bio?: string;
};

export function AvailabilityBanner({ resume = '/resume.pdf', role, bio }: AvailabilityBannerProps) {
  const displayRole = role || 'Data Analyst | Data Scientist | Machine Learning Enthusiast | Power BI Developer';
  const displayBio = bio || 'Passionate fresher building modern AI and data-driven solutions.';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative z-10 mx-auto -mt-10 mb-24 max-w-4xl"
    >
      <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/60 p-8 shadow-[0_0_30px_rgba(34,211,238,0.05)] backdrop-blur-xl transition-all hover:border-cyan-400/30 hover:shadow-[0_0_40px_rgba(34,211,238,0.1)] sm:p-10">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-purple-500/5 opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm font-semibold text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
            </span>
            Available for Opportunities
          </div>

          <h3 className="mb-3 text-xl font-bold text-white sm:text-2xl tracking-tight">
            {displayRole}
          </h3>
          <p className="mb-8 text-slate-300 italic max-w-2xl text-sm md:text-base">
            "{displayBio}"
          </p>

          <div className="mb-8 flex flex-wrap justify-center gap-3">
            <span className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs md:text-sm text-slate-300">Internships</span>
            <span className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs md:text-sm text-slate-300">Freelance Projects</span>
            <span className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs md:text-sm text-slate-300">Full-Time Roles</span>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <a href="#contact" className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 px-8 py-3 text-sm font-bold text-white shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]">
              Hire Me
            </a>
            <a href={resume} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full border border-cyan-400/30 bg-slate-900/50 px-8 py-3 text-sm font-bold text-cyan-300 transition-all hover:bg-cyan-400/10 hover:scale-[1.02]">
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
