import { createContext, useContext, useState, type ReactNode } from "react";
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
    if (item.kind === "story") {
      toast.success(translate(lang, "Saved"));
    } else {
      toast.success(translate(lang, "Saved. Remind me before it closes?"), {
        duration: 8000,
        action: { label: translate(lang, "3 days before"), onClick: () => setReminder(item.id, "3 days before") },
        cancel: { label: translate(lang, "1 day before"), onClick: () => setReminder(item.id, "1 day before") },
      });
    }
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
