import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { OpportunitySummary, OpportunityStatus } from "@/components/OpportunitySummary";
import { ProviderHandoff } from "@/components/ProviderHandoff";
import { DetailShell, NotFoundItem } from "@/components/DetailShell";
import { SaveButton } from "@/components/SaveButton";
import { ShareButton } from "@/components/ShareButton";
import { allOpportunities, daysLeft, opportunityDetails, openOpportunities, opportunityStatus } from "@/lib/data";
import { useT, fmtDateL, fmtLong, storyDate } from "@/lib/i18n";
import { useApp } from "@/lib/store";


export const Route = createFileRoute("/opportunities/$id")({
  loader: ({ params }) => {
    const opp = allOpportunities.find((o) => o.id === params.id);
    if (!opp) throw notFound();
    return { opp };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [
      { name: "twitter:card", content: "summary_large_image" },{ title: "Opportunity not found | KURA" }, { name: "robots", content: "noindex" }] };
    const o = loaderData.opp;
    const d = `${o.type} at ${o.organisation} · ${o.location}`;
    return {
      meta: [
      { property: "og:type", content: "website" },
        { title: `${o.title} — ${o.organisation} | KURA` },
        { name: "description", content: d },
        { name: "twitter:card", content: "summary_large_image" },
        { property: "og:title", content: o.title },
        { property: "og:description", content: d },
      ],
    };
  },
  notFoundComponent: () => <NotFoundItem back="/opportunities" />,
  component: OppPage,
});

function OppPage() {
  const { opp: o } = Route.useLoaderData();
  const det = opportunityDetails(o);
  const t = useT();
  const { lang } = useApp();
  const about = lang === "RW" ? `${o.organisation} itanga ${t(o.title)} ku rubyiruko rufite ubushake. Aya ni amahirwe ku rubyiruko.` : det.about;
  const { days } = daysLeft(o.deadline);
  return (
    <DetailShell back="/opportunities" backLabel="All opportunities">
      <p className="label-micro text-primary">{t(o.type)}</p>
      <h1 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">{t(o.title)}</h1>
      <p className="mt-2 flex items-center gap-1.5 font-semibold text-muted-foreground">
        {o.organisation}
      </p>
      <div className="mt-4"><OpportunityStatus opportunity={o} /><OpportunitySummary opportunity={o} /></div>
      {opportunityStatus(o.deadline) === "Closed" && <p role="status" className="mt-4 border-l-2 border-primary pl-3">{t("This opportunity is closed. Explore similar open opportunities below.")}</p>}
      <dl className="mt-6 grid grid-cols-2 gap-4 border-y py-5 text-sm md:grid-cols-4">
        <div><dt className="label-micro text-muted-foreground">{t("Deadline")}</dt><dd className="mt-1 font-semibold" suppressHydrationWarning>{fmtDateL(o.deadline, lang)}</dd></div>
        <div><dt className="label-micro text-muted-foreground">{t("Time left")}</dt><dd className="mt-1 font-semibold" suppressHydrationWarning>{days} {t("days")}</dd></div>
        <div><dt className="label-micro text-muted-foreground">{t("Location")}</dt><dd className="mt-1 font-semibold">{t(o.location)}</dd></div>
        <div><dt className="label-micro text-muted-foreground">{t("Eligibility")}</dt><dd className="mt-1 font-semibold">{t(o.eligibility)}</dd></div>
      </dl>
      <div className="mt-6 flex flex-wrap gap-2">
        <ProviderHandoff opportunity={o} />
        <SaveButton item={{ id: o.id, kind: "opportunity", title: o.title, meta: o.type, date: o.deadline }} />
        <ShareButton title={o.title} path={`/opportunities/${o.id}`} />
      </div>
      <section className="mt-10 space-y-8 leading-relaxed">
        <div><h2 className="text-xl font-bold">{t("About this opportunity")}</h2><p className="mt-2 text-muted-foreground">{about}</p></div>
        <div>
          <h2 className="text-xl font-bold">{t("Requirements")}</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">{det.requirements.map((r) => <li key={r}>{t(r)}</li>)}</ul>
        </div>
        <div><h2 className="text-xl font-bold">{t("How to apply")}</h2><p className="mt-2 text-muted-foreground">{t(det.howToApply)}</p></div>
        <div><h2 className="text-xl font-bold">{t("What KURA adds")}</h2><p className="mt-2 text-muted-foreground">{t("Use this summary to assess your fit. Confirm all requirements with the provider before applying.")}</p><Link to="/learn" className="mt-3 inline-block font-semibold text-primary">{t("Prepare your next step")} →</Link></div>
        <div><h2 className="text-xl font-bold">{t("Similar opportunities")}</h2><ul className="mt-3 space-y-3">{openOpportunities().filter((x) => x.id !== o.id && x.type === o.type).slice(0, 3).map((x) => <li key={x.id}><Link to="/opportunities/$id" params={{ id: x.id }} className="font-semibold text-primary">{t(x.title)}</Link></li>)}</ul><Link to="/opportunities" className="mt-4 inline-block text-sm font-semibold text-primary">{t("All opportunities")} →</Link></div>
      </section>
      <div className="sticky bottom-0 -mx-6 mt-8 border-t bg-background/95 px-6 py-3 backdrop-blur-md md:hidden"><ProviderHandoff opportunity={o} /></div>
    </DetailShell>
  );
}
