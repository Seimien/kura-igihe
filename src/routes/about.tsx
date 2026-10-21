import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About KURA — Youth with ambition" },
      { name: "description", content: "KURA is a youth media platform. Discover our purpose and approach to opportunity information." },
      { property: "og:title", content: "About KURA" },
      { property: "og:description", content: "Youth stories, learning and opportunities in Rwanda." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const t = useT();
  return (
    <PageShell kicker="About" title="Why KURA">
      <div className="max-w-2xl space-y-6 text-lg leading-relaxed">
        <p>{t("KURA helps young people move from information to inspiration to action.")}</p>
        <h2 className="text-2xl font-bold">{t("Source and review standards")}</h2>
        <p className="text-base text-muted-foreground">{t("These are sample stories and listings. Sources, review dates and application links must be confirmed before publication.")}</p>
        <p className="text-base text-muted-foreground">{t("A verified label appears only when source and review evidence are available. KURA is not the opportunity provider.")}</p>
        <p className="text-base text-muted-foreground">{t("Supported by Mastercard Foundation.")}</p>
      </div>
    </PageShell>
  );
}
