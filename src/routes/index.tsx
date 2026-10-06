import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, MapPin, Play } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { ShareButton } from "@/components/ShareButton";
import { SaveButton } from "@/components/SaveButton";
import { closingSoon, daysLeft, events, fmtDate, opportunities, stories, topics, trendingStory } from "@/lib/data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KURA — Be informed. Get inspired. Take your next step." },
      { name: "description", content: "KURA helps young people in Rwanda find trusted stories, scholarships, jobs, events and help." },
      { property: "og:title", content: "KURA — Youth with ambition" },
      { property: "og:description", content: "Trusted stories, opportunities and events for young people in Rwanda." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <WhyKura />
      <Opportunities />
      <Inspired />
      <Events />
      <HelpCta />
    </>
  );
}

function Hero() {
  const { days, hrs } = daysLeft(closingSoon.deadline);
  const urgent = days <= 7;
  const ref = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(0);
  const onScroll = () => {
    const el = ref.current;
    if (el) setSlide(Math.round(el.scrollLeft / el.clientWidth));
  };
  const go = (i: number) => ref.current?.scrollTo({ left: i * ref.current.clientWidth, behavior: "smooth" });
  return (
    <section id="hero" aria-label="Featured" className="relative flex h-[100svh] min-h-[600px] flex-col overflow-hidden bg-background">
      {/* central red band — starts below the glass header */}
      <div aria-hidden className="absolute bottom-0 left-1/3 top-16 hidden w-1/3 bg-primary lg:block" />

      <div
        ref={ref}
        onScroll={onScroll}
        className="relative mx-auto flex w-full max-w-[1440px] flex-1 snap-x snap-mandatory overflow-x-auto pt-16 [scrollbar-width:none] lg:grid lg:min-h-0 lg:grid-cols-3 lg:overflow-visible"
      >
        {/* LEFT — Brief */}
        <div className="flex w-full shrink-0 snap-center flex-col justify-center px-6 py-8 lg:px-10">
          <p className="label-micro text-primary">KURA</p>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground xl:text-5xl">
            The bridge between youth, the future and <span className="text-primary">ambition.</span>
          </h1>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-muted-foreground">
            Verified stories, scholarships, jobs and events for young people in Rwanda — all in one place.
          </p>
          <Link to="/about" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary">
            Explore KURA <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* CENTER — Story */}
        <article className="relative flex w-full shrink-0 snap-center flex-col bg-primary text-primary-foreground lg:mt-0">
          <Link to="/inspired/$id" params={{ id: trendingStory.id }} aria-label={trendingStory.title} className="absolute inset-0">
            <img
              src={trendingStory.image}
              alt=""
              width={896}
              height={1152}
              className="h-full w-full object-cover object-top [mask-image:linear-gradient(to_bottom,black_55%,transparent_100%)]"
            />
          </Link>
          <div className="pointer-events-none relative mt-auto bg-gradient-to-t from-primary via-primary/95 to-transparent px-6 pb-6 pt-20 lg:px-8">
            <p className="label-micro">
              <span className="bg-primary-foreground px-1.5 py-0.5 text-primary">Trending</span>
              <span className="ml-2 opacity-90">{trendingStory.category}</span>
            </p>
            <h2 className="mt-3 text-2xl font-bold leading-tight xl:text-3xl">{trendingStory.title}</h2>
            <p className="mt-2 line-clamp-2 text-sm opacity-90">{trendingStory.summary}</p>
            <div className="pointer-events-auto mt-4 flex flex-wrap gap-2">
              <Link to="/inspired/$id" params={{ id: trendingStory.id }} className="bg-primary-foreground px-4 py-2 text-sm font-semibold text-primary hover:bg-primary-foreground/90">Read story</Link>
              <a href={trendingStory.youtubeUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 border border-primary-foreground/60 px-4 py-2 text-sm font-semibold hover:bg-primary-foreground/10">
                <Play className="h-3.5 w-3.5 fill-current" /> Watch
              </a>
              <ShareButton title={trendingStory.title} path={`/inspired/${trendingStory.id}`} label={false} className="border-primary-foreground/60 text-primary-foreground hover:border-primary-foreground" />
            </div>
          </div>
        </article>

        {/* RIGHT — Expiring */}
        <aside className="flex w-full shrink-0 snap-center flex-col justify-center px-6 py-8 lg:px-10">
          <p className="label-micro">
            <span className={cn("px-1.5 py-0.5", urgent ? "bg-highlight text-highlight-foreground" : "bg-navy text-navy-foreground")}>
              {urgent ? "Closing soon" : "Just added"}
            </span>
            <span className="ml-2 text-muted-foreground">· {closingSoon.type}</span>
          </p>
          <Link to="/opportunities/$id" params={{ id: closingSoon.id }} className="hover:text-primary">
            <h2 className="mt-4 text-2xl font-bold leading-tight xl:text-3xl">{closingSoon.title}</h2>
          </Link>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
            {closingSoon.organisation}
            {closingSoon.verified && <BadgeCheck className="h-4 w-4 text-primary" aria-label="Verified" />}
          </p>
          <div className="mt-6 flex items-end gap-6 border-y py-4">
            <div>
              <span className="text-5xl font-extrabold leading-none" suppressHydrationWarning>{String(days).padStart(2, "0")}</span>
              <span className="label-micro ml-1 text-muted-foreground">Days</span>
            </div>
            <div>
              <span className="text-5xl font-extrabold leading-none" suppressHydrationWarning>{String(hrs).padStart(2, "0")}</span>
              <span className="label-micro ml-1 text-muted-foreground">Hrs</span>
            </div>
            <span className="ml-auto text-xs text-muted-foreground" suppressHydrationWarning>Deadline {fmtDate(closingSoon.deadline)}</span>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link to="/opportunities/$id" params={{ id: closingSoon.id }} className="bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Apply</Link>
            <SaveButton item={{ id: closingSoon.id, kind: "opportunity", title: closingSoon.title, meta: closingSoon.type }} />
            <ShareButton title={closingSoon.title} path={`/opportunities/${closingSoon.id}`} label={false} />
          </div>
        </aside>
      </div>

      {/* mobile slide dots */}
      <div className="relative flex justify-center gap-2 pb-5 pt-3 lg:hidden" role="tablist" aria-label="Hero slides">
        {["Brief", "Story", "Closing soon"].map((l, i) => (
          <button
            key={l}
            role="tab"
            aria-selected={slide === i}
            aria-label={l}
            onClick={() => go(i)}
            className={cn("h-2 rounded-full transition-all", slide === i ? "w-8 bg-primary" : "w-2 bg-foreground/25")}
          />
        ))}
      </div>
    </section>
  );
}

function SectionHead({ kicker, title, to, cta }: { kicker: string; title: string; to?: "/opportunities" | "/inspired" | "/events"; cta?: string }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="label-micro text-primary">{kicker}</p>
        <h2 className="mt-2 text-3xl font-extrabold leading-none md:text-4xl">{title}</h2>
      </div>
      {to && (
        <Link to={to} className="inline-flex items-center gap-1.5 text-sm font-semibold hover:text-primary">
          {cta} <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

function WhyKura() {
  const values = ["Truth", "Accountability", "Integrity"];
  return (
    <section className="border-b bg-paper">
      <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-10">
        <p className="label-micro text-primary">Why KURA</p>
        <blockquote className="mt-3 max-w-4xl text-2xl font-bold leading-snug md:text-3xl">
          “We want young people to understand more, discover what's possible and feel confident taking their next step.”
        </blockquote>
        <ul className="mt-10 grid grid-cols-3 divide-x border-y">
          {values.map((v) => (
            <li key={v} className="py-6 text-center text-sm font-extrabold uppercase tracking-[0.14em] text-primary md:text-2xl">{v}</li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap items-center gap-6 text-sm">
          <span className="text-muted-foreground">In partnership with <strong className="text-foreground">Mastercard Foundation</strong></span>
          <Link to="/about" className="font-semibold text-primary hover:underline">How we verify →</Link>
        </div>
      </div>
    </section>
  );
}

const tabs = ["Closing soon", "Jobs", "Internships", "Scholarships", "Grants"] as const;
const tabType: Record<string, string> = { Jobs: "Job", Internships: "Internship", Scholarships: "Scholarship", Grants: "Grant" };

function Opportunities() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Closing soon");
  const list = useMemo(() => {
    const l = tab === "Closing soon" ? opportunities : opportunities.filter((o) => o.type === tabType[tab]);
    return [...l].sort((a, b) => a.deadline.localeCompare(b.deadline)).slice(0, 3);
  }, [tab]);
  return (
    <section id="opportunities" className="scroll-mt-20">
      <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-10">
        <SectionHead kicker="Act" title="Your next opportunity" to="/opportunities" cta="Find all opportunities" />
        <div role="tablist" className="mb-6 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={cn("border px-4 py-2 text-sm font-semibold transition-colors", tab === t ? "border-navy bg-navy text-navy-foreground" : "border-input hover:border-foreground")}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {list.map((o) => {
            const d = daysLeft(o.deadline).days;
            return (
              <article key={o.id} className="flex flex-col border bg-card p-5 transition-shadow hover:shadow-md">
                <div className="flex items-center justify-between">
                  <span className="label-micro text-primary">{o.type}</span>
                  <span className={cn("label-micro px-1.5 py-0.5", d <= 7 ? "bg-highlight text-highlight-foreground" : "bg-muted text-muted-foreground")} suppressHydrationWarning>
                    {d} days left
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-bold leading-snug"><Link to="/opportunities/$id" params={{ id: o.id }} className="hover:text-primary">{o.title}</Link></h3>
                <p className="mt-1 flex items-center gap-1 text-sm font-semibold text-muted-foreground">
                  {o.organisation} {o.verified && <BadgeCheck className="h-4 w-4 text-primary" aria-label="Verified" />}
                </p>
                <p className="mt-3 flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-3.5 w-3.5" /> {o.location} · {o.eligibility}</p>
                <div className="mt-5 flex items-center gap-2 border-t pt-4">
                  <Link to="/opportunities/$id" params={{ id: o.id }} className="bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90">Apply</Link>
                  <SaveButton item={{ id: o.id, kind: "opportunity", title: o.title, meta: o.type }} label={false} />
                  <ShareButton title={o.title} path={`/opportunities/${o.id}`} label={false} />
                  <span className="ml-auto text-xs text-muted-foreground" suppressHydrationWarning>Closes {fmtDate(o.deadline)}</span>
                </div>
              </article>
            );
          })}
          {list.length === 0 && <p className="text-muted-foreground">No open listings in this category right now.</p>}
        </div>
      </div>
    </section>
  );
}

function Inspired() {
  return (
    <section id="inspired" className="scroll-mt-20 border-y bg-paper">
      <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-10">
        <SectionHead kicker="Inspire" title="Inspired" to="/inspired" cta="All stories" />
        <div className="mb-8 flex flex-wrap gap-2">
          {topics.map((t) => (
            <Link key={t} to="/inspired" className="label-micro border border-input px-3 py-1.5 hover:border-primary hover:text-primary">{t}</Link>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {stories.map((s) => (
            <article key={s.id} className="group flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <Link to="/inspired/$id" params={{ id: s.id }} aria-label={s.title}><img src={s.image} alt="" loading="lazy" width={1024} height={768} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" /></Link>
                {s.youtubeUrl && (
                  <a href={s.youtubeUrl} target="_blank" rel="noreferrer" className="label-micro absolute bottom-3 left-3 inline-flex items-center gap-1.5 bg-primary px-2.5 py-1.5 text-primary-foreground">
                    <Play className="h-3 w-3 fill-current" /> Watch story
                  </a>
                )}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="label-micro text-primary">{s.category}</span>
                <span className="text-xs text-muted-foreground">{s.date}</span>
              </div>
              <h3 className="mt-2 text-xl font-bold leading-snug group-hover:text-primary">
                <Link to="/inspired/$id" params={{ id: s.id }}>{s.title}</Link>
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.summary}</p>
              <div className="mt-4 flex gap-2">
                <SaveButton item={{ id: s.id, kind: "story", title: s.title, meta: s.category }} />
                <ShareButton title={s.title} path={`/inspired/${s.id}`} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Events() {
  if (events.length < 3) return null;
  return (
    <section id="events" className="scroll-mt-20">
      <div className="mx-auto max-w-[1440px] px-6 py-16 lg:px-10">
        <SectionHead kicker="Events" title="What's happening" to="/events" cta="All events" />
        <div className="grid gap-4 md:grid-cols-3">
          {events.map((e) => {
            const d = new Date(e.date);
            return (
              <article key={e.id} className="flex border bg-card">
                <div className="flex w-24 shrink-0 flex-col items-center justify-center bg-navy text-navy-foreground" suppressHydrationWarning>
                  <span className="text-3xl font-extrabold leading-none" suppressHydrationWarning>{d.getDate()}</span>
                  <span className="label-micro mt-1" suppressHydrationWarning>{d.toLocaleDateString("en-GB", { month: "short" })}</span>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <span className="label-micro text-primary">{e.type}</span>
                  <h3 className="mt-1 font-bold leading-snug"><Link to="/events/$id" params={{ id: e.id }} className="hover:text-primary">{e.title}</Link></h3>
                  <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-3.5 w-3.5" /> {e.location}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <Link to="/events/$id" params={{ id: e.id }} className="text-sm font-semibold text-primary hover:underline">View event</Link>
                    <ShareButton className="ml-auto" title={e.title} path={`/events/${e.id}`} label={false} />
                    <SaveButton label={false} item={{ id: e.id, kind: "event", title: e.title, meta: e.type }} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HelpCta() {
  return (
    <section className="border-t bg-secondary">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-6 px-6 py-12 lg:px-10">
        <div>
          <h2 className="text-2xl font-bold">Need answers first?</h2>
          <p className="mt-1 text-muted-foreground">Find trusted resources and organisations that can help.</p>
        </div>
        <Link to="/help" className="bg-navy px-5 py-2.5 text-sm font-semibold text-navy-foreground hover:bg-navy/90">Get help →</Link>
      </div>
    </section>
  );
}
