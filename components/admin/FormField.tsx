'use client';

type FormFieldProps = {
  label: string;
  id: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  textarea?: boolean;
  rows?: number;
  hint?: string;
};

export function FormField({
  label,
  id,
  value,
  onChange,
  placeholder,
  type = 'text',
  textarea,
  rows = 4,
  hint
}: FormFieldProps) {
  return (
    <label className="space-y-2 text-sm text-slate-200">
      <span className="font-medium text-slate-100">{label}</span>
      {textarea ? (
        <textarea
          id={id}
          rows={rows}
          value={String(value)}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className="w-full rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/10"
        />
      ) : (
        <input
          id={id}
          type={type}
          value={String(value)}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className="w-full rounded-3xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/10"
        />
      )}
      {hint ? <p className="text-xs text-slate-500">{hint}</p> : null}
    </label>
  );
}
