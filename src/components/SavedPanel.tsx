import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { allOpportunities, events } from "@/lib/data";
import { useT } from "@/lib/i18n";

const prefs = [
  { name: "New scholarships", def: "Weekly" },
  { name: "Jobs", def: "Daily" },
  { name: "Internships", def: "Weekly" },
  { name: "Events", def: "Weekly" },
];
const freqs = ["Off", "Daily", "Weekly"];

export function SavedPanel() {
  const { panel, setPanel, saved, remove, setReminder } = useApp();
  const tr = useT();
  const [alerts, setAlerts] = useState<Record<string, string>>(Object.fromEntries(prefs.map((p) => [p.name, p.def])));
  const dateFor = (id: string) => saved.find((x) => x.id === id)?.date || allOpportunities.find((x) => x.id === id)?.deadline || events.find((x) => x.id === id)?.date;
  const ordered = [...saved].sort((a, b) => (Date.parse(dateFor(a.id) || "") || Infinity) - (Date.parse(dateFor(b.id) || "") || Infinity));
  return (
    <Sheet open={panel !== null} onOpenChange={(o) => !o && setPanel(null)}>
      <SheetContent className="w-full overflow-y-auto bg-paper sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">{tr("Saved & Reminders")}</SheetTitle>
        </SheetHeader>
        <div role="tablist" className="mx-4 flex border-b">
          {(["saved", "alerts"] as const).map((t) => (
            <Button
              key={t}
              role="tab"
              aria-selected={panel === t}
              onClick={() => setPanel(t)}
              className={cn("label-micro -mb-px border-b-2 px-4 py-3", panel === t ? "border-primary text-primary" : "border-transparent text-muted-foreground")}
            >
              {t === "saved" ? `${tr("Saved")} (${saved.length})` : tr("Alerts")}
            </Button>
          ))}
        </div>
        <div className="p-4">
          {panel === "saved" ? (
            saved.length === 0 ? (
              <p className="text-sm text-muted-foreground">{tr("Nothing saved yet. Tap the bookmark on any story, opportunity or event.")}</p>
            ) : (
              <ul className="space-y-3">
                {ordered.map((s) => (
                  <li key={s.id} className="border bg-card p-3">
                    <span className="label-micro text-primary">{tr(s.kind)}{s.meta ? ` · ${tr(s.meta)}` : ""}</span>
                    <p className="mt-1 font-semibold leading-snug">{tr(s.title)}</p>
                    <div className="mt-2 flex gap-3 text-sm font-semibold">
                      <Link
                        to={s.kind === "story" ? "/inspired/$id" : s.kind === "event" ? "/events/$id" : "/opportunities/$id"}
                        params={{ id: s.id }}
                        onClick={() => setPanel(null)}
                        className="text-primary hover:underline"
                      >
                        {tr("Open")}
                      </Link>
                      <Button onClick={() => remove(s.id)} className="text-muted-foreground hover:underline">{tr("Remove")}</Button>
                    </div>
                  </li>
                ))}
              </ul>
            )
          ) : (
            <div>
              <p role="status" className="text-sm text-muted-foreground">{tr("Email alerts are not active yet. No email or reminder will be sent.")}</p>
              <ul className="mt-4 divide-y border-y">
                {prefs.map((p) => (
                  <li key={p.name} className="flex items-center justify-between py-3">
                    <span className="font-semibold">{tr(p.name)}</span>
                    <div role="group" aria-label={`${tr(p.name)} ${tr("frequency")}`} className="flex border text-xs font-semibold">
                      {freqs.map((f) => (
                        <Button
                          key={f}
                          disabled
                          aria-pressed={alerts[p.name] === f}
                          onClick={() => setAlerts((a) => ({ ...a, [p.name]: f }))}
                          className={cn("px-2.5 py-1.5", alerts[p.name] === f ? "bg-navy text-navy-foreground" : "")}
                        >
                          {tr(f)}
                        </Button>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
