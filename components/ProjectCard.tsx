'use client';

import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

type Project = {
  id?: string;
  title?: string;
  name?: string; // Fallback for backward compatibility
  description: string;
  image: string;
  liveLink: string;
  githubLink: string;
  tech: string[];
  duration?: string;
};

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Motion values for tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for rotation
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  // Map mouse positions to tilt angles
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-10, 10]);

  // Glow position state
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Relative position inside the card [0, 1]
    const relativeX = (e.clientX - rect.left) / rect.width;
    const relativeY = (e.clientY - rect.top) / rect.height;

    // Set motion values [-0.5, 0.5]
    x.set(relativeX - 0.5);
    y.set(relativeY - 0.5);

    // Save pixel positions for radial glow
    setGlowPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    x.set(0);
    y.set(0);
  };

  const projectTitle = project.title || project.name || 'Project';

  return (
    <motion.div
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-950/95 p-[1px] shadow-soft transition-all duration-300 hover:border-transparent"
    >
      {/* Radial Glow Border Effect */}
      {hovered && (
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${glowPosition.x}px ${glowPosition.y}px, rgba(34, 211, 238, 0.25), rgba(139, 92, 246, 0.25), transparent 80%)`,
          }}
        />
      )}

      {/* Card Inner Content */}
      <div className="relative z-10 h-full w-full rounded-[2rem] bg-slate-950/90 p-6 md:p-7 backdrop-blur-xl flex flex-col justify-between">
        <div>
          {/* Card Image */}
          <div className="relative overflow-hidden rounded-2xl bg-slate-950/60 mb-6">
            <motion.img
              src={project.image}
              alt={projectTitle}
              className="h-48 w-full object-cover"
              animate={{ scale: hovered ? 1.05 : 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-60" />
            {project.duration && (
              <span className="absolute bottom-3 right-3 rounded-full bg-slate-950/80 px-3 py-1 text-xs font-semibold text-cyan-300 border border-white/5 backdrop-blur-md">
                {project.duration}
              </span>
            )}
          </div>

          {/* Project Details */}
          <div className="space-y-4">
            <div className="space-y-2">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
                Data Science Project
              </span>
              <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-cyan-100 transition-colors duration-300">
                {projectTitle}
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-300 line-clamp-4">
              {project.description}
            </p>
          </div>
        </div>

        {/* Tech Stack and Buttons */}
        <div className="mt-6 pt-6 border-t border-white/5 space-y-5">
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-cyan-500/10 bg-cyan-500/5 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-300/90"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noreferrer"
                className="flex-1 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 via-teal-400 to-indigo-500 py-3 text-xs font-bold uppercase tracking-wider text-slate-950 shadow-glow transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Live Demo
              </a>
            )}
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noreferrer"
                className="flex-1 inline-flex items-center justify-center rounded-full border border-white/10 bg-slate-900/60 py-3 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-slate-800 hover:border-cyan-300/30 hover:scale-[1.02] active:scale-[0.98]"
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
