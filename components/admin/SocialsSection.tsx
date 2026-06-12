'use client';

import { FormEvent, useState } from 'react';
import { SocialLinks } from '../../types/admin';
import { FormField } from './FormField';
import { motion } from 'framer-motion';

type SocialsSectionProps = {
  data: SocialLinks;
  onUpdate: (data: SocialLinks) => void;
};

export function SocialsSection({ data, onUpdate }: SocialsSectionProps) {
  const [formData, setFormData] = useState(data);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div className="rounded-[2rem] border border-white/5 bg-gradient-to-b from-slate-900/80 to-slate-950/80 p-8 shadow-[0_0_30px_rgba(34,211,238,0.05)] backdrop-blur-xl">
        <h2 className="mb-6 text-xl font-bold text-white">Professional Links</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              label="GitHub Profile"
              id="github"
              value={formData.github || ''}
              onChange={(value) => setFormData({ ...formData, github: value })}
              placeholder="https://github.com/username"
            />
            <FormField
              label="LinkedIn Profile"
              id="linkedin"
              value={formData.linkedin || ''}
              onChange={(value) => setFormData({ ...formData, linkedin: value })}
              placeholder="https://linkedin.com/in/username"
            />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              label="Professional Email"
              id="email"
              value={formData.email || ''}
              onChange={(value) => setFormData({ ...formData, email: value })}
              placeholder="your.email@example.com"
            />
            <FormField
              label="Portfolio Website"
              id="portfolioWebsite"
              value={formData.portfolioWebsite || ''}
              onChange={(value) => setFormData({ ...formData, portfolioWebsite: value })}
              placeholder="https://yourportfolio.com"
            />
          </div>
          <FormField
            label="Instagram (Optional)"
            id="instagram"
            value={formData.instagram || ''}
            onChange={(value) => setFormData({ ...formData, instagram: value })}
            placeholder="https://instagram.com/username"
          />
          <FormField
            label="Kaggle Profile (Optional)"
            id="kaggle"
            value={formData.kaggle || ''}
            onChange={(value) => setFormData({ ...formData, kaggle: value })}
            placeholder="https://kaggle.com/username"
          />
          <button
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 px-6 py-4 text-sm font-bold text-white shadow-glow transition hover:scale-[1.02]"
          >
            Save Links
          </button>
        </form>
      </div>
    </motion.div>
  );
}