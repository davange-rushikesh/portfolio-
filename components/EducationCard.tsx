'use client';

import { motion } from 'framer-motion';

type Education = {
  degree: string;
  institution: string;
  year: string;
  grade: string;
  image: string;
};

type EducationCardProps = {
  education: Education;
};

export function EducationCard({ education }: EducationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-[2rem] p-6 shadow-soft"
    >
      <div className="mb-4 h-24 w-full overflow-hidden rounded-2xl border border-white/10">
        <img src={education.image} alt={education.institution} className="h-full w-full object-cover" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-white">{education.degree}</h3>
        <p className="text-sm text-cyan-300/80">{education.institution}</p>
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>{education.year}</span>
          <span>{education.grade}</span>
        </div>
      </div>
    </motion.div>
  );
}