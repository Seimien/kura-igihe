import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { OrgThumb } from "@/components/OrgThumb";
import { CategoryTab, PageShell } from "@/components/PageShell";
import { SaveButton } from "@/components/SaveButton";
import { ShareButton } from "@/components/ShareButton";
import { allOpportunities, facetLabels, fmtDate, jobAttrs, jobFacets, type Opportunity } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useT, fmtDateL, fmtLong, storyDate } from "@/lib/i18n";
import { useApp } from "@/lib/store";


export const Route = createFileRoute("/opportunities/")({
  head: () => ({
    meta: [
      { title: "Opportunities — Jobs, scholarships & grants | KURA" },
      { name: "description", content: "Verified jobs, internships, scholarships and grants for young people in Rwanda." },
      { property: "og:title", content: "Opportunities — KURA" },
      { property: "og:description", content: "Verified jobs, internships, scholarships and grants." },
    ],
  }),
  component: OppList,
});

const cats = ["All", "Jobs", "Internships", "Scholarships", "Others"] as const;
type Cat = (typeof cats)[number];
type Facet = keyof typeof jobFacets;
const facetKeys = Object.keys(jobFacets) as Facet[];

const inCat = (o: Opportunity, c: Cat) =>
  c === "All" || (c === "Jobs" && o.type === "Job") || (c === "Internships" && o.type === "Internship") || (c === "Scholarships" && o.type === "Scholarship") || (c === "Others" && o.type === "Grant");

function OppList() {
  const [cat, setCat] = useState<Cat>("All");
  const t = useT();
  const { lang } = useApp();
  const [open, setOpen] = useState(false);
  const [sel, setSel] = useState<Record<Facet, string[]>>({ employment: [], arrangement: [], region: [], level: [], sector: [] });
  const filterable = cat === "Jobs" || cat === "Internships";
  const active = filterable ? facetKeys.reduce((n, k) => n + sel[k].length, 0) : 0;

  const list = useMemo(
    () =>
      allOpportunities
        .filter((o) => inCat(o, cat))
        .filter((o) => {
          if (!filterable) return true;
          const a = jobAttrs[o.id];
          return facetKeys.every((k) => sel[k].length === 0 || (a && sel[k].includes(a[k])));
        })
        .sort((a, b) => a.deadline.localeCompare(b.deadline)),
    [cat, sel, filterable],
  );

  const toggle = (k: Facet, v: string) => setSel((s) => ({ ...s, [k]: s[k].includes(v) ? s[k].filter((x) => x !== v) : [...s[k], v] }));
  const clear = () => setSel({ employment: [], arrangement: [], region: [], level: [], sector: [] });
  const pickCat = (c: Cat) => {
    setCat(c);
    if (c !== "Jobs" && c !== "Internships") setOpen(false);
  };

  return (
    <PageShell
      kicker="Act"
      title="Opportunities"
      intro="A dedicated board for young professionals. Every listing is verified by the KURA team."
      subheader={
        <div>
          <div className="flex items-center justify-between gap-4">
            <div role="tablist" aria-label={t("Opportunity categories")} className="flex min-w-0 overflow-x-auto [scrollbar-width:none]">
              {cats.map((c) => (
                <CategoryTab key={c} active={cat === c} onClick={() => pickCat(c)}>{t(c)}</CategoryTab>
              ))}
            </div>
            {filterable && (
              <button
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                className={cn("inline-flex shrink-0 items-center gap-2 border px-3 py-2 text-sm font-semibold", open || active ? "border-navy bg-navy text-navy-foreground" : "border-input")}
              >
                <SlidersHorizontal className="h-4 w-4" /> {t("Filter")}{active ? ` (${active})` : ""}
              </button>
            )}
          </div>
          {filterable && open && (
            <div className="max-h-[55vh] overflow-y-auto border-t py-5">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {facetKeys.map((k) => (
                  <fieldset key={k} className={k === "sector" ? "md:col-span-2 lg:col-span-3" : ""}>
                    <legend className="label-micro mb-2 text-muted-foreground">{t(facetLabels[k])}</legend>
                    <div className="flex flex-wrap gap-2">
                      {jobFacets[k].map((v) => (
                        <button
                          key={v}
                          aria-pressed={sel[k].includes(v)}
                          onClick={() => toggle(k, v)}
                          className={cn("border px-3 py-1.5 text-sm font-medium", sel[k].includes(v) ? "border-primary bg-primary text-primary-foreground" : "border-input hover:border-foreground")}
                        >
                          {t(v)}
                        </button>
                      ))}
                    </div>
                  </fieldset>
                ))}
              </div>
              <div className="mt-5 flex gap-4">
                <button onClick={() => setOpen(false)} className="bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">{t("Show results")} ({list.length})</button>
                <button onClick={clear} className="text-sm font-semibold text-primary hover:underline">{t("Clear all")}</button>
              </div>
            </div>
          )}
          {filterable && !open && active > 0 && (
            <div className="flex flex-wrap gap-2 pb-3">
              {facetKeys.flatMap((k) =>
                sel[k].map((v) => (
                  <button key={k + v} onClick={() => toggle(k, v)} className="inline-flex items-center gap-1 bg-secondary px-2 py-1 text-xs font-semibold">
                    {t(v)} <X className="h-3 w-3" />
                  </button>
                )),
              )}
            </div>
          )}
        </div>
      }
    >
      <p className="mb-4 text-sm text-muted-foreground">{list.length} {t("opportunities")}</p>
      <ul className="divide-y border-y">
        {list.map((o) => {
          const a = jobAttrs[o.id];
          return (
            <li key={o.id} className="flex flex-wrap items-center gap-4 py-4">
              <Link to="/opportunities/$id" params={{ id: o.id }} className="group flex min-w-0 flex-1 items-center gap-4">
                <OrgThumb name={o.organisation} />
                <div className="min-w-0 flex-1">
                  <p className="font-bold group-hover:text-primary">{t(o.title)}</p>
                  <p className="flex items-center gap-1 text-sm text-muted-foreground">
                    {o.organisation} {o.verified && <BadgeCheck className="h-3.5 w-3.5 text-primary" aria-label={t("Verified")} />}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {t(o.location)}
                    {a && ` · ${t(a.employment)} · ${t(a.arrangement)} · ${t(a.level)}`}
                  </p>
                </div>
                <span className="hidden text-sm text-muted-foreground sm:block" suppressHydrationWarning>{t("Closes")} {fmtDateL(o.deadline, lang)}</span>
              </Link>
              <SaveButton item={{ id: o.id, kind: "opportunity", title: o.title, meta: o.type }} label={false} />
              <ShareButton title={o.title} path={`/opportunities/${o.id}`} label={false} />
            </li>
          );
        })}
        {list.length === 0 && <li className="py-6 text-muted-foreground">{t("No opportunities match these filters.")}</li>}
      </ul>
    </PageShell>
  );
}
