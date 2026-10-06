import type { ReactNode } from "react";

export function PageShell({ kicker, title, intro, children }: { kicker: string; title: string; intro?: string; children: ReactNode }) {
  return (
    <div className="pt-16">
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-[1440px] px-6 py-12 lg:px-10">
          <p className="label-micro opacity-80">{kicker}</p>
          <h1 className="mt-2 text-4xl font-extrabold leading-tight md:text-5xl">{title}</h1>
          {intro && <p className="mt-3 max-w-xl opacity-90">{intro}</p>}
        </div>
      </div>
      <div className="mx-auto max-w-[1440px] px-6 py-12 lg:px-10">{children}</div>
    </div>
  );
}
