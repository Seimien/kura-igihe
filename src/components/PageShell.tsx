import type { ReactNode } from "react";
import { useT } from "@/lib/i18n";

export function PageShell({ kicker, title, intro, subheader, children }: { kicker: string; title: string; intro?: string; subheader?: ReactNode; children: ReactNode }) {
  const t = useT();
  return (
    <div className="pt-16">
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-[1440px] px-6 py-12 lg:px-10">
          <p className="label-micro opacity-80">{t(kicker)}</p>
          <h1 className="mt-2 text-4xl font-extrabold leading-tight md:text-5xl">{t(title)}</h1>
          {intro && <p className="mt-3 max-w-xl opacity-90">{t(intro)}</p>}
        </div>
      </div>
      {subheader && (
        <div className="sticky top-16 z-30 border-b bg-background/95 backdrop-blur-md">
          <div className="mx-auto max-w-[1440px] px-6 lg:px-10">{subheader}</div>
        </div>
      )}
      <div className="mx-auto max-w-[1440px] px-6 py-10 lg:px-10">{children}</div>
    </div>
  );
}

export function CategoryTab({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={
        "-mb-px shrink-0 whitespace-nowrap border-b-2 px-3 py-4 text-sm font-semibold transition-colors " +
        (active ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground")
      }
    >
      {children}
    </button>
  );
}
