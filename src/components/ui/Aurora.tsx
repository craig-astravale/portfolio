import { cn } from "@/lib/utils";

export function Aurora({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}
    >
      {/* Radial gradients emulate the old blur()ed circles without any
          per-frame filter rasterization cost. */}
      <div className="animate-drift-a absolute -top-1/4 left-[10%] h-[50vw] w-[50vw] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.32),transparent_70%)]" />
      <div className="animate-drift-b absolute top-[20%] right-[5%] h-[40vw] w-[40vw] rounded-full bg-[radial-gradient(circle,rgba(53,230,214,0.22),transparent_70%)]" />
      <div className="animate-drift-c absolute bottom-[-10%] left-[20%] h-[45vw] w-[45vw] rounded-full bg-[radial-gradient(circle,rgba(255,79,163,0.22),transparent_70%)]" />
    </div>
  );
}
