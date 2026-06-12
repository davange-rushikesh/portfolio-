'use client';

import { useState } from 'react';
import { ProfileAdmin } from '../../types/admin';
import { FormField } from './FormField';
import { motion } from 'framer-motion';

type ProfileSectionProps = {
  data: ProfileAdmin;
  onUpdate: (data: ProfileAdmin) => void;
};

export function ProfileSection({ data, onUpdate }: ProfileSectionProps) {
  const [formData, setFormData] = useState<ProfileAdmin>(data);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div className="rounded-[2rem] border border-white/5 bg-gradient-to-b from-slate-900/80 to-slate-950/80 p-8 shadow-[0_0_30px_rgba(34,211,238,0.05)] backdrop-blur-xl">
        <h2 className="mb-6 text-xl font-bold text-white">General Information</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormField
            label="Name"
            id="name"
            value={formData.name || ''}
            onChange={(value) => setFormData({ ...formData, name: value })}
            placeholder="Your full name"
          />
          <FormField
            label="Professional Role"
            id="role"
            value={formData.role || ''}
            onChange={(value) => setFormData({ ...formData, role: value })}
            placeholder="e.g. Data Analyst | Data Scientist | ML Enthusiast"
          />
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              label="Phone Number"
              id="phone"
              value={formData.phone || ''}
              onChange={(value) => setFormData({ ...formData, phone: value })}
              placeholder="+91 9423880393"
            />
            <FormField
              label="Location"
              id="location"
              value={formData.location || ''}
              onChange={(value) => setFormData({ ...formData, location: value })}
              placeholder="Maharashtra, India"
            />
          </div>
          <FormField
            label="Career Objective"
            id="careerObjective"
            value={formData.careerObjective || ''}
            onChange={(value) => setFormData({ ...formData, careerObjective: value })}
            textarea
            rows={3}
            placeholder="Passionate Fresher Data Science..."
            hint="A strong opening statement for recruiters."
          />
          <FormField
            label="Bio (Detailed)"
            id="bio"
            value={formData.bio || ''}
            onChange={(value) => setFormData({ ...formData, bio: value })}
            textarea
            rows={4}
            placeholder="Detailed description about yourself"
          />
          <FormField
            label="Current Learning"
            id="currentLearning"
            value={formData.currentLearning || ''}
            onChange={(value) => setFormData({ ...formData, currentLearning: value })}
            placeholder="e.g. Deep Learning & NLP"
          />
          <FormField
            label="Profile Image URL"
            id="profileImage"
            value={formData.profileImage || ''}
            onChange={(value) => setFormData({ ...formData, profileImage: value })}
            placeholder="https://example.com/profile.jpg"
            hint="Upload or paste image URL"
          />
          <div className="flex gap-4">
            <div className="flex-1">
              <FormField
                label="Resume Link (PDF)"
                id="resume"
                value={formData.resume || ''}
                onChange={(value) => setFormData({ ...formData, resume: value })}
                placeholder="/resume.pdf"
              />
            </div>
            {formData.resume && (
              <div className="flex items-end">
                <a href={formData.resume} target="_blank" rel="noopener noreferrer" className="mb-1 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-white hover:bg-white/20">
                  Preview PDF
                </a>
              </div>
            )}
          </div>
          
          <button
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 px-6 py-4 text-sm font-bold tracking-wide text-white shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)]"
          >
            SAVE PROFILE CHANGES
          </button>
        </form>
      </div>
      
      {formData.profileImage && (
        <div className="rounded-[2rem] border border-white/5 bg-gradient-to-b from-slate-900/80 to-slate-950/80 p-8 shadow-soft backdrop-blur-xl">
          <h3 className="mb-4 text-lg font-semibold text-slate-300">Live Preview</h3>
          <div className="flex items-center gap-6">
            <img src={formData.profileImage} alt="Profile preview" className="h-24 w-24 rounded-full border-2 border-cyan-400/50 object-cover shadow-[0_0_15px_rgba(34,211,238,0.3)]" />
            <div>
              <h4 className="text-xl font-bold text-white">{formData.name}</h4>
              <p className="text-sm text-cyan-400">Profile Image active</p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}