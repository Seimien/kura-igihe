import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { translate } from "@/lib/i18n";

export type SavedKind = "story" | "opportunity" | "event";
export type SavedItem = { id: string; kind: SavedKind; title: string; meta?: string; date?: string; reminder?: string };
export type Lang = "EN" | "RW";

type Ctx = {
  saved: SavedItem[];
  isSaved: (id: string) => boolean;
  toggleSave: (item: SavedItem) => void;
  setReminder: (id: string, r: string) => void;
  remove: (id: string) => void;
  lang: Lang;
  setLang: (l: Lang) => void;
  panel: null | "saved" | "alerts";
  setPanel: (p: null | "saved" | "alerts") => void;
};

const C = createContext<Ctx | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState<SavedItem[]>([]);
  const [lang, setLang] = useState<Lang>("EN");
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const value = JSON.parse(localStorage.getItem("kura-saved") || "[]");
      if (Array.isArray(value)) setSaved(value.filter((x) => x && typeof x.id === "string" && typeof x.title === "string" && ["story", "opportunity", "event"].includes(x.kind)));
      const choice = localStorage.getItem("kura-language");
      if (choice === "EN" || choice === "RW") setLang(choice);
    } catch { /* Storage may be unavailable. */ }
    setReady(true);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang === "RW" ? "rw" : "en";
    if (!ready) return;
    try { localStorage.setItem("kura-saved", JSON.stringify(saved)); localStorage.setItem("kura-language", lang); } catch { /* In-memory use remains available. */ }
  }, [saved, lang, ready]);
  const [panel, setPanel] = useState<Ctx["panel"]>(null);

  const setReminder = (id: string, r: string) =>
    setSaved((s) => s.map((i) => (i.id === id ? { ...i, reminder: r } : i)));

  const toggleSave = (item: SavedItem) => {
    if (saved.some((s) => s.id === item.id)) {
      setSaved((s) => s.filter((i) => i.id !== item.id));
      toast(translate(lang, "Removed from saved"));
      return;
    }
    setSaved((s) => [...s, item]);
    toast.success(translate(lang, "Saved"));
  };

  return (
    <C.Provider
      value={{
        saved,
        isSaved: (id) => saved.some((s) => s.id === id),
        toggleSave,
        setReminder,
        remove: (id) => setSaved((s) => s.filter((i) => i.id !== id)),
        lang,
        setLang,
        panel,
        setPanel,
      }}
    >
      {children}
    </C.Provider>
  );
}

export function useApp() {
  const c = useContext(C);
  if (!c) throw new Error("useApp outside provider");
  return c;
}

export const copy = {
  EN: { inspired: "Get inspired", opps: "Find opportunities", events: "Events", help: "Help", search: "Search KURA…", saved: "Saved", looking: "What are you looking for?" },
  RW: { inspired: "Inkuru", opps: "Shaka amahirwe", events: "Ibikorwa", help: "Ubufasha", search: "Shakisha kuri KURA…", saved: "Byabitswe", looking: "Urashaka iki?" },
};
