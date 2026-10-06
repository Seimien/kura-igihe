import { Bookmark } from "lucide-react";
import { useApp, type SavedItem } from "@/lib/store";
import { cn } from "@/lib/utils";

export function SaveButton({ item, className, label = true }: { item: SavedItem; className?: string; label?: boolean }) {
  const { isSaved, toggleSave } = useApp();
  const on = isSaved(item.id);
  return (
    <button
      type="button"
      onClick={() => toggleSave(item)}
      aria-pressed={on}
      aria-label={on ? `Unsave ${item.title}` : `Save ${item.title}`}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border px-3 py-1.5 text-sm font-semibold transition-colors",
        on ? "border-primary bg-primary/10 text-primary" : "border-input text-foreground hover:border-foreground",
        className,
      )}
    >
      <Bookmark className={cn("h-4 w-4", on && "fill-current")} />
      {label && (on ? "Saved" : "Save")}
    </button>
  );
}
