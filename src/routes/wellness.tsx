import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { useT } from "@/lib/i18n";
import { allStories } from "@/lib/data";

export const Route = createFileRoute("/wellness")({ head: () => ({ meta: [
  { title: "Wellness — Health and wellbeing | KURA" },
  { name: "description", content: "Health stories and transparent review information for young people in Rwanda." },
  { property: "og:title", content: "Wellness — KURA" },
  { property: "og:description", content: "Health and wellbeing stories, with links to support." },
  { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
] }), component: WellnessPage });

function WellnessPage() {
  const t = useT();
  return <PageShell kicker="Wellness" title="Health and wellbeing">
    <p className="max-w-2xl border-l-2 border-primary pl-4 text-muted-foreground">{t("These stories are for information, not professional medical advice. Review information is shown when available.")}</p>
    <div className="mt-8 grid gap-8 md:grid-cols-3">{allStories.filter((s) => s.category === "Health").map((s) => <article key={s.id}><Link to="/inspired/$id" params={{ id: s.id }}><img src={s.image} alt={t(s.title)} loading="lazy" className="aspect-[4/3] w-full object-cover" /><h2 className="mt-4 text-xl font-bold">{t(s.title)}</h2></Link><p className="mt-2 text-muted-foreground">{t(s.summary)}</p><p className="mt-3 text-xs text-muted-foreground">{t("Clinical review: not yet supplied")}</p></article>)}</div>
    <Link to="/help" className="mt-8 inline-block font-semibold text-primary">{t("Get help")} →</Link>
  </PageShell>;
}