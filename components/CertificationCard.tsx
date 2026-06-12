'use client';

import { motion } from 'framer-motion';

type Certification = {
  title: string;
  issuer: string;
  year: string;
  image: string;
};

type CertificationCardProps = {
  certification: Certification;
};

export function CertificationCard({ certification }: CertificationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-[2rem] p-6 text-center shadow-soft"
    >
      <div className="mb-4 h-32 w-32 mx-auto overflow-hidden rounded-full border border-white/10">
        <img src={certification.image} alt={certification.title} className="h-full w-full object-cover" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-white">{certification.title}</h3>
      <p className="text-sm text-cyan-300/80">{certification.issuer}</p>
      <p className="text-xs text-slate-400">{certification.year}</p>
    </motion.div>
  );
}