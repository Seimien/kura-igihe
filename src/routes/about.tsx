import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About KURA — How we verify" },
      { name: "description", content: "KURA is a youth media platform. Learn how we verify every story and opportunity." },
      { property: "og:title", content: "About KURA" },
      { property: "og:description", content: "Learn how KURA verifies every story and opportunity." },
    ],
  }),
  component: () => (
    <PageShell kicker="About" title="Why KURA">
      <div className="max-w-2xl space-y-6 text-lg leading-relaxed">
        <p>KURA helps young people move from <strong>information</strong> to <strong>inspiration</strong> to <strong>action</strong>.</p>
        <h2 className="text-2xl font-bold">How we verify</h2>
        <ol className="list-decimal space-y-2 pl-6 text-base text-muted-foreground">
          <li>Every opportunity is checked directly with the organisation offering it.</li>
          <li>Deadlines and eligibility are confirmed before publishing.</li>
          <li>Stories are fact-checked with the people featured.</li>
        </ol>
        <p className="text-base text-muted-foreground">Supported by Mastercard Foundation.</p>
      </div>
    </PageShell>
  ),
});
