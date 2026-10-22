import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { helpResources } from "@/lib/data";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
      { title: "Get help — Trusted support | KURA" },
      { name: "description", content: "Confidential, trusted resources and organisations for young people." },
      { property: "og:title", content: "Get help — KURA" },
      { property: "og:description", content: "Confidential, trusted resources and organisations for young people." },
    ],
  }),
  component: HelpPage,
});

function HelpPage() {
  const t = useT();
  return (
    <PageShell kicker="Help" title="Get help" intro="You don't need to explain anything. Choose what feels closest — everything here is private.">
      <div className="grid gap-4 md:grid-cols-2">
        {helpResources.map((h) => (
          <article key={h.id} className="border bg-card p-6">
            <h2 className="text-lg font-bold">{t(h.name)}</h2>
            <p className="mt-1 text-muted-foreground">{t(h.desc)}</p>
          </article>
        ))}
      </div>
      <p className="mt-8 text-sm text-muted-foreground">{t("Local support contacts are awaiting confirmation. For urgent help, contact a nearby health facility or your local emergency service.")}</p>
    </PageShell>
  );
}
