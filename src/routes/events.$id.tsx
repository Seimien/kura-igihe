import { createFileRoute, notFound } from "@tanstack/react-router";
import { Calendar, MapPin } from "lucide-react";
import { DetailShell, NotFoundItem } from "@/components/DetailShell";
import { SaveButton } from "@/components/SaveButton";
import { ShareButton } from "@/components/ShareButton";
import { eventDetails, events } from "@/lib/data";
import { useT, fmtDateL, fmtLong, storyDate } from "@/lib/i18n";
import { useApp } from "@/lib/store";


export const Route = createFileRoute("/events/$id")({
  loader: ({ params }) => {
    const ev = events.find((e) => e.id === params.id);
    if (!ev) throw notFound();
    return { ev };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [
      { name: "twitter:card", content: "summary_large_image" },{ title: "Event not found | KURA" }, { name: "robots", content: "noindex" }] };
    const e = loaderData.ev;
    const d = `${e.type} · ${e.location}`;
    return {
      meta: [
      { property: "og:type", content: "website" },
        { title: `${e.title} | KURA Events` },
        { name: "description", content: d },
        { property: "og:title", content: e.title },
        { property: "og:description", content: d },
      ],
    };
  },
  notFoundComponent: () => <NotFoundItem back="/events" />,
  component: EventPage,
});

function EventPage() {
  const { ev: e } = Route.useLoaderData();
  const t = useT();
  const { lang } = useApp();
  const date = fmtLong(e.date, lang);
  const desc = lang === "RW" ? `${t(e.title)} ihuza urubyiruko, abakoresha n'abajyanama mu munsi wo kwiga, guhura n'abandi no mu bikorwa ngiro. Kwinjira ni ubuntu, ariko imyanya ni mike — iyandikishe hakiri kare.` : eventDetails(e);
  return (
    <DetailShell back="/events" backLabel="All events">
      <p className="label-micro text-primary">{t(e.type)}</p>
      <h1 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">{t(e.title)}</h1>
      <div className="mt-5 space-y-2 text-muted-foreground">
        <p className="flex items-center gap-2" suppressHydrationWarning><Calendar className="h-4 w-4" /> {date}</p>
        <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {t(e.location)}</p>
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        <a href={e.registrationUrl} className="bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">{t("Register")}</a>
        <SaveButton item={{ id: e.id, kind: "event", title: e.title, meta: e.type }} />
        <ShareButton title={e.title} path={`/events/${e.id}`} />
      </div>
      <p className="mt-10 text-lg leading-relaxed">{desc}</p>
    </DetailShell>
  );
}
