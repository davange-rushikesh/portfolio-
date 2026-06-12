'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '../../components/admin/Sidebar';
import { ProfileSection } from '../../components/admin/ProfileSection';
import { SkillsSection } from '../../components/admin/SkillsSection';
import { ProjectsSection } from '../../components/admin/ProjectsSection';
import { CertificationsSection } from '../../components/admin/CertificationsSection';
import { EducationSection } from '../../components/admin/EducationSection';
import { SocialsSection } from '../../components/admin/SocialsSection';
import { ThemeSettings } from '../../components/admin/ThemeSettings';
import { Spinner } from '../../components/admin/Spinner';
import { Toast } from '../../components/admin/Toast';
import { SectionKey, AdminData } from '../../types/admin';
import { loadAdminData, saveAdminData } from '../../lib/adminStorage';
import { defaultAdminData } from '../../lib/dummyAdminData';

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState<SectionKey>('profile');
  const [data, setData] = useState<AdminData | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    const isAuth = localStorage.getItem('admin-auth');
    if (!isAuth) {
      router.replace('/admin/login');
      return;
    }

    // Load data
    const loadedData = loadAdminData(defaultAdminData);
    setData(loadedData);
  }, [router]);

  const updateData = (newData: AdminData) => {
    setData(newData);
    saveAdminData(newData);
    setToast('Changes Saved Successfully ✅');
    setTimeout(() => setToast(null), 3000);
  };

  if (!data) return <Spinner />;

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileSection data={data.profile} onUpdate={(profile) => updateData({ ...data, profile })} />;
      case 'skills':
        return <SkillsSection data={data.skills} onUpdate={(skills) => updateData({ ...data, skills })} />;
      case 'projects':
        return <ProjectsSection data={data.projects} onUpdate={(projects) => updateData({ ...data, projects })} />;
      case 'certifications':
        return <CertificationsSection data={data.certifications} onUpdate={(certifications) => updateData({ ...data, certifications })} />;
      case 'education':
        return <EducationSection data={data.education} onUpdate={(education) => updateData({ ...data, education })} />;
      case 'socials':
        return <SocialsSection data={data.socials} onUpdate={(socials) => updateData({ ...data, socials })} />;
      case 'theme':
        return <ThemeSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-midnight">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-slate-400">Manage your portfolio content</p>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('admin-auth');
              router.push('/');
            }}
            className="rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
          >
            Logout
          </button>
        </div>
        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
          <Sidebar active={activeSection} onSelect={setActiveSection} />
          <main className="space-y-8">
            {renderSection()}
          </main>
        </div>
      </div>
      {toast && <Toast message={toast} />}
    </div>
  );
}