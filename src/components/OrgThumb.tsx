import { cn } from "@/lib/utils";

const tones = ["bg-navy text-navy-foreground", "bg-primary text-primary-foreground", "bg-highlight text-highlight-foreground", "bg-secondary text-secondary-foreground"];

export function OrgThumb({ name, className }: { name: string; className?: string }) {
  const initials = name.split(/\s+/).filter((w) => /^[A-Z]/.test(w)).slice(0, 2).map((w) => w[0]).join("") || name[0];
  const tone = tones[[...name].reduce((a, c) => a + c.charCodeAt(0), 0) % tones.length];
  return (
    <div aria-hidden className={cn("grid h-14 w-14 shrink-0 place-items-center rounded-sm border text-lg font-bold", tone, className)}>
      {initials}
    </div>
  );
}
