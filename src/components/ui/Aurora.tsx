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
      <div className="animate-drift-a absolute -top-1/4 left-[10%] h-[50vw] w-[50vw] rounded-full bg-violet/30 blur-[120px]" />
      <div className="animate-drift-b absolute top-[20%] right-[5%] h-[40vw] w-[40vw] rounded-full bg-cyan/20 blur-[130px]" />
      <div className="animate-drift-c absolute bottom-[-10%] left-[20%] h-[45vw] w-[45vw] rounded-full bg-magenta/20 blur-[140px]" />
    </div>
  );
}
