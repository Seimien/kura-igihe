import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { SaveButton } from "@/components/SaveButton";
import { closingSoon, fmtDate, opportunities } from "@/lib/data";

export const Route = createFileRoute("/opportunities")({
  head: () => ({
    meta: [
      { title: "Opportunities — Jobs, scholarships & grants | KURA" },
      { name: "description", content: "Verified jobs, internships, scholarships and grants for young people in Rwanda." },
      { property: "og:title", content: "Opportunities — KURA" },
      { property: "og:description", content: "Verified jobs, internships, scholarships and grants." },
    ],
  }),
  component: () => (
    <PageShell kicker="Act" title="Opportunities" intro="Every listing is verified by the KURA team before it is published.">
      <ul className="divide-y border-y">
        {[closingSoon, ...opportunities].map((o) => (
          <li key={o.id} className="flex flex-wrap items-center gap-4 py-4">
            <span className="label-micro w-28 text-primary">{o.type}</span>
            <div className="min-w-60 flex-1">
              <p className="font-bold">{o.title}</p>
              <p className="text-sm text-muted-foreground">{o.organisation} · {o.location}</p>
            </div>
            <span className="text-sm text-muted-foreground" suppressHydrationWarning>Closes {fmtDate(o.deadline)}</span>
            <SaveButton item={{ id: o.id, kind: "opportunity", title: o.title, meta: o.type }} />
          </li>
        ))}
      </ul>
    </PageShell>
  ),
});
