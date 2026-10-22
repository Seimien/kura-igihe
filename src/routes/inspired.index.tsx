import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CategoryTab, PageShell } from "@/components/PageShell";
import { SaveButton } from "@/components/SaveButton";
import { ShareButton } from "@/components/ShareButton";
import { allStories, storyCategories } from "@/lib/data";
import { useT, fmtDateL, fmtLong, storyDate } from "@/lib/i18n";
import { useApp } from "@/lib/store";


export const Route = createFileRoute("/inspired/")({
  head: () => ({
    meta: [
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
      { title: "Inspired — Stories of young Rwandans | KURA" },
      { name: "description", content: "Real stories of young people building careers, businesses and communities." },
      { property: "og:title", content: "Inspired — KURA" },
      { property: "og:description", content: "Real stories of young people building careers, businesses and communities." },
    ],
  }),
  component: InspiredList,
});

function InspiredList() {
  const [cat, setCat] = useState("All");
  const t = useT();
  const list = cat === "All" ? allStories : allStories.filter((s) => s.category.includes(cat));
  return (
    <PageShell
      kicker="Inspire"
      title="Inspired"
      intro="Stories of young people taking their next step."
      subheader={
        <div role="tablist" aria-label={t("Story categories")} className="flex overflow-x-auto [scrollbar-width:none]">
          {["All", ...storyCategories].map((c) => (
            <CategoryTab key={c} active={cat === c} onClick={() => setCat(c)}>{t(c)}</CategoryTab>
          ))}
        </div>
      }
    >
      <p className="mb-6 text-sm text-muted-foreground">{list.length} {t(list.length === 1 ? "story" : "stories")}</p>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {list.map((s) => (
          <article key={s.id} className="group">
            <Link to="/inspired/$id" params={{ id: s.id }} className="block">
              <img src={s.image} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover object-top" />
              <p className="label-micro mt-3 text-primary">{t(s.category)}</p>
              <h2 className="mt-1 text-lg font-bold leading-snug group-hover:text-primary">{t(s.title)}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{t(s.summary)}</p>
            </Link>
            <div className="mt-3 flex gap-2">
              <SaveButton item={{ id: s.id, kind: "story", title: s.title, meta: s.category }} />
              <ShareButton title={s.title} path={`/inspired/${s.id}`} />
            </div>
          </article>
        ))}
      </div>
      {list.length === 0 && <p className="py-10 text-muted-foreground">{t("No stories in this category yet — check back soon.")}</p>}
    </PageShell>
  );
}
