type SectionHeadingProps = {
  pretitle: string;
  title: string;
};

export function SectionHeading({ pretitle, title }: SectionHeadingProps) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="text-sm uppercase tracking-[0.38em] text-cyan-200/80">{pretitle}</p>
      <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
    </div>
  );
}
