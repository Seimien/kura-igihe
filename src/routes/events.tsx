import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { SaveButton } from "@/components/SaveButton";
import { events, fmtDate } from "@/lib/data";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — What's happening | KURA" },
      { name: "description", content: "Workshops, career fairs and youth events across Rwanda." },
      { property: "og:title", content: "Events — KURA" },
      { property: "og:description", content: "Workshops, career fairs and youth events across Rwanda." },
    ],
  }),
  component: () => (
    <PageShell kicker="Events" title="What's happening">
      <ul className="divide-y border-y">
        {events.map((e) => (
          <li key={e.id} className="flex flex-wrap items-center gap-4 py-4">
            <span className="font-display w-20 text-2xl font-bold uppercase" suppressHydrationWarning>{fmtDate(e.date)}</span>
            <div className="flex-1">
              <p className="label-micro text-primary">{e.type}</p>
              <p className="font-bold">{e.title}</p>
              <p className="text-sm text-muted-foreground">{e.location}</p>
            </div>
            <SaveButton item={{ id: e.id, kind: "event", title: e.title, meta: e.type }} />
          </li>
        ))}
      </ul>
    </PageShell>
  ),
});
