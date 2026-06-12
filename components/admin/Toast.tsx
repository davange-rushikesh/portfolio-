'use client';

type ToastProps = {
  message: string;
};

export function Toast({ message }: ToastProps) {
  return (
    <div className="fixed bottom-6 left-1/2 z-50 w-[min(92vw,420px)] -translate-x-1/2 rounded-3xl border border-white/10 bg-slate-950/95 px-5 py-4 text-sm text-slate-100 shadow-glow backdrop-blur-xl">
      <p>{message}</p>
    </div>
  );
}
