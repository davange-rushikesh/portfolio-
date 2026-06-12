'use client';

import { useState } from 'react';
import { SkillItem, SkillCategory } from '../../types/admin';
import { FormField } from './FormField';
import { motion, AnimatePresence } from 'framer-motion';

type SkillsSectionProps = {
  data: SkillItem[];
  onUpdate: (data: SkillItem[]) => void;
};

const categories: SkillCategory[] = ['Frontend', 'Backend', 'Data Analysis', 'Machine Learning'];

export function SkillsSection({ data, onUpdate }: SkillsSectionProps) {
  const [skills, setSkills] = useState(data);

  const [newSkill, setNewSkill] = useState<Partial<SkillItem>>({
    name: '',
    progress: 50,
    category: 'Data Analysis',
    isBeginner: false,
    description: ''
  });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.name) return;

    const skill: SkillItem = {
      id: `skill-${Date.now()}`,
      name: newSkill.name,
      progress: newSkill.progress || 50,
      category: newSkill.category as SkillCategory,
      isBeginner: newSkill.isBeginner || false,
      description: newSkill.description || ''
    };

    const updated = [...skills, skill];
    setSkills(updated);
    onUpdate(updated);
    setNewSkill({ name: '', progress: 50, category: 'Data Analysis', isBeginner: false, description: '' });
  };

  const handleRemove = (id: string) => {
    const updated = skills.filter((s) => s.id !== id);
    setSkills(updated);
    onUpdate(updated);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div className="rounded-[2rem] border border-white/5 bg-gradient-to-b from-slate-900/80 to-slate-950/80 p-8 shadow-[0_0_30px_rgba(34,211,238,0.05)] backdrop-blur-xl">
        <h2 className="mb-6 text-xl font-bold text-white">Add New Skill</h2>
        <form onSubmit={handleAdd} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              label="Skill Name"
              id="name"
              value={newSkill.name || ''}
              onChange={(value) => setNewSkill({ ...newSkill, name: value })}
              placeholder="e.g., Python"
            />
            <FormField
              label="Proficiency (%)"
              id="progress"
              type="number"
              value={newSkill.progress?.toString() || ''}
              onChange={(value) => setNewSkill({ ...newSkill, progress: Number(value) })}
              placeholder="85"
            />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">Category</label>
              <select
                value={newSkill.category}
                onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value as SkillCategory })}
                className="w-full rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-white transition focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center pt-8">
              <label className="flex cursor-pointer items-center gap-3">
                <div className={`relative h-6 w-11 rounded-full transition-colors duration-300 ${newSkill.isBeginner ? 'bg-purple-500' : 'bg-slate-700'}`}>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={newSkill.isBeginner}
                    onChange={(e) => setNewSkill({ ...newSkill, isBeginner: e.target.checked })}
                  />
                  <div className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform duration-300 ${newSkill.isBeginner ? 'translate-x-5' : ''}`} />
                </div>
                <span className="text-sm font-medium text-slate-300">Mark as Beginner/Fresher</span>
              </label>
            </div>
          </div>
          <FormField
            label="Skill Description"
            id="description"
            value={newSkill.description || ''}
            onChange={(value) => setNewSkill({ ...newSkill, description: value })}
            placeholder="Brief description of how you apply this skill"
          />
          <button
            type="submit"
            className="rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 text-sm font-bold text-white shadow-glow transition hover:scale-[1.02]"
          >
            Add Skill
          </button>
        </form>
      </div>

      <div className="rounded-[2rem] border border-white/5 bg-gradient-to-b from-slate-900/80 to-slate-950/80 p-8 shadow-[0_0_30px_rgba(34,211,238,0.05)] backdrop-blur-xl">
        <h3 className="mb-6 text-xl font-bold text-white">Current Skills</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <AnimatePresence>
            {skills.map((skill) => (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group relative flex items-center justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-cyan-400/30"
              >
                <div className="w-full">
                  <div className="mb-2 flex items-center justify-between pr-10">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{skill.name}</span>
                      {skill.isBeginner && (
                        <span className="rounded-full bg-purple-500/20 px-2 py-0.5 text-[10px] font-bold text-purple-300 border border-purple-500/30">FRESHER</span>
                      )}
                    </div>
                    <span className="text-xs text-cyan-400">{skill.progress}%</span>
                  </div>
                  <div className="h-1.5 w-[90%] rounded-full bg-slate-800">
                    <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-500" style={{ width: `${skill.progress}%` }} />
                  </div>
                  <p className="mt-2 text-xs text-slate-400">{skill.category}</p>
                </div>
                <button
                  onClick={() => handleRemove(skill.id)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-2 text-slate-400 opacity-0 transition hover:bg-red-500/20 hover:text-red-400 group-hover:opacity-100"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}