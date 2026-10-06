import { createFileRoute, Link } from "@tanstack/react-router";
import { SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { PageShell } from "@/components/PageShell";
import { SaveButton } from "@/components/SaveButton";
import { ShareButton } from "@/components/ShareButton";
import { allOpportunities, fmtDate } from "@/lib/data";
import { cn } from "@/lib/utils";

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

const types = ["Job", "Internship", "Scholarship", "Grant"] as const;
const sorts = ["Closing soonest", "Newest"] as const;

function OppList() {
  const [open, setOpen] = useState(false);
  const [sel, setSel] = useState<string[]>([]);
  const [loc, setLoc] = useState("");
  const [sort, setSort] = useState<(typeof sorts)[number]>("Closing soonest");
  const list = useMemo(() => {
    let l = allOpportunities.filter((o) => (sel.length ? sel.includes(o.type) : true) && o.location.toLowerCase().includes(loc.toLowerCase()));
    l = [...l].sort((a, b) => a.deadline.localeCompare(b.deadline));
    return sort === "Newest" ? l.reverse() : l;
  }, [sel, loc, sort]);
  const active = sel.length + (loc ? 1 : 0);
  return (
    <PageShell kicker="Act" title="Opportunities" intro="Every listing is verified by the KURA team before it is published.">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{list.length} opportunities</p>
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className={cn("inline-flex items-center gap-2 border px-4 py-2 text-sm font-semibold", open || active ? "border-navy bg-navy text-navy-foreground" : "border-input")}
        >
          <SlidersHorizontal className="h-4 w-4" /> Filter{active ? ` (${active})` : ""}
        </button>
      </div>
      {open && (
        <div className="mb-6 grid gap-6 border bg-card p-5 md:grid-cols-3">
          <fieldset>
            <legend className="label-micro mb-2 text-muted-foreground">Type</legend>
            <div className="flex flex-wrap gap-2">
              {types.map((t) => (
                <button
                  key={t}
                  aria-pressed={sel.includes(t)}
                  onClick={() => setSel((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]))}
                  className={cn("border px-3 py-1.5 text-sm font-semibold", sel.includes(t) ? "border-primary bg-primary text-primary-foreground" : "border-input")}
                >
                  {t}
                </button>
              ))}
            </div>
          </fieldset>
          <div>
            <label htmlFor="loc" className="label-micro mb-2 block text-muted-foreground">Location</label>
            <input id="loc" value={loc} onChange={(e) => setLoc(e.target.value)} placeholder="e.g. Kigali, Online" className="h-9 w-full border border-input bg-paper px-3 text-sm" />
          </div>
          <div>
            <label htmlFor="sort" className="label-micro mb-2 block text-muted-foreground">Sort by</label>
            <select id="sort" value={sort} onChange={(e) => setSort(e.target.value as (typeof sorts)[number])} className="h-9 w-full border border-input bg-paper px-2 text-sm">
              {sorts.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <button onClick={() => { setSel([]); setLoc(""); }} className="text-left text-sm font-semibold text-primary hover:underline md:col-span-3">Clear all filters</button>
        </div>
      )}
      <ul className="divide-y border-y">
        {list.map((o) => (
          <li key={o.id} className="flex flex-wrap items-center gap-4 py-4">
            <Link to="/opportunities/$id" params={{ id: o.id }} className="group flex min-w-0 flex-1 flex-wrap items-center gap-4">
              <span className="label-micro w-28 shrink-0 text-primary">{o.type}</span>
              <div className="min-w-0 flex-1">
                <p className="font-bold group-hover:text-primary">{o.title}</p>
                <p className="text-sm text-muted-foreground">{o.organisation} · {o.location}</p>
              </div>
              <span className="text-sm text-muted-foreground" suppressHydrationWarning>Closes {fmtDate(o.deadline)}</span>
            </Link>
            <SaveButton item={{ id: o.id, kind: "opportunity", title: o.title, meta: o.type }} />
            <ShareButton title={o.title} path={`/opportunities/${o.id}`} label={false} />
          </li>
        ))}
        {list.length === 0 && <li className="py-6 text-muted-foreground">No opportunities match these filters.</li>}
      </ul>
    </PageShell>
  );
}
