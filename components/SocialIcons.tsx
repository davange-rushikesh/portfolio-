type SocialIconsProps = {
  socials: {
    github: string;
    linkedin: string;
    instagram: string;
    kaggle?: string;
  };
  minimal?: boolean;
};

export function SocialIcons({ socials, minimal }: SocialIconsProps) {
  return (
    <div className={`flex flex-wrap items-center gap-4 ${minimal ? 'justify-end' : ''}`}>
      <a href={socials.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-300/20 hover:text-white">
        <span>GH</span>
        <span className="hidden sm:inline">GitHub</span>
      </a>
      <a href={socials.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-300/20 hover:text-white">
        <span>IN</span>
        <span className="hidden sm:inline">LinkedIn</span>
      </a>
      <a href={socials.instagram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-300/20 hover:text-white">
        <span>IG</span>
        <span className="hidden sm:inline">Instagram</span>
      </a>
      {socials.kaggle && (
        <a href={socials.kaggle} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:border-cyan-300/20 hover:text-white">
          <span>KG</span>
          <span className="hidden sm:inline">Kaggle</span>
        </a>
      )}
    </div>
  );
}
