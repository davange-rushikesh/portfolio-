'use client';

import { useState } from 'react';
import { EducationItem } from '../../types/admin';
import { FormField } from './FormField';

type EducationSectionProps = {
  data: EducationItem[];
  onUpdate: (data: EducationItem[]) => void;
};

export function EducationSection({ data, onUpdate }: EducationSectionProps) {
  const [education, setEducation] = useState(data);
  const [newEdu, setNewEdu] = useState({
    degree: '',
    institution: '',
    year: '',
    grade: '',
    image: ''
  });

  const addEducation = () => {
    if (newEdu.degree.trim() && newEdu.institution.trim()) {
      const edu: EducationItem = {
        id: `edu-${Date.now()}`,
        ...newEdu
      };
      const updated = [...education, edu];
      setEducation(updated);
      onUpdate(updated);
      setNewEdu({
        degree: '',
        institution: '',
        year: '',
        grade: '',
        image: ''
      });
    }
  };

  const updateEducation = (id: string, field: keyof EducationItem, value: string) => {
    const updated = education.map(edu =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    setEducation(updated);
    onUpdate(updated);
  };

  const deleteEducation = (id: string) => {
    const updated = education.filter(edu => edu.id !== id);
    setEducation(updated);
    onUpdate(updated);
  };

  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-soft backdrop-blur-xl">
        <h2 className="mb-6 text-xl font-semibold text-white">Education Management</h2>
        <div className="mb-8 space-y-4">
          <h3 className="text-lg font-medium text-slate-200">Add New Education</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              label="Degree"
              id="new-edu-degree"
              value={newEdu.degree}
              onChange={(value) => setNewEdu({ ...newEdu, degree: value })}
              placeholder="B.Tech in Computer Science"
            />
            <FormField
              label="Institution"
              id="new-edu-institution"
              value={newEdu.institution}
              onChange={(value) => setNewEdu({ ...newEdu, institution: value })}
              placeholder="University name"
            />
            <FormField
              label="Year"
              id="new-edu-year"
              value={newEdu.year}
              onChange={(value) => setNewEdu({ ...newEdu, year: value })}
              placeholder="2021"
            />
            <FormField
              label="Grade"
              id="new-edu-grade"
              value={newEdu.grade}
              onChange={(value) => setNewEdu({ ...newEdu, grade: value })}
              placeholder="First Class"
            />
            <FormField
              label="Image URL"
              id="new-edu-image"
              value={newEdu.image}
              onChange={(value) => setNewEdu({ ...newEdu, image: value })}
              placeholder="https://example.com/edu-image.jpg"
            />
          </div>
          <button
            onClick={addEducation}
            className="rounded-3xl bg-gradient-to-r from-cyan-400 to-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.02]"
          >
            Add Education
          </button>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-slate-200">Current Education</h3>
          {education.map((edu) => (
            <div key={edu.id} className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  label="Degree"
                  id={`degree-${edu.id}`}
                  value={edu.degree}
                  onChange={(value) => updateEducation(edu.id, 'degree', value)}
                />
                <FormField
                  label="Institution"
                  id={`institution-${edu.id}`}
                  value={edu.institution}
                  onChange={(value) => updateEducation(edu.id, 'institution', value)}
                />
                <FormField
                  label="Year"
                  id={`year-${edu.id}`}
                  value={edu.year}
                  onChange={(value) => updateEducation(edu.id, 'year', value)}
                />
                <FormField
                  label="Grade"
                  id={`grade-${edu.id}`}
                  value={edu.grade}
                  onChange={(value) => updateEducation(edu.id, 'grade', value)}
                />
                <FormField
                  label="Image URL"
                  id={`image-${edu.id}`}
                  value={edu.image}
                  onChange={(value) => updateEducation(edu.id, 'image', value)}
                />
                <div className="flex items-end gap-2">
                  <button
                    onClick={() => deleteEducation(edu.id)}
                    className="rounded-3xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400 hover:bg-red-500/20"
                  >
                    Delete
                  </button>
                </div>
              </div>
              {edu.image && (
                <div className="mt-4">
                  <img src={edu.image} alt={edu.degree} className="h-32 w-full rounded-3xl object-cover" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}