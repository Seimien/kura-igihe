import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { SaveButton } from "@/components/SaveButton";
import { ShareButton } from "@/components/ShareButton";
import { events } from "@/lib/data";
import { useT, fmtDateL, fmtLong, storyDate } from "@/lib/i18n";
import { useApp } from "@/lib/store";


export const Route = createFileRoute("/events/")({
  head: () => ({
    meta: [
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
      { title: "Events — What's happening | KURA" },
      { name: "description", content: "Workshops, career fairs and youth events across Rwanda." },
      { property: "og:title", content: "Events — KURA" },
      { property: "og:description", content: "Workshops, career fairs and youth events across Rwanda." },
    ],
  }),
  component: EventsList,
});

function EventsList() {
  const t = useT();
  const { lang } = useApp();
  return (
    <PageShell kicker="Events" title="What's happening">
      <ul className="divide-y border-y">
        {events.map((e) => (
          <li key={e.id} className="flex flex-wrap items-center gap-4 py-4">
            <Link to="/events/$id" params={{ id: e.id }} className="group flex min-w-0 flex-1 items-center gap-4">
              <span className="w-20 shrink-0 text-xl font-bold uppercase" suppressHydrationWarning>{fmtDateL(e.date, lang)}</span>
              <div className="min-w-0">
                <p className="label-micro text-primary">{t(e.type)}</p>
                <p className="font-bold group-hover:text-primary">{t(e.title)}</p>
                <p className="text-sm text-muted-foreground">{t(e.location)}</p>
              </div>
            </Link>
            <SaveButton item={{ id: e.id, kind: "event", title: e.title, meta: e.type }} />
            <ShareButton title={e.title} path={`/events/${e.id}`} />
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
