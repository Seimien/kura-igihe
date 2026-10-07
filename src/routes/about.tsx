import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About KURA — How we verify" },
      { name: "description", content: "KURA is a youth media platform. Learn how we verify every story and opportunity." },
      { property: "og:title", content: "About KURA" },
      { property: "og:description", content: "Learn how KURA verifies every story and opportunity." },
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
        <h2 className="text-2xl font-bold">{t("How we verify")}</h2>
        <ol className="list-decimal space-y-2 pl-6 text-base text-muted-foreground">
          <li>{t("Every opportunity is checked directly with the organisation offering it.")}</li>
          <li>{t("Deadlines and eligibility are confirmed before publishing.")}</li>
          <li>{t("Stories are fact-checked with the people featured.")}</li>
        </ol>
        <p className="text-base text-muted-foreground">{t("Supported by Mastercard Foundation.")}</p>
      </div>
    </PageShell>
  );
}
