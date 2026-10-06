import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useApp } from "@/lib/store";
import { cn } from "@/lib/utils";

const prefs = [
  { name: "New scholarships", def: "Weekly" },
  { name: "Jobs", def: "Daily" },
  { name: "Internships", def: "Weekly" },
  { name: "Events", def: "Weekly" },
];
const freqs = ["Off", "Daily", "Weekly"];

export function SavedPanel() {
  const { panel, setPanel, saved, remove, setReminder } = useApp();
  const [alerts, setAlerts] = useState<Record<string, string>>(Object.fromEntries(prefs.map((p) => [p.name, p.def])));
  return (
    <Sheet open={panel !== null} onOpenChange={(o) => !o && setPanel(null)}>
      <SheetContent className="w-full overflow-y-auto bg-paper sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-display text-3xl font-bold uppercase">Saved & Reminders</SheetTitle>
        </SheetHeader>
        <div role="tablist" className="mx-4 flex border-b">
          {(["saved", "alerts"] as const).map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={panel === t}
              onClick={() => setPanel(t)}
              className={cn("label-micro -mb-px border-b-2 px-4 py-3", panel === t ? "border-primary text-primary" : "border-transparent text-muted-foreground")}
            >
              {t === "saved" ? `Saved (${saved.length})` : "Alerts"}
            </button>
          ))}
        </div>
        <div className="p-4">
          {panel === "saved" ? (
            saved.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nothing saved yet. Tap the bookmark on any story, opportunity or event.</p>
            ) : (
              <ul className="space-y-3">
                {saved.map((s) => (
                  <li key={s.id} className="border bg-card p-3">
                    <span className="label-micro text-primary">{s.kind}{s.meta ? ` · ${s.meta}` : ""}</span>
                    <p className="mt-1 font-semibold leading-snug">{s.title}</p>
                    {s.kind !== "story" && (
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                        <span className="text-muted-foreground">Reminder:</span>
                        {["3 days before", "1 day before", "No reminder"].map((r) => (
                          <button
                            key={r}
                            onClick={() => setReminder(s.id, r)}
                            aria-pressed={(s.reminder ?? "No reminder") === r}
                            className={cn("border px-2 py-1", (s.reminder ?? "No reminder") === r ? "border-primary bg-primary text-primary-foreground" : "border-input")}
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    )}
                    <div className="mt-2 flex gap-3 text-sm font-semibold">
                      <button className="text-primary hover:underline">Open</button>
                      <button onClick={() => remove(s.id)} className="text-muted-foreground hover:underline">Remove</button>
                    </div>
                  </li>
                ))}
              </ul>
            )
          ) : (
            <div>
              <p className="text-sm text-muted-foreground">
                A <strong className="text-foreground">reminder</strong> is about one item you saved. An <strong className="text-foreground">alert</strong> tells you when something like it appears.
              </p>
              <ul className="mt-4 divide-y border-y">
                {prefs.map((p) => (
                  <li key={p.name} className="flex items-center justify-between py-3">
                    <span className="font-semibold">{p.name}</span>
                    <div role="group" aria-label={`${p.name} frequency`} className="flex border text-xs font-semibold">
                      {freqs.map((f) => (
                        <button
                          key={f}
                          aria-pressed={alerts[p.name] === f}
                          onClick={() => setAlerts((a) => ({ ...a, [p.name]: f }))}
                          className={cn("px-2.5 py-1.5", alerts[p.name] === f ? "bg-navy text-navy-foreground" : "")}
                        >
                          {f}
                        </button>
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
