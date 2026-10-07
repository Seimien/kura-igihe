import { Link, useLocation } from "@tanstack/react-router";
import { Bookmark, Menu, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import logo from "@/assets/kura-logo.png.asset.json";
import { copy, useApp } from "@/lib/store";
import { events, opportunities, stories, trendingStory, closingSoon } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Header() {
  const { lang, setLang, saved, setPanel } = useApp();
  const t = copy[lang];
  const [q, setQ] = useState("");
  const [menu, setMenu] = useState(false);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (s.length < 2) return [];
    const all = [
      ...[trendingStory, ...stories].map((x) => ({ id: x.id, title: x.title, kind: "Story", to: "/inspired/$id" as const })),
      ...[closingSoon, ...opportunities].map((x) => ({ id: x.id, title: x.title, kind: x.type, to: "/opportunities/$id" as const })),
      ...events.map((x) => ({ id: x.id, title: x.title, kind: "Event", to: "/events/$id" as const })),
    ];
    return all.filter((r) => (r.title + r.kind).toLowerCase().includes(s)).slice(0, 6);
  }, [q]);

  const nav = [
    { to: "/inspired" as const, label: t.inspired },
    { to: "/opportunities" as const, label: t.opps },
    { to: "/events" as const, label: t.events },
    { to: "/help" as const, label: t.help },
  ];

  const onRed = false;
  const { pathname } = useLocation();
  const [overBand, setOverBand] = useState(pathname === "/");
  useEffect(() => {
    if (pathname !== "/") return setOverBand(false);
    const hero = document.getElementById("hero");
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setOverBand(!!e?.isIntersecting), { rootMargin: "-64px 0px -99% 0px" });
    io.observe(hero);
    return () => io.disconnect();
  }, [pathname]);
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,backdrop-filter,box-shadow] duration-500",
        overBand ? "bg-background/30 backdrop-blur-md" : "border-b border-border/50 bg-background/70 backdrop-blur-md",
      )}
    >
      <div className="mx-auto grid h-16 max-w-[1440px] grid-cols-[auto_1fr_auto] items-center gap-4 px-4 lg:grid-cols-3 lg:px-8">
        <Link to="/" aria-label="KURA home" className="flex items-center">
          <span className={cn("rounded-sm px-1.5 py-1 transition-colors", onRed && "bg-paper")}>
            <img src={logo.url} alt="KURA — Youth with ambition" className="h-7 w-auto" />
          </span>
        </Link>

        <nav aria-label="Main" className="hidden justify-center lg:flex">
          <ul className="flex gap-5 xl:gap-7">
            {nav.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  className={cn(
                    "label-micro transition-colors data-[status=active]:underline data-[status=active]:underline-offset-8",
                    overBand ? "text-primary-foreground/90 hover:text-primary-foreground" : "text-foreground/80 hover:text-primary data-[status=active]:text-primary",
                  )}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-end gap-2">
          <div className="relative hidden md:block">
            <label htmlFor="site-search" className="sr-only">Search KURA</label>
            <div
              className={cn(
                "flex h-9 w-44 items-center border px-2.5 transition-colors xl:w-56",
                onRed ? "border-primary-foreground/40 bg-primary-foreground/10 text-primary-foreground" : "border-input bg-paper text-foreground",
              )}
            >
              <input
                id="site-search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t.search}
                className={cn("w-full bg-transparent text-sm outline-none", onRed ? "placeholder:text-primary-foreground/70" : "placeholder:text-muted-foreground")}
              />
              {q ? (
                <button aria-label="Clear search" onClick={() => setQ("")}><X className="h-4 w-4" /></button>
              ) : (
                <Search className="h-4 w-4" aria-hidden />
              )}
            </div>
            {q.trim().length >= 2 && (
              <div className="absolute right-0 top-11 w-80 border bg-popover p-1 text-popover-foreground shadow-lg">
                {results.length === 0 ? (
                  <p className="p-3 text-sm text-muted-foreground">No results for “{q}”.</p>
                ) : (
                  results.map((r) => (
                    <Link key={r.id} to={r.to} params={{ id: r.id }} onClick={() => setQ("")} className="block rounded-sm p-2.5 hover:bg-muted">
                      <span className="label-micro text-primary">{r.kind}</span>
                      <span className="mt-0.5 block text-sm font-semibold leading-snug">{r.title}</span>
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>

          <div role="group" aria-label="Language" className={cn("flex h-9 border text-xs font-bold", onRed ? "border-primary-foreground/50" : "border-foreground/30")}>
            {(["EN", "RW"] as const).map((l, i) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={cn(
                  "w-10 tracking-wider transition-colors",
                  i === 1 && (onRed ? "border-l border-primary-foreground/50" : "border-l border-foreground/30"),
                  lang === l
                    ? onRed ? "bg-primary-foreground text-primary" : "bg-foreground text-background"
                    : onRed ? "text-primary-foreground" : "text-foreground",
                )}
              >
                {l}
              </button>
            ))}
          </div>

          <button
            onClick={() => setPanel("saved")}
            className={cn("flex h-9 items-center gap-1.5 px-2 text-sm font-semibold transition-colors", onRed ? "text-primary-foreground" : "text-foreground")}
          >
            <Bookmark className="h-4 w-4" />
            <span className="hidden sm:inline">{t.saved}</span>
            {saved.length > 0 && <span className="rounded-sm bg-highlight px-1.5 text-xs text-highlight-foreground">{saved.length}</span>}
          </button>

          <button
            className={cn("lg:hidden", onRed ? "text-primary-foreground" : "text-foreground")}
            aria-label="Open menu"
            aria-expanded={menu}
            onClick={() => setMenu((m) => !m)}
          >
            {menu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {menu && (
        <nav aria-label="Mobile" className="border-t bg-paper px-4 py-3 lg:hidden">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setMenu(false)} className="label-micro block py-3 text-foreground">
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
