'use client';

import { useState } from 'react';
import { ProjectItem } from '../../types/admin';
import { FormField } from './FormField';
import { motion, AnimatePresence } from 'framer-motion';

type ProjectsSectionProps = {
  data: ProjectItem[];
  onUpdate: (data: ProjectItem[]) => void;
};

export function ProjectsSection({ data, onUpdate }: ProjectsSectionProps) {
  const [projects, setProjects] = useState(data);
  const [isEditing, setIsEditing] = useState(false);

  const [currentProject, setCurrentProject] = useState<Partial<ProjectItem>>({
    title: '',
    description: '',
    githubLink: '',
    liveLink: '',
    tech: [],
    image: '',
    featured: false,
    duration: ''
  });
  const [techInput, setTechInput] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProject.title) return;

    let updated;
    if (currentProject.id) {
      updated = projects.map(p => p.id === currentProject.id ? currentProject as ProjectItem : p);
    } else {
      updated = [...projects, { ...currentProject, id: `project-${Date.now()}` } as ProjectItem];
    }
    
    setProjects(updated);
    onUpdate(updated);
    
    setIsEditing(false);
    setCurrentProject({
      title: '',
      description: '',
      githubLink: '',
      liveLink: '',
      tech: [],
      image: '',
      featured: false,
      duration: ''
    });
    setTechInput('');
  };

  const handleRemove = (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    onUpdate(updated);
  };

  const handleEdit = (project: ProjectItem) => {
    setCurrentProject(project);
    setIsEditing(true);
  };

  const addTech = () => {
    if (techInput.trim() && currentProject.tech) {
      setCurrentProject(prev => ({
        ...prev,
        tech: [...(prev.tech || []), techInput.trim()]
      }));
      setTechInput('');
    }
  };

  const removeTech = (index: number) => {
    setCurrentProject(prev => ({
      ...prev,
      tech: prev.tech?.filter((_, i) => i !== index)
    }));
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      {isEditing ? (
        <div className="rounded-[2rem] border border-white/5 bg-gradient-to-b from-slate-900/80 to-slate-950/80 p-8 shadow-[0_0_30px_rgba(34,211,238,0.05)] backdrop-blur-xl">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">{currentProject.id ? 'Edit Project' : 'Add New Project'}</h2>
            <button type="button" onClick={() => setIsEditing(false)} className="text-sm text-slate-400 hover:text-white">Cancel</button>
          </div>
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                label="Project Title"
                id="title"
                value={currentProject.title || ''}
                onChange={(value) => setCurrentProject({ ...currentProject, title: value })}
              />
              <FormField
                label="Duration"
                id="duration"
                value={currentProject.duration || ''}
                onChange={(value) => setCurrentProject({ ...currentProject, duration: value })}
                placeholder="e.g. Jan 2026 – Feb 2026"
              />
            </div>
            <FormField
              label="Description"
              id="description"
              value={currentProject.description || ''}
              onChange={(value) => setCurrentProject({ ...currentProject, description: value })}
              textarea
              rows={3}
            />
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                label="GitHub Link"
                id="githubLink"
                value={currentProject.githubLink || ''}
                onChange={(value) => setCurrentProject({ ...currentProject, githubLink: value })}
              />
              <FormField
                label="Live Demo Link"
                id="liveLink"
                value={currentProject.liveLink || ''}
                onChange={(value) => setCurrentProject({ ...currentProject, liveLink: value })}
              />
            </div>
            
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Tech Stack</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())}
                  className="flex-1 rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-white transition focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  placeholder="e.g. Next.js (press Enter)"
                />
                <button type="button" onClick={addTech} className="rounded-xl bg-white/10 px-6 py-3 font-semibold text-white hover:bg-white/20">Add</button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {currentProject.tech?.map((t, i) => (
                  <span key={i} className="flex items-center gap-2 rounded-full bg-cyan-400/10 px-3 py-1 text-sm text-cyan-300 border border-cyan-400/20">
                    {t}
                    <button type="button" onClick={() => removeTech(i)} className="text-cyan-300 hover:text-white">&times;</button>
                  </span>
                ))}
              </div>
            </div>

            <FormField
              label="Image URL"
              id="image"
              value={currentProject.image || ''}
              onChange={(value) => setCurrentProject({ ...currentProject, image: value })}
            />
            
            <label className="flex cursor-pointer items-center gap-3 pt-4">
              <div className={`relative h-6 w-11 rounded-full transition-colors duration-300 ${currentProject.featured ? 'bg-cyan-500' : 'bg-slate-700'}`}>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={currentProject.featured}
                  onChange={(e) => setCurrentProject({ ...currentProject, featured: e.target.checked })}
                />
                <div className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform duration-300 ${currentProject.featured ? 'translate-x-5' : ''}`} />
              </div>
              <span className="text-sm font-medium text-slate-300">Featured Project (Show prominently)</span>
            </label>

            <button
              type="submit"
              className="w-full rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 px-6 py-4 text-sm font-bold text-white shadow-glow transition hover:scale-[1.02]"
            >
              Save Project
            </button>
          </form>
        </div>
      ) : (
        <div className="rounded-[2rem] border border-white/5 bg-gradient-to-b from-slate-900/80 to-slate-950/80 p-8 shadow-[0_0_30px_rgba(34,211,238,0.05)] backdrop-blur-xl">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Your Projects</h2>
            <button 
              onClick={() => setIsEditing(true)}
              className="rounded-xl bg-cyan-500/20 px-4 py-2 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-500/30"
            >
              + Add Project
            </button>
          </div>
          <div className="grid gap-6">
            <AnimatePresence>
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="group relative flex gap-6 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-cyan-400/30 sm:items-center"
                >
                  <img src={project.image} alt={project.title} className="h-24 w-32 rounded-xl object-cover" />
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h4 className="text-lg font-bold text-white">{project.title}</h4>
                      {project.featured && <span className="rounded-full bg-cyan-400/20 px-2 py-0.5 text-[10px] font-bold text-cyan-300 border border-cyan-400/30">FEATURED</span>}
                    </div>
                    {project.duration && <p className="text-xs font-semibold text-cyan-400/90">{project.duration}</p>}
                    <p className="mt-1 line-clamp-2 text-sm text-slate-400">{project.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.tech.map((t, i) => (
                        <span key={i} className="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-slate-300">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="absolute right-4 top-4 flex gap-2 sm:static sm:flex-col">
                    <button onClick={() => handleEdit(project)} className="rounded p-2 text-slate-400 hover:bg-white/10 hover:text-white">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                    </button>
                    <button onClick={() => handleRemove(project.id)} className="rounded p-2 text-slate-400 hover:bg-red-500/20 hover:text-red-400">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </motion.div>
  );
}