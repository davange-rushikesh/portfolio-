type TimelineItemProps = {
  item: {
    year: string;
    title: string;
    company: string;
    details: string;
  };
};

export function TimelineItem({ item }: TimelineItemProps) {
  return (
    <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 p-7 shadow-soft transition hover:-translate-y-1 hover:bg-slate-900/80">
      <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-cyan-300 to-purple-400 opacity-60 transition group-hover:opacity-100" />
      <div className="relative space-y-3 pr-4">
        <p className="text-sm uppercase tracking-[0.28em] text-cyan-200/80">{item.year}</p>
        <h3 className="text-xl font-semibold text-white">{item.title}</h3>
        <p className="text-sm font-medium text-purple-200">{item.company}</p>
        <p className="text-sm leading-7 text-slate-300">{item.details}</p>
      </div>
    </div>
  );
}
