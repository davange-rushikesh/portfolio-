export type CertificationItem = {
  id: string;
  title: string;
  issuer: string;
  year: string;
  image: string;
};

export type EducationItem = {
  id: string;
  degree: string;
  institution: string;
  year: string;
  grade: string;
  image: string;
};

export type SocialLinks = {
  github: string;
  linkedin: string;
  instagram: string;
  email: string;
  portfolioWebsite?: string;
  kaggle?: string;
};

export type ProfileAdmin = {
  name: string;
  role: string;
  phone: string;
  location: string;
  careerObjective: string;
  currentLearning: string;
  bio: string;
  profileImage: string;
  resume: string;
};

export type SkillCategory = 'Frontend' | 'Backend' | 'Data Analysis' | 'Machine Learning';

export type SkillItem = {
  id: string;
  name: string;
  progress: number;
  category?: SkillCategory;
  isBeginner?: boolean;
  description?: string;
};

export type ProjectItem = {
  id: string;
  title: string;
  description: string;
  githubLink: string;
  liveLink: string;
  tech: string[];
  image: string;
  featured: boolean;
  duration?: string;
};

export type AdminData = {
  profile: ProfileAdmin;
  skills: SkillItem[];
  projects: ProjectItem[];
  socials: SocialLinks;
  certifications: CertificationItem[];
  education: EducationItem[];
};

export type SectionKey = 'profile' | 'skills' | 'projects' | 'socials' | 'certifications' | 'education' | 'theme';

