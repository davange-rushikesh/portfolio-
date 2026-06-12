'use client';

import { useState } from 'react';
import { CertificationItem } from '../../types/admin';
import { FormField } from './FormField';

type CertificationsSectionProps = {
  data: CertificationItem[];
  onUpdate: (data: CertificationItem[]) => void;
};

export function CertificationsSection({ data, onUpdate }: CertificationsSectionProps) {
  const [certifications, setCertifications] = useState(data);
  const [newCert, setNewCert] = useState({
    title: '',
    issuer: '',
    year: '',
    image: ''
  });

  const addCertification = () => {
    if (newCert.title.trim() && newCert.issuer.trim()) {
      const cert: CertificationItem = {
        id: `cert-${Date.now()}`,
        ...newCert
      };
      const updated = [...certifications, cert];
      setCertifications(updated);
      onUpdate(updated);
      setNewCert({
        title: '',
        issuer: '',
        year: '',
        image: ''
      });
    }
  };

  const updateCertification = (id: string, field: keyof CertificationItem, value: string) => {
    const updated = certifications.map(cert =>
      cert.id === id ? { ...cert, [field]: value } : cert
    );
    setCertifications(updated);
    onUpdate(updated);
  };

  const deleteCertification = (id: string) => {
    const updated = certifications.filter(cert => cert.id !== id);
    setCertifications(updated);
    onUpdate(updated);
  };

  return (
    <div className="space-y-8">
      <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 shadow-soft backdrop-blur-xl">
        <h2 className="mb-6 text-xl font-semibold text-white">Certifications Management</h2>
        <div className="mb-8 space-y-4">
          <h3 className="text-lg font-medium text-slate-200">Add New Certification</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              label="Title"
              id="new-cert-title"
              value={newCert.title}
              onChange={(value) => setNewCert({ ...newCert, title: value })}
              placeholder="Certification title"
            />
            <FormField
              label="Issuer"
              id="new-cert-issuer"
              value={newCert.issuer}
              onChange={(value) => setNewCert({ ...newCert, issuer: value })}
              placeholder="Issuing organization"
            />
            <FormField
              label="Year"
              id="new-cert-year"
              value={newCert.year}
              onChange={(value) => setNewCert({ ...newCert, year: value })}
              placeholder="2024"
            />
            <FormField
              label="Image URL"
              id="new-cert-image"
              value={newCert.image}
              onChange={(value) => setNewCert({ ...newCert, image: value })}
              placeholder="https://example.com/cert-image.jpg"
            />
          </div>
          <button
            onClick={addCertification}
            className="rounded-3xl bg-gradient-to-r from-cyan-400 to-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.02]"
          >
            Add Certification
          </button>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-slate-200">Current Certifications</h3>
          {certifications.map((cert) => (
            <div key={cert.id} className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  label="Title"
                  id={`title-${cert.id}`}
                  value={cert.title}
                  onChange={(value) => updateCertification(cert.id, 'title', value)}
                />
                <FormField
                  label="Issuer"
                  id={`issuer-${cert.id}`}
                  value={cert.issuer}
                  onChange={(value) => updateCertification(cert.id, 'issuer', value)}
                />
                <FormField
                  label="Year"
                  id={`year-${cert.id}`}
                  value={cert.year}
                  onChange={(value) => updateCertification(cert.id, 'year', value)}
                />
                <FormField
                  label="Image URL"
                  id={`image-${cert.id}`}
                  value={cert.image}
                  onChange={(value) => updateCertification(cert.id, 'image', value)}
                />
                <div className="flex items-end gap-2">
                  <button
                    onClick={() => deleteCertification(cert.id)}
                    className="rounded-3xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400 hover:bg-red-500/20"
                  >
                    Delete
                  </button>
                </div>
              </div>
              {cert.image && (
                <div className="mt-4">
                  <img src={cert.image} alt={cert.title} className="h-32 w-full rounded-3xl object-cover" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}