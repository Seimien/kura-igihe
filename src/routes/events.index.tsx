import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { SaveButton } from "@/components/SaveButton";
import { ShareButton } from "@/components/ShareButton";
import { events, fmtDate } from "@/lib/data";

export const Route = createFileRoute("/events/")({
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
            <Link to="/events/$id" params={{ id: e.id }} className="group flex min-w-0 flex-1 items-center gap-4">
              <span className="w-20 shrink-0 text-xl font-bold uppercase" suppressHydrationWarning>{fmtDate(e.date)}</span>
              <div className="min-w-0">
                <p className="label-micro text-primary">{e.type}</p>
                <p className="font-bold group-hover:text-primary">{e.title}</p>
                <p className="text-sm text-muted-foreground">{e.location}</p>
              </div>
            </Link>
            <SaveButton item={{ id: e.id, kind: "event", title: e.title, meta: e.type }} />
            <ShareButton title={e.title} path={`/events/${e.id}`} />
          </li>
        ))}
      </ul>
    </PageShell>
  ),
});
