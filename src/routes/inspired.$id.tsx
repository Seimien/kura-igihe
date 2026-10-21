import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { DetailShell, NotFoundItem } from "@/components/DetailShell";
import { SaveButton } from "@/components/SaveButton";
import { ShareButton } from "@/components/ShareButton";
import { allStories, storyBody, allOpportunities, storyNextSteps } from "@/lib/data";
import { useT, fmtDateL, fmtLong, storyDate } from "@/lib/i18n";
import { useApp } from "@/lib/store";


export const Route = createFileRoute("/inspired/$id")({
  loader: ({ params }) => {
    const story = allStories.find((s) => s.id === params.id);
    if (!story) throw notFound();
    return { story };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Story not found | KURA" }, { name: "robots", content: "noindex" }] };
    const s = loaderData.story;
    return {
      meta: [
        { title: `${s.title} | KURA Inspired` },
        { name: "description", content: s.summary },
        { property: "og:title", content: s.title },
        { property: "og:description", content: s.summary },
        { property: "og:type", content: "article" },
      ],
    };
  },
  notFoundComponent: () => <NotFoundItem back="/inspired" />,
  component: StoryPage,
});

function StoryPage() {
  const { story: s } = Route.useLoaderData();
  const t = useT();
  const { lang } = useApp();
  const next = allOpportunities.find((o) => o.id === storyNextSteps[s.id]);
  const related = allStories.filter((x) => x.id !== s.id).slice(0, 3);
  return (
    <DetailShell back="/inspired" backLabel="All stories">
      <p className="label-micro text-primary">{t(s.category)} · {storyDate(s.date, lang)}</p>
      <h1 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">{t(s.title)}</h1>
      <div className="mt-5 flex flex-wrap gap-2">
        <SaveButton item={{ id: s.id, kind: "story", title: s.title, meta: s.category }} />
        <ShareButton title={s.title} path={`/inspired/${s.id}`} />
        {s.youtubeUrl && (
          <a href={s.youtubeUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 bg-primary px-3 py-1.5 text-sm font-semibold text-primary-foreground">
            <Play className="h-3.5 w-3.5 fill-current" /> {t("Watch story")}
          </a>
        )}
      </div>
      <img src={s.image} alt={t(s.title)} className="mt-8 aspect-[16/10] w-full object-cover object-top" />
      <div className="mt-8 space-y-5 text-lg leading-relaxed">
        {storyBody(s).map((p, i) => <p key={i}>{t(p)}</p>)}
      </div>
      <section className="mt-12 border-t pt-8"><h2 className="text-2xl font-bold">{t("What can I do next?")}</h2><ul className="mt-5 space-y-4">{next && <li><Link to="/opportunities/$id" params={{ id: next.id }} className="font-semibold text-primary">{t(next.title)} →</Link></li>}<li><Link to="/learn" className="font-semibold text-primary">{t("Prepare your next step")} →</Link></li><li><Link to="/events" className="font-semibold text-primary">{t("Find a workshop or event")} →</Link></li></ul></section>
      <div className="mt-12 border-t pt-8">
        <p className="label-micro text-primary">{t("More stories")}</p>
        <ul className="mt-4 space-y-3">
          {related.map((r) => (
            <li key={r.id}>
              <Link to="/inspired/$id" params={{ id: r.id }} className="font-semibold hover:text-primary">{t(r.title)}</Link>
            </li>
          ))}
        </ul>
      </div>
    </DetailShell>
  );
}
