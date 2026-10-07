import { createFileRoute, notFound } from "@tanstack/react-router";
import { BadgeCheck } from "lucide-react";
import { DetailShell, NotFoundItem } from "@/components/DetailShell";
import { SaveButton } from "@/components/SaveButton";
import { ShareButton } from "@/components/ShareButton";
import { allOpportunities, daysLeft, opportunityDetails } from "@/lib/data";
import { useT, fmtDateL, fmtLong, storyDate } from "@/lib/i18n";
import { useApp } from "@/lib/store";


export const Route = createFileRoute("/opportunities/$id")({
  loader: ({ params }) => {
    const opp = allOpportunities.find((o) => o.id === params.id);
    if (!opp) throw notFound();
    return { opp };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Opportunity not found | KURA" }, { name: "robots", content: "noindex" }] };
    const o = loaderData.opp;
    const d = `${o.type} at ${o.organisation} · ${o.location}`;
    return {
      meta: [
        { title: `${o.title} — ${o.organisation} | KURA` },
        { name: "description", content: d },
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
  const about = lang === "RW" ? `${o.organisation} itanga ${t(o.title)} ku rubyiruko rufite ubushake. Aya mahirwe (${t(o.type)}) yagenzuwe n'itsinda rya KURA.` : det.about;
  const { days } = daysLeft(o.deadline);
  return (
    <DetailShell back="/opportunities" backLabel="All opportunities">
      <p className="label-micro text-primary">{t(o.type)}</p>
      <h1 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">{t(o.title)}</h1>
      <p className="mt-2 flex items-center gap-1.5 font-semibold text-muted-foreground">
        {o.organisation} {o.verified && <BadgeCheck className="h-4 w-4 text-primary" aria-label={t("Verified")} />}
      </p>
      <dl className="mt-6 grid grid-cols-2 gap-4 border-y py-5 text-sm md:grid-cols-4">
        <div><dt className="label-micro text-muted-foreground">{t("Deadline")}</dt><dd className="mt-1 font-semibold" suppressHydrationWarning>{fmtDateL(o.deadline, lang)}</dd></div>
        <div><dt className="label-micro text-muted-foreground">{t("Time left")}</dt><dd className="mt-1 font-semibold" suppressHydrationWarning>{days} {t("days")}</dd></div>
        <div><dt className="label-micro text-muted-foreground">{t("Location")}</dt><dd className="mt-1 font-semibold">{t(o.location)}</dd></div>
        <div><dt className="label-micro text-muted-foreground">{t("Eligibility")}</dt><dd className="mt-1 font-semibold">{t(o.eligibility)}</dd></div>
      </dl>
      <div className="mt-6 flex flex-wrap gap-2">
        <a href={o.applicationUrl} className="bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">{t("Apply now")}</a>
        <SaveButton item={{ id: o.id, kind: "opportunity", title: o.title, meta: o.type }} />
        <ShareButton title={o.title} path={`/opportunities/${o.id}`} />
      </div>
      <section className="mt-10 space-y-8 leading-relaxed">
        <div><h2 className="text-xl font-bold">{t("About this opportunity")}</h2><p className="mt-2 text-muted-foreground">{about}</p></div>
        <div>
          <h2 className="text-xl font-bold">{t("Requirements")}</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">{det.requirements.map((r) => <li key={r}>{t(r)}</li>)}</ul>
        </div>
        <div><h2 className="text-xl font-bold">{t("How to apply")}</h2><p className="mt-2 text-muted-foreground">{t(det.howToApply)}</p></div>
      </section>
    </DetailShell>
  );
}
