import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { SaveButton } from "@/components/SaveButton";
import { ShareButton } from "@/components/ShareButton";
import { allStories } from "@/lib/data";

export const Route = createFileRoute("/inspired/")({
  head: () => ({
    meta: [
      { title: "Inspired — Stories of young Rwandans | KURA" },
      { name: "description", content: "Real stories of young people building careers, businesses and communities." },
      { property: "og:title", content: "Inspired — KURA" },
      { property: "og:description", content: "Real stories of young people building careers, businesses and communities." },
    ],
  }),
  component: () => (
    <PageShell kicker="Inspire" title="Inspired" intro="Stories of young people taking their next step.">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {allStories.map((s) => (
          <article key={s.id} className="group">
            <Link to="/inspired/$id" params={{ id: s.id }} className="block">
              <img src={s.image} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover object-top" />
              <p className="label-micro mt-3 text-primary">{s.category}</p>
              <h2 className="mt-1 text-lg font-bold leading-snug group-hover:text-primary">{s.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{s.summary}</p>
            </Link>
            <div className="mt-3 flex gap-2">
              <SaveButton item={{ id: s.id, kind: "story", title: s.title, meta: s.category }} />
              <ShareButton title={s.title} path={`/inspired/${s.id}`} />
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  ),
});
