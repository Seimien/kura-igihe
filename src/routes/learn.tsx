import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { useT } from "@/lib/i18n";
import { learningGuides } from "@/lib/data";

export const Route = createFileRoute("/learn")({
  head: () => ({ meta: [
    { title: "Learn and advice — Your next step | KURA" },
    { name: "description", content: "Practical preparation for applications, learning and career opportunities." },
    { property: "og:title", content: "Learn and advice — KURA" },
    { property: "og:description", content: "Prepare for your next opportunity with practical guidance." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: LearnPage,
});

function LearnPage() {
  const t = useT();
  return <PageShell kicker="Learn" title="Learn and advice" intro="Prepare your next step">
    <div className="max-w-3xl divide-y border-y">{learningGuides.map((g) => <section key={g.title} className="py-7"><h2 className="text-xl font-bold">{t(g.title)}</h2><ol className="mt-4 list-decimal space-y-3 pl-5 text-muted-foreground">{g.steps.map((step) => <li key={step}>{t(step)}</li>)}</ol></section>)}</div>
    <div className="mt-8 flex flex-wrap gap-6"><Link to="/opportunities" className="font-semibold text-primary">{t("Find opportunities")} →</Link><Link to="/events" className="font-semibold text-primary">{t("Find a workshop or event")} →</Link></div>
  </PageShell>;
}