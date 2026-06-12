type ServiceCardProps = {
  service: {
    title: string;
    description: string;
  };
};

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="glass-card rounded-[2rem] border border-white/10 p-7 shadow-soft transition hover:-translate-y-1 hover:border-cyan-300/20 hover:bg-slate-900/70">
      <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-300/20 via-purple-400/20 to-slate-800 text-white shadow-glow">
        <span className="text-2xl">★</span>
      </div>
      <h3 className="mb-3 text-xl font-semibold text-white">{service.title}</h3>
      <p className="text-sm leading-7 text-slate-300">{service.description}</p>
    </article>
  );
}
